"use client";

import { motion } from "framer-motion";
import { CheckSquare, AlertCircle, Clock, MapPin, UserCheck } from "lucide-react";

export default function VolunteerHubScreen() {
  const tasks = [
    { id: 1, title: "Assist wheelchair access", location: "Gate C, Sec 12", priority: "High", time: "Now", icon: UserCheck, color: "text-red-400", bg: "bg-red-400/10" },
    { id: 2, title: "Crowd control support", location: "North Concourse", priority: "Medium", time: "In 15m", icon: AlertCircle, color: "text-yellow-400", bg: "bg-yellow-400/10" },
    { id: 3, title: "Restock First Aid Kit", location: "Medical Bay 2", priority: "Low", time: "In 1h", icon: CheckSquare, color: "text-green-400", bg: "bg-green-400/10" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Volunteer Hub</h1>
          <p className="text-white/60 mt-1">Manage tasks and accessibility requests</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="bg-primary text-black px-6 py-2 rounded-xl font-semibold hover:bg-primary/90 transition-colors">
            Report Incident
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 space-y-6"
        >
          <div className="glass-panel rounded-3xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Your Active Tasks</h2>
              <span className="bg-primary/20 text-primary px-3 py-1 rounded-lg text-xs font-medium">3 Pending</span>
            </div>

            <div className="space-y-4">
              {tasks.map((task, i) => {
                const Icon = task.icon;
                return (
                  <motion.div 
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                      <div className={`p-3 rounded-xl ${task.bg} ${task.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white/90">{task.title}</h3>
                        <div className="flex items-center space-x-3 text-xs text-white/50 mt-1">
                          <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {task.location}</span>
                          <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {task.time}</span>
                        </div>
                      </div>
                    </div>
                    <button className="w-full sm:w-auto px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-colors">
                      Mark Complete
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <div className="glass-panel rounded-3xl p-6 border-l-4 border-l-secondary">
            <h2 className="text-lg font-bold mb-2">Current Deployment</h2>
            <p className="text-white/60 text-sm mb-4">You are currently assigned to the North Wing sector.</p>
            
            <div className="aspect-video bg-black/40 rounded-xl border border-white/10 flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-blue-500/10" />
               <MapPin className="w-8 h-8 text-secondary animate-bounce" />
            </div>
          </div>
          
          <div className="glass-panel rounded-3xl p-6 bg-gradient-to-br from-primary/10 to-transparent">
            <h2 className="text-lg font-bold mb-2 text-primary">Need Backup?</h2>
            <p className="text-white/60 text-sm mb-4">Quickly ping nearby volunteers or security for assistance.</p>
            <button className="w-full py-3 bg-red-500/20 text-red-400 rounded-xl text-sm font-semibold hover:bg-red-500/30 transition-colors border border-red-500/30">
              Emergency Ping
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
