"use client";

import { motion } from "framer-motion";
import { Navigation, Maximize2, Layers } from "lucide-react";

export default function LiveStadiumScreen() {
  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Live Stadium Map</h1>
          <p className="text-white/60 mt-1">Interactive 3D view of the venue</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button className="flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm hover:bg-white/10 transition-colors">
            <Layers className="w-4 h-4" />
            <span>Levels</span>
          </button>
          <button className="flex items-center space-x-2 bg-primary/20 text-primary border border-primary/20 px-4 py-2 rounded-xl text-sm hover:bg-primary/30 transition-colors">
            <Maximize2 className="w-4 h-4" />
            <span>Fullscreen</span>
          </button>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 glass-panel rounded-3xl p-2 relative overflow-hidden flex flex-col"
      >
        {/* Mock 3D Container */}
        <div className="flex-1 rounded-2xl bg-black/50 border border-white/5 relative overflow-hidden group flex items-center justify-center">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
          
          {/* Mock glowing stadium center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-96 border-2 border-primary/30 rounded-[100px] bg-primary/5 flex items-center justify-center shadow-[0_0_50px_rgba(0,242,254,0.1)]">
            <div className="w-32 h-64 border border-secondary/50 rounded-[50px] bg-secondary/10 flex items-center justify-center">
              <span className="text-white/20 font-bold tracking-widest rotate-90 whitespace-nowrap">PITCH AREA</span>
            </div>
          </div>

          {/* Overlays / Hotspots */}
          <div className="absolute top-1/4 left-1/3 w-8 h-8 bg-red-500/80 rounded-full animate-ping flex items-center justify-center cursor-pointer hover:bg-red-400">
            <span className="absolute text-[8px] font-bold">A</span>
          </div>
          
          <div className="absolute bottom-1/3 right-1/4 w-8 h-8 bg-green-500/80 rounded-full animate-pulse flex items-center justify-center cursor-pointer hover:bg-green-400">
            <span className="absolute text-[8px] font-bold">B</span>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 flex items-center space-x-4 shadow-xl">
            <Navigation className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Pan & Zoom to explore</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
