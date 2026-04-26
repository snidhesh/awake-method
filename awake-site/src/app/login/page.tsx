"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#0c0b0a] flex items-center justify-center px-4">
      <div className="w-full max-w-[380px]">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="font-serif font-black text-[1.6rem] tracking-[0.1em]">
            <span className="text-white">AW</span>
            <span className="text-pink">AKE</span>
          </div>
          <div className="text-[0.52rem] font-medium tracking-[0.22em] uppercase text-white/28 mt-1">
            Content Hub
          </div>
        </div>

        {/* Login card */}
        <div className="bg-[#141210] border border-white/7 rounded-lg p-8">
          <h1 className="font-serif text-[1.1rem] font-bold text-white mb-6 text-center">
            Sign In
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-[0.63rem] tracking-[0.13em] uppercase text-white/28 font-semibold block mb-1.5">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="bg-[#1c1917] border border-white/7 rounded px-3 py-2.5 text-[0.86rem] text-white outline-none focus:border-pink/60 transition-colors w-full placeholder:text-white/28"
              />
            </div>

            <div>
              <label className="text-[0.63rem] tracking-[0.13em] uppercase text-white/28 font-semibold block mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-[#1c1917] border border-white/7 rounded px-3 py-2.5 text-[0.86rem] text-white outline-none focus:border-pink/60 transition-colors w-full placeholder:text-white/28"
              />
            </div>

            {error && (
              <p className="text-[0.8rem] text-pink text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-pink border border-pink text-white py-3 rounded text-[0.85rem] font-medium tracking-[0.04em] hover:bg-[#ff4d84] transition-colors cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-[0.7rem] text-white/20 mt-4">
          AWAKE Method &middot; Admin Access Only
        </p>
      </div>
    </div>
  );
}
