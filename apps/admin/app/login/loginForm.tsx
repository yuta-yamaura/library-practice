"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type LoginResult = {
  id: string;
  email: string;
};

type ApiErrorBody =
  | { message?: string | string[]; error?: string }
  | string
  | null;

function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";
}

export function LoginForm() {
  const apiBaseUrl = useMemo(() => getApiBaseUrl(), []);
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LoginResult | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError(null);
    setResult(null);

    if (!email.trim()) return setError("Email is required.");
    if (!password) return setError("Password is required.");

    setIsSubmitting(true);
    try {
      const res = await fetch(`${apiBaseUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text();
      const json = text ? (JSON.parse(text) as ApiErrorBody) : null;

      if (!res.ok) {
        const message =
          (typeof json === "object" && json
            ? json.message ?? json.error
            : null) ?? `Request failed (${res.status})`;
        throw new Error(
          Array.isArray(message) ? message.join(", ") : String(message),
        );
      }

      const data = json as LoginResult;
      setResult(data);
      router.push("/");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={onSubmit}>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
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
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-11 w-full rounded-lg border border-black/10 bg-white px-3 outline-none focus:ring-2 focus:ring-zinc-900/20 dark:border-white/10 dark:bg-zinc-950 dark:focus:ring-zinc-100/20"
          placeholder="Your password"
        />
      </div>

      {error ? (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      ) : null}

      {result ? (
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-800 dark:text-emerald-200">
          Logged in as <span className="font-medium">{result.email}</span>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-white"
      >
        {isSubmitting ? "Logging in..." : "Log in"}
      </button>

      <p className="text-xs text-zinc-600 dark:text-zinc-400">
        API: <span className="font-mono">{apiBaseUrl}</span>
      </p>

      <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
        アカウント未作成ですか？{" "}
        <Link
          href="/signup"
          className="font-medium text-zinc-950 hover:underline dark:text-zinc-50"
        >
          サインアップ
        </Link>
      </p>
    </form>
  );
}


