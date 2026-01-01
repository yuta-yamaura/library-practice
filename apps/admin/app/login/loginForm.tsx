"use client";

import Link from "next/link";
import { useState } from "react";

export function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // NOTE: ログインAPIは未実装のため、UIのみ用意しています。
      alert("ログイン機能は未実装です（UIのみ）");
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
          className="h-11 w-full rounded-lg border border-black/10 bg-white px-3 outline-none focus:ring-2 focus:ring-zinc-900/20 dark:border-white/10 dark:bg-zinc-950 dark:focus:ring-zinc-100/20"
          placeholder="Your password"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-white"
      >
        {isSubmitting ? "Logging in..." : "Log in"}
      </button>

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


