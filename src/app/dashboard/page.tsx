"use client";

import { motion } from "framer-motion";
import { useAuthStore } from "@/store/useAuthStore";
import { Users, Activity, Navigation, ThermometerSun, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function DashboardOverview() {
  const { user } = useAuthStore();

  const stats = [
    { label: "Current Crowd", value: "62,450", change: "+12%", icon: Users, color: "text-blue-400" },
    { label: "Queue Time (Avg)", value: "4.2 min", change: "-1.5 min", icon: Activity, color: "text-green-400" },
    { label: "Active Incidents", value: "3", change: "-2", icon: AlertTriangle, color: "text-yellow-400" },
    { label: "Temperature", value: "24°C", change: "Optimal", icon: ThermometerSun, color: "text-orange-400" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Hello, {user?.name?.split(' ')[0] || "User"} 👋
          </h1>
          <p className="text-white/60 mt-1">Here is the current stadium overview for today's match.</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm font-medium border border-green-500/20">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span>System Nominal</span>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-6 rounded-3xl relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl bg-black/40 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-white/60 bg-white/5 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
              <p className="text-white/50 text-sm">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Main Dashboard Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass-panel rounded-3xl p-6 min-h-[400px] flex flex-col relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold">Live Stadium Map</h2>
              <p className="text-white/50 text-sm">Real-time crowd flow and sector status</p>
            </div>
            <button className="bg-primary/20 text-primary px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary/30 transition-colors">
              Expand View
            </button>
          </div>

          <div className="flex-1 rounded-2xl border border-white/10 bg-black/40 flex items-center justify-center relative overflow-hidden group">
             {/* Mock 3D / Map Area */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
             <div className="text-center z-10">
               <Navigation className="w-12 h-12 text-white/20 mx-auto mb-3 group-hover:text-primary transition-colors duration-500" />
               <p className="text-white/40 font-medium">3D Map Initialization...</p>
             </div>
             
             {/* Fake hot zones */}
             <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-500/20 rounded-full blur-2xl animate-pulse" />
             <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl" />
          </div>
        </motion.div>

        {/* AI Insights & Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          {/* AI Insights Card */}
          <div className="glass-panel rounded-3xl p-6 relative overflow-hidden border-primary/20">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
            <div className="flex items-center space-x-2 mb-4">
              <Activity className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold">Copilot Insights</h2>
            </div>
            
            <div className="space-y-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                <p className="text-sm text-white/80 leading-relaxed">
                  <span className="text-primary font-semibold">Predicted surge</span> at North Gate in 15 mins. Recommend opening 2 additional turnstiles.
                </p>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                <p className="text-sm text-white/80 leading-relaxed">
                  Food stall 4A is running low on inventory based on current purchase rates.
                </p>
              </div>
            </div>
            
            <button className="w-full mt-4 bg-primary text-black font-semibold rounded-xl py-3 hover:bg-primary/90 transition-colors text-sm">
              Ask AI Copilot
            </button>
          </div>

          {/* Task Status / Quick Actions */}
          <div className="glass-panel rounded-3xl p-6">
            <h2 className="text-lg font-bold mb-4">Recent Operations</h2>
            <div className="space-y-3">
              {[
                { task: "North Gate Inspection", time: "10m ago" },
                { task: "Medical Team Dispatched (Sec B)", time: "25m ago" },
                { task: "VIP Area Pre-check", time: "1h ago" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-white/80">{item.task}</span>
                  </div>
                  <span className="text-xs text-white/40">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
