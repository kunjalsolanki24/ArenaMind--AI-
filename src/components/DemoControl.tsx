"use client";

import { useDemoStore } from "@/store/useDemoStore";
import { Play, FastForward } from "lucide-react";
import { motion } from "framer-motion";

export default function DemoControl() {
  const { stage, nextStage } = useDemoStore();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 glass-panel px-6 py-3 rounded-full flex items-center space-x-4 border border-primary/30"
    >
      <div className="flex flex-col">
        <span className="text-[10px] text-white/50 uppercase tracking-wider font-bold">Hackathon Demo Flow</span>
        <span className="text-xs text-primary font-medium">{stage.replace(/_/g, ' ')}</span>
      </div>
      <div className="w-px h-6 bg-white/20 mx-2" />
      <button 
        onClick={nextStage}
        className="flex items-center space-x-2 bg-primary/20 hover:bg-primary/40 text-primary px-4 py-1.5 rounded-full text-xs font-bold transition-colors"
      >
        <span>Next Step</span>
        <FastForward className="w-3 h-3" />
      </button>
    </motion.div>
  );
}
