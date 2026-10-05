import { NextResponse } from "next/server";

// Keep the existing automation destination and form-encoded field names.
// Deployments can override the destination without changing browser code.
const DEFAULT_WEBHOOK = "https://hooks.zapier.com/hooks/catch/25016398/uryq5s4";
const fields = ["firstName", "lastName", "email", "phone", "address", "serviceType", "description", "servedInPast", "preferredDays", "timeStart", "timeEnd", "consentToEmails"];

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }
  let data: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 16000) return NextResponse.json({ error: "Request is too large." }, { status: 413 });
    data = JSON.parse(raw);
    if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error("Invalid data");
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const payload = new URLSearchParams();
  for (const field of fields) {
    const value = data[field];
    if (typeof value !== "string" || value.length > 4000) {
      return NextResponse.json({ error: "Please check your request details." }, { status: 400 });
    }
    payload.set(field, value.trim());
  }
  if (["firstName", "lastName", "email", "phone", "address", "serviceType", "description"].some(field => !payload.get(field)) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.get("email")!) || payload.get("consentToEmails") !== "Yes") {
    return NextResponse.json({ error: "Please complete the required details and consent." }, { status: 400 });
  }
  try {
    const response = await fetch(process.env.ZAPIER_SERVICE_REQUEST_WEBHOOK_URL || DEFAULT_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: payload.toString(),
      signal: AbortSignal.timeout(10000),
      redirect: "error",
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Request not accepted");
    // This confirms webhook acceptance, not downstream execution or booking.
    return NextResponse.json({ accepted: true });
  } catch {
    return NextResponse.json({ error: "We could not confirm delivery. Please call 301-949-2500 before submitting again." }, { status: 502 });
  }
}
