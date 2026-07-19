"use client";
import Link from "next/link";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass-panel p-10 rounded-3xl text-center max-w-md">
        <h2 className="text-2xl font-bold text-red-400 mb-3">Something went wrong</h2>
        <p className="text-white/50 text-sm mb-6">{error.message || "An unexpected error occurred."}</p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="bg-primary text-black px-5 py-2.5 rounded-2xl font-bold hover:opacity-90 transition-opacity">Try Again</button>
          <Link href="/dashboard" className="bg-white/10 px-5 py-2.5 rounded-2xl font-medium hover:bg-white/20 transition-colors">Dashboard</Link>
        </div>
      </div>
    </div>
  );
}
