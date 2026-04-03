import {
  db,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "@/lib/firebase";
import { tryLeadingUpperDocId } from "@/lib/appliance-doc-id";
import type { DocumentData, DocumentSnapshot } from "firebase/firestore";

const COLLECTION = "appliances";

/**
 * Load an appliance document when the browser URL may not match Firestore `doc.id` casing
 * (Next.js can lowercase the whole `/appliances/[id]` segment).
 *
 * 1) getDoc by exact URL id
 * 2) getDoc with first letter uppercased (cheap partial fix)
 * 3) query `idLower == urlId.toLowerCase()` — set `idLower` on each doc (admin does this automatically)
 * 4) list collection and match `doc.id.toLowerCase()` (extra reads; covers missing/wrong `idLower`)
 */
export async function getApplianceSnapshotByUrlId(
  urlId: string
): Promise<DocumentSnapshot<DocumentData> | null> {
  const trimmed = urlId.trim();
  if (!trimmed) return null;

  let snap = await getDoc(doc(db, COLLECTION, trimmed));
  if (snap.exists()) return snap;

  const alt = tryLeadingUpperDocId(trimmed);
  if (alt && alt !== trimmed) {
    snap = await getDoc(doc(db, COLLECTION, alt));
    if (snap.exists()) return snap;
  }

  const key = trimmed.toLowerCase();
  const q = query(
    collection(db, COLLECTION),
    where("idLower", "==", key),
    limit(1)
  );
  const list = await getDocs(q);
  if (!list.empty) return list.docs[0]!;

  const all = await getDocs(collection(db, COLLECTION));
  for (const d of all.docs) {
    if (d.id.toLowerCase() === key) return d;
  }

  return null;
}
