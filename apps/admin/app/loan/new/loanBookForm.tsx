"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type ApiErrorBody =
  | { message?: string | string[]; error?: string }
  | string
  | null;

function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";
}

export function LoanBookForm({ defaultBookId }: { defaultBookId: string }) {
  const apiBaseUrl = useMemo(() => getApiBaseUrl(), []);
  const router = useRouter();

  const [loanId, setLoanId] = useState<string | null>(null);
  const [bookId, setBookId] = useState(defaultBookId);
  const [userId, setUserId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultJson, setResultJson] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setResultJson(null);
    setLoanId(null);

    if (!bookId.trim()) return setError("bookId is required.");
    if (!userId.trim()) return setError("userId is required.");

    setIsSubmitting(true);
    try {
      const res = await fetch(`${apiBaseUrl}/loan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId, userId }),
      });

      const text = await res.text();
      const json = text ? (JSON.parse(text) as unknown) : null;

      if (!res.ok) {
        const errBody = json as ApiErrorBody;
        const message =
          (typeof errBody === "object" && errBody
            ? errBody.message ?? errBody.error
            : null) ?? `Request failed (${res.status})`;
        throw new Error(
          Array.isArray(message) ? message.join(", ") : String(message),
        );
      }

      // Expect DTO shape: { id, bookId, userId, loanDate, createdAt, updatedAt }
      const data = json as { id: string };
      setLoanId(data.id);
      setResultJson(JSON.stringify(json, null, 2));
      router.push(`/books/${encodeURIComponent(bookId)}?loanId=${encodeURIComponent(data.id)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="bookId">
          bookId
        </label>
        <input
          id="bookId"
          name="bookId"
          type="text"
          required
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          className="h-11 w-full rounded-lg border border-black/10 bg-white px-3 font-mono text-xs outline-none focus:ring-2 focus:ring-zinc-900/20 dark:border-white/10 dark:bg-zinc-950 dark:focus:ring-zinc-100/20"
          placeholder="book uuid"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="userId">
          userId
        </label>
        <input
          id="userId"
          name="userId"
          type="text"
          required
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="h-11 w-full rounded-lg border border-black/10 bg-white px-3 font-mono text-xs outline-none focus:ring-2 focus:ring-zinc-900/20 dark:border-white/10 dark:bg-zinc-950 dark:focus:ring-zinc-100/20"
          placeholder="user uuid"
        />
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          ※ 現状は userId を直接入力します（ユーザー一覧APIは未実装）。
        </p>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      ) : null}

      {resultJson ? (
        <pre className="max-h-64 overflow-auto rounded-lg border border-black/10 bg-white p-3 text-xs text-zinc-900 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100">
          {resultJson}
        </pre>
      ) : null}

      {loanId ? (
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-800 dark:text-emerald-200">
          loanId: <span className="break-all font-mono text-xs">{loanId}</span>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-white"
      >
        {isSubmitting ? "Creating loan..." : "Loan"}
      </button>

      <p className="text-xs text-zinc-600 dark:text-zinc-400">
        API: <span className="font-mono">{apiBaseUrl}</span>
      </p>
    </form>
  );
}


