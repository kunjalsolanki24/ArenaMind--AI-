"use client";

import { motion } from "framer-motion";
import { Users, TrendingUp, AlertOctagon, BarChart3 } from "lucide-react";

export default function CrowdAnalyticsScreen() {
  const regions = [
    { name: "North Wing (Gates A-D)", density: 82, trend: "+5%", status: "High" },
    { name: "East Wing (Gates E-H)", density: 45, trend: "-2%", status: "Nominal" },
    { name: "South Wing (Gates I-L)", density: 60, trend: "+12%", status: "Elevated" },
    { name: "West Wing (VIP & Media)", density: 20, trend: "0%", status: "Low" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Crowd Analytics</h1>
          <p className="text-white/60 mt-1">Real-time density and predictive flow</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area Placeholder */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 glass-panel rounded-3xl p-6 min-h-[400px] flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Stadium Density Heatmap</h2>
            <div className="flex space-x-2">
              <span className="px-3 py-1 bg-white/10 rounded-lg text-xs">Live</span>
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-lg text-xs">+15m Predict</span>
            </div>
          </div>
          
          <div className="flex-1 bg-black/40 rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden group">
            {/* Abstract representation of a chart/heatmap for hackathon */}
            <div className="absolute bottom-0 w-full h-1/2 flex items-end justify-around px-8 space-x-4 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
              <div className="w-full bg-blue-500/50 rounded-t-xl relative h-[40%]"><div className="absolute -top-6 w-full text-center text-xs">40%</div></div>
              <div className="w-full bg-green-500/50 rounded-t-xl relative h-[60%]"><div className="absolute -top-6 w-full text-center text-xs">60%</div></div>
              <div className="w-full bg-red-500/50 rounded-t-xl relative h-[82%]"><div className="absolute -top-6 w-full text-center text-xs">82%</div></div>
              <div className="w-full bg-yellow-500/50 rounded-t-xl relative h-[45%]"><div className="absolute -top-6 w-full text-center text-xs">45%</div></div>
              <div className="w-full bg-primary/50 rounded-t-xl relative h-[70%]"><div className="absolute -top-6 w-full text-center text-xs">70%</div></div>
            </div>
            
            <BarChart3 className="absolute opacity-10 w-32 h-32" />
          </div>
        </motion.div>

        {/* Side Panel: Sector Breakdown */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="glass-panel rounded-3xl p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-red-400" />
              Critical Sectors
            </h2>
            <div className="space-y-4">
              {regions.map((region) => (
                <div key={region.name} className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{region.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${region.density > 75 ? 'bg-red-500/20 text-red-400' : region.density > 50 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                      {region.status}
                    </span>
                  </div>
                  
                  <div className="w-full bg-black/50 rounded-full h-2 mb-2">
                    <div 
                      className={`h-2 rounded-full ${region.density > 75 ? 'bg-red-500' : region.density > 50 ? 'bg-yellow-500' : 'bg-green-500'}`} 
                      style={{ width: `${region.density}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between text-xs text-white/50">
                    <span>{region.density}% Full</span>
                    <span className="flex items-center text-white/70">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {region.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
