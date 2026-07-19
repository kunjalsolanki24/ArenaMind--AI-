"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/useAuthStore";
import { Activity, Mail, Lock, User, ChevronRight } from "lucide-react";

export default function RegisterScreen() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      login({ name: name || "Demo User", email, role: null });
      setIsLoading(false);
      router.push("/role-selection");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass-panel p-8 rounded-[2.5rem] relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] -z-10 -translate-x-1/2 translate-y-1/2" />
          
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-3xl font-bold">Create Account</h2>
            <p className="text-white/50 text-sm mt-2">Join ArenaMind OS</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-white/60 ml-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/50 transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-white/60 ml-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/50 transition-all"
                  placeholder="admin@fifa26.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-white/60 ml-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/50 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-secondary text-black hover:opacity-90 font-semibold rounded-2xl py-3.5 mt-4 transition-all flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <span>Register</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-white/50 mt-8">
            Already have an account? <a href="/login" className="text-secondary hover:underline">Sign In</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
