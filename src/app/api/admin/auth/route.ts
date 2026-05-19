import { NextResponse } from "next/server";

// Deprecated. The admin password route has been replaced by Firebase Auth
// (email/password sign-in) via src/components/AdminAuth.tsx.
//
// This stub remains only so that any stale client (cached old AdminAuth) hitting
// this endpoint receives a clear error rather than a 404. Safe to delete entirely
// once you've confirmed no clients are still calling it.
export async function POST() {
  return NextResponse.json(
    {
      success: false,
      error:
        "This endpoint is deprecated. Admin authentication now uses Firebase Auth.",
    },
    { status: 410 }
  );
}
