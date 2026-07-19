"use client";

import { motion } from "framer-motion";
import { useAuthStore } from "@/store/useAuthStore";
import { User, Bell, Shield, Moon } from "lucide-react";

export default function SettingsScreen() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-white/60 mt-1">Manage your ArenaMind OS preferences</p>
      </div>

      <div className="space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-3xl p-6"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-2xl font-bold">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div>
              <h2 className="text-xl font-bold">{user?.name || "Demo User"}</h2>
              <p className="text-white/50">{user?.email || "user@example.com"}</p>
              <div className="mt-1 px-2 py-0.5 bg-primary/20 text-primary rounded-full text-xs inline-block">
                {user?.role || "Fan"} Role
              </div>
            </div>
          </div>
          <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-sm transition-colors">
            Edit Profile
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel rounded-3xl p-6"
          >
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <Bell className="w-5 h-5 mr-2 text-primary" />
              Notifications
            </h3>
            <div className="space-y-4">
              {["Push Notifications", "Email Alerts", "Critical Incidents (SMS)"].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">{item}</span>
                  <div className="w-10 h-6 bg-primary/20 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-primary rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel rounded-3xl p-6"
          >
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-secondary" />
              Privacy & Security
            </h3>
            <div className="space-y-4">
               {["Share location with organizers", "Allow anonymous analytics"].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">{item}</span>
                  <div className="w-10 h-6 bg-white/10 rounded-full relative cursor-pointer">
                    <div className={`absolute ${i===0 ? 'right-1 bg-primary' : 'left-1 bg-white/50'} top-1 w-4 h-4 rounded-full`} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
