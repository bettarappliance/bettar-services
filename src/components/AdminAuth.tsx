"use client";

import { useState, useEffect } from "react";
import { FirebaseError } from "firebase/app";
import {
  auth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from "@/lib/firebase";

// UID of the authorized admin account. Signed-in users with any other UID are
// rejected — they can't write to Firestore anyway (rules enforce it), but
// rejecting them at the UI layer prevents confusion.
const ADMIN_UID = "oEGMV2QVurfSHEBnr2po3N9H80L2";

export default function AdminAuth({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);

  // Subscribe to Firebase auth state so reloads / new tabs persist the session.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSigningIn(true);

    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      if (credential.user.uid !== ADMIN_UID) {
        // Valid Firebase account, but not the admin one.
        await signOut(auth);
        setError("This account is not authorized for admin access.");
      }
      // On success, onAuthStateChanged fires and the UI re-renders to show children.
    } catch (err) {
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/invalid-credential":
          case "auth/wrong-password":
          case "auth/user-not-found":
          case "auth/invalid-email":
            setError("Invalid email or password.");
            break;
          case "auth/too-many-requests":
            setError(
              "Too many failed attempts. Please wait a few minutes and try again."
            );
            break;
          case "auth/network-request-failed":
            setError("Network error. Check your connection and try again.");
            break;
          default:
            setError(`Sign-in error: ${err.code}`);
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      setPassword("");
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setEmail("");
    setPassword("");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading…</div>
      </div>
    );
  }

  if (!user || user.uid !== ADMIN_UID) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Admin Access
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D72] focus:border-transparent text-gray-900"
                placeholder="you@example.com"
                required
                autoFocus
                autoComplete="email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D72] focus:border-transparent text-gray-900"
                placeholder="Enter password"
                required
                autoComplete="current-password"
              />
            </div>
            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}
            <button
              type="submit"
              disabled={isSigningIn}
              className="w-full bg-[#002D72] text-white py-2 px-4 rounded-lg hover:bg-[#001F5C] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSigningIn ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center justify-between text-sm">
        <span className="text-gray-600">
          Signed in as <strong className="text-gray-900">{user.email}</strong>
        </span>
        <button
          onClick={handleSignOut}
          className="text-[#002D72] hover:underline font-medium"
        >
          Sign out
        </button>
      </div>
      {children}
    </>
  );
}
