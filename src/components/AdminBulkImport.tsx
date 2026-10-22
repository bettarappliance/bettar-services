"use client";

import { useState } from "react";
import { db, doc, getDoc, updateDoc } from "@/lib/firebase";

/** Only these fields can be changed by an import. Prices, stock and images are never touched. */
const ALLOWED_FIELDS = [
  "name",
  "modelNumber",
  "type",
  "supplyType",
  "color",
  "energyRating",
  "warranty",
  "shortDescription",
  "fullDescription",
  "features",
  "highlights",
  "quickFacts",
  "specGroups",
  "featureDetails",
  "specsSource",
] as const;

type AllowedField = (typeof ALLOWED_FIELDS)[number];

type ImportRow = {
  id: string;
  /** Model number currently in the catalog; used to make sure we update the right product. */
  modelNumber: string;
  set: Partial<Record<AllowedField, unknown>>;
};

type CheckedRow = ImportRow & {
  currentName: string;
  current: Record<string, unknown>;
  status: "ok" | "missing" | "mismatch";
  fields: AllowedField[];
  ignored: string[];
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function parseImportFile(text: string): ImportRow[] {
  const json: unknown = JSON.parse(text);
  const list = isRecord(json) && Array.isArray(json.updates) ? json.updates : json;
  if (!Array.isArray(list)) throw new Error('The file must contain an "updates" list.');
  return list.map((r, i) => {
    if (!isRecord(r) || typeof r.id !== "string" || !isRecord(r.set)) {
      throw new Error(`Row ${i + 1} is missing "id" or "set".`);
    }
    return { id: r.id, modelNumber: String(r.modelNumber ?? ""), set: r.set as ImportRow["set"] };
  });
}

function downloadJson(data: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminBulkImport({ onDone }: { onDone?: () => void }) {
  const [fileName, setFileName] = useState("");
  const [rows, setRows] = useState<CheckedRow[]>([]);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState("");
  const [backupSaved, setBackupSaved] = useState(false);

  const okRows = rows.filter((r) => r.status === "ok");

  const handleFile = async (file: File) => {
    setError("");
    setResult("");
    setRows([]);
    setBackupSaved(false);
    setFileName(file.name);
    setChecking(true);
    try {
      const parsed = parseImportFile(await file.text());
      const checked: CheckedRow[] = [];
      for (const row of parsed) {
        const snap = await getDoc(doc(db, "appliances", row.id));
        const fields = Object.keys(row.set).filter((k): k is AllowedField =>
          (ALLOWED_FIELDS as readonly string[]).includes(k)
        );
        const ignored = Object.keys(row.set).filter((k) => !(ALLOWED_FIELDS as readonly string[]).includes(k));
        if (!snap.exists()) {
          checked.push({ ...row, currentName: "", current: {}, status: "missing", fields, ignored });
          continue;
        }
        const current = snap.data() as Record<string, unknown>;
        const currentModel = String(current.modelNumber ?? "").trim().toUpperCase();
        const status = currentModel === row.modelNumber.trim().toUpperCase() ? "ok" : "mismatch";
        checked.push({ ...row, currentName: String(current.name ?? ""), current, status, fields, ignored });
      }
      setRows(checked);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not read this file.");
    } finally {
      setChecking(false);
    }
  };

  const saveBackup = () => {
    // Same format as an import file, so uploading it here puts the old values back.
    const updates = okRows.map((r) => ({
      id: r.id,
      modelNumber: typeof r.set.modelNumber === "string" ? r.set.modelNumber : r.modelNumber,
      set: Object.fromEntries(r.fields.map((f) => [f, r.current[f] ?? null])),
    }));
    downloadJson({ createdAt: new Date().toISOString(), source: fileName, updates }, `backup-before-${fileName}`);
    setBackupSaved(true);
  };

  const applyImport = async () => {
    setSaving(true);
    setError("");
    let done = 0;
    const failed: string[] = [];
    for (const r of okRows) {
      const data = Object.fromEntries(r.fields.map((f) => [f, r.set[f]]));
      try {
        await updateDoc(doc(db, "appliances", r.id), data);
        done++;
      } catch {
        failed.push(r.modelNumber || r.id);
      }
    }
    setSaving(false);
    setResult(
      `Updated ${done} of ${okRows.length} products.` + (failed.length ? ` Failed: ${failed.join(", ")}.` : "")
    );
    onDone?.();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Import Product Details</h1>
      <p className="text-gray-600 mb-6 max-w-3xl">
        Upload a checked details file (.json) to add specs, features and descriptions to many products at once.
        Prices, stock and photos are never changed. A product is only updated if its model number matches the
        catalog.
      </p>

      <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#002D72] px-5 py-3 font-semibold text-white hover:bg-[#001F5C]">
        <input
          type="file"
          accept="application/json,.json"
          className="sr-only"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void handleFile(f);
            e.target.value = "";
          }}
        />
        Choose file
      </label>
      {fileName ? <span className="ml-3 text-sm text-gray-600">{fileName}</span> : null}

      {checking ? <p className="mt-6 text-sm text-gray-600">Checking products…</p> : null}
      {error ? (
        <div role="alert" className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      ) : null}

      {rows.length ? (
        <>
          <div className="mt-8 overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">Model</th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">Current name</th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">Will update</th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td className="px-4 py-3 font-medium text-gray-900">{r.modelNumber}</td>
                    <td className="px-4 py-3 text-gray-600">{r.currentName || "—"}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {r.fields.join(", ")}
                      {r.ignored.length ? (
                        <span className="block text-xs text-amber-700">Ignored: {r.ignored.join(", ")}</span>
                      ) : null}
                    </td>
                    <td className="px-4 py-3">
                      {r.status === "ok" ? (
                        <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">Ready</span>
                      ) : r.status === "missing" ? (
                        <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700">Not found, skipped</span>
                      ) : (
                        <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">Model doesn&apos;t match, skipped</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={saveBackup}
              disabled={!okRows.length}
              className="rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              1. Download backup
            </button>
            <button
              type="button"
              onClick={() => void applyImport()}
              disabled={!okRows.length || !backupSaved || saving}
              className="rounded-lg bg-[#D32F2F] px-5 py-3 font-semibold text-white hover:bg-[#B71C1C] disabled:opacity-50"
            >
              {saving ? "Updating…" : `2. Update ${okRows.length} products`}
            </button>
            {!backupSaved && okRows.length ? (
              <span className="text-sm text-gray-500">Download the backup first so changes can be undone.</span>
            ) : null}
          </div>
        </>
      ) : null}

      {result ? (
        <div role="status" className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
          {result}
        </div>
      ) : null}
    </div>
  );
}
