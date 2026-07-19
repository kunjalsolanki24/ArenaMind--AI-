"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/useAuthStore";
import { Activity, Mail, Lock, Smartphone, ChevronRight } from "lucide-react";

export default function LoginScreen() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) router.replace("/dashboard");
  }, [isAuthenticated, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      // Derive name from email if new user
      const savedName = email.split("@")[0].replace(/\./g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      login({ name: savedName, email, role: null });
      setIsLoading(false);
      router.push("/role-selection");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md">
        <div className="glass-panel p-8 rounded-[2.5rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10 translate-x-1/2 -translate-y-1/2" />
          <div className="flex flex-col items-center mb-8">
            <div className="p-4 bg-white/5 rounded-2xl mb-4 border border-white/10">
              <Activity className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">Welcome Back</h2>
            <p className="text-white/50 text-sm mt-2">Login to ArenaMind OS</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-white/60 ml-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all" placeholder="admin@fifa26.com" required />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center ml-2 mr-2">
                <label className="text-xs font-medium text-white/60">Password</label>
                <a href="#" className="text-xs text-primary/80 hover:text-primary transition-colors">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all" placeholder="••••••••" required />
              </div>
            </div>
            <button type="submit" disabled={isLoading} className="w-full bg-white text-black hover:bg-gray-100 font-semibold rounded-2xl py-3.5 mt-4 transition-colors flex items-center justify-center space-x-2">
              {isLoading ? <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : <><span>Sign In</span><ChevronRight className="w-4 h-4" /></>}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative flex items-center mb-4">
              <div className="flex-grow border-t border-white/10" />
              <span className="flex-shrink-0 mx-4 text-white/40 text-xs">or continue with</span>
              <div className="flex-grow border-t border-white/10" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => { login({ name: "Phone User", email: "phone@arenamind.ai", role: null }); router.push("/role-selection"); }} className="glass-panel-hover rounded-2xl py-3 flex items-center justify-center space-x-2 border border-white/10 transition-colors">
                <Smartphone className="w-4 h-4 text-white/80" />
                <span className="text-sm font-medium text-white/80">Phone OTP</span>
              </button>
              <button onClick={() => { login({ name: "Google User", email: "google@arenamind.ai", role: null }); router.push("/role-selection"); }} className="glass-panel-hover rounded-2xl py-3 flex items-center justify-center space-x-2 border border-white/10 transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                <span className="text-sm font-medium text-white/80">Google</span>
              </button>
            </div>
          </div>

          <p className="text-center text-sm text-white/50 mt-6">Don&apos;t have an account? <a href="/register" className="text-primary hover:underline">Register</a></p>
        </div>
      </motion.div>
    </div>
  );
}
