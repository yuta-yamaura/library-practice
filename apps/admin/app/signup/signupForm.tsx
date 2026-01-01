"use client";

import { useMemo, useState } from "react";

type SignupResult = {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";
}

export function SignupForm() {
  const apiBaseUrl = useMemo(() => getApiBaseUrl(), []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SignupResult | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!email.trim()) return setError("Email is required.");
    if (!password) return setError("Password is required.");
    if (password.length < 8)
      return setError("Password must be at least 8 characters.");
    if (password !== passwordConfirm) return setError("Passwords do not match.");

    setIsSubmitting(true);
    try {
      const res = await fetch(`${apiBaseUrl}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text();
      const json = text ? (JSON.parse(text) as unknown) : null;

      if (!res.ok) {
        const message =
          (json as any)?.message ??
          (json as any)?.error ??
          `Request failed (${res.status})`;
        throw new Error(
          Array.isArray(message) ? message.join(", ") : String(message),
        );
      }

      setResult(json as SignupResult);
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11 w-full rounded-lg border border-black/10 bg-white px-3 outline-none focus:ring-2 focus:ring-zinc-900/20 dark:border-white/10 dark:bg-zinc-950 dark:focus:ring-zinc-100/20"
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-11 w-full rounded-lg border border-black/10 bg-white px-3 outline-none focus:ring-2 focus:ring-zinc-900/20 dark:border-white/10 dark:bg-zinc-950 dark:focus:ring-zinc-100/20"
          placeholder="At least 8 characters"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="passwordConfirm">
          Confirm password
        </label>
        <input
          id="passwordConfirm"
          type="password"
          autoComplete="new-password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          className="h-11 w-full rounded-lg border border-black/10 bg-white px-3 outline-none focus:ring-2 focus:ring-zinc-900/20 dark:border-white/10 dark:bg-zinc-950 dark:focus:ring-zinc-100/20"
          placeholder="Re-enter password"
        />
      </div>

      {error ? (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      ) : null}

      {result ? (
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-800 dark:text-emerald-200">
          Created user: <span className="font-medium">{result.email}</span>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-white"
      >
        {isSubmitting ? "Creating..." : "Create account"}
      </button>

      <p className="text-xs text-zinc-600 dark:text-zinc-400">
        API: <span className="font-mono">{apiBaseUrl}</span>
      </p>
    </form>
  );
}


