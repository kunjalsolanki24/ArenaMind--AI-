"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Activity } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel p-12 rounded-3xl max-w-md">
        <div className="p-4 bg-primary/10 rounded-2xl w-max mx-auto mb-6">
          <Activity className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-8xl font-extrabold text-gradient mb-4">404</h1>
        <p className="text-white/60 mb-8">This page doesn't exist in the stadium.</p>
        <Link href="/dashboard" className="bg-primary text-black px-6 py-3 rounded-2xl font-bold hover:opacity-90 transition-opacity">
          Back to Dashboard
        </Link>
      </motion.div>
    </div>
  );
}
