import { LoginForm } from "./loginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto w-full max-w-md">
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950">
          <h1 className="text-2xl font-semibold tracking-tight">Log in</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Admin dashboard にログインしてください。
          </p>

          <LoginForm />
        </div>
      </main>
    </div>
  );
}


