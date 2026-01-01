import Link from "next/link";
import { SignupForm } from "./signupForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-6">
          <Link
            href="/"
            className="text-sm text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            ← Home
          </Link>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950">
          <h1 className="text-2xl font-semibold tracking-tight">Sign up</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Create a new account.
          </p>

          <div className="mt-6">
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
}


