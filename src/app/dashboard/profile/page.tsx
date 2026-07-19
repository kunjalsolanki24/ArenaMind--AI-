"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/store/useAuthStore";
import { User, Mail, Phone, Save, LogOut, CheckCircle, Edit3, X, Camera } from "lucide-react";

export default function ProfilePage() {
  const { user, updateProfile, logout } = useAuthStore();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "" });

  const handleSave = () => {
    updateProfile(form);
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const avatarLetter = user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Welcome Banner */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 pointer-events-none" />
        <h1 className="text-2xl font-bold">Welcome, {user?.name?.split(" ")[0]} 👋</h1>
        <p className="text-white/50 text-sm mt-1">Manage your ArenaMind profile and preferences below.</p>
      </motion.div>

      {/* Profile Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] pointer-events-none" />

        {/* Avatar */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
          <div className="relative group cursor-pointer">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-4xl font-bold text-black shadow-[0_0_30px_rgba(0,242,254,0.3)]">
              {avatarLetter}
            </div>
            <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-white/50 text-sm">{user?.email}</p>
            <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-semibold">{user?.role || "No Role"}</span>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400" />Active</span>
            </div>
          </div>
          {!editing && (
            <button onClick={() => setEditing(true)} className="ml-auto flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl text-sm transition-colors">
              <Edit3 className="w-4 h-4" /> Edit
            </button>
          )}
        </div>

        {/* Fields */}
        <AnimatePresence mode="wait">
          {editing ? (
            <motion.div key="edit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              {[
                { label: "Full Name", icon: User, field: "name", type: "text", placeholder: "Your full name" },
                { label: "Email Address", icon: Mail, field: "email", type: "email", placeholder: "your@email.com" },
                { label: "Phone Number", icon: Phone, field: "phone", type: "tel", placeholder: "+1 234 567 890" },
              ].map(({ label, icon: Icon, field, type, placeholder }) => (
                <div key={field} className="space-y-1">
                  <label className="text-xs font-medium text-white/60 ml-2">{label}</label>
                  <div className="relative">
                    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type={type}
                      value={form[field as keyof typeof form]}
                      onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                      placeholder={placeholder}
                    />
                  </div>
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <button onClick={handleSave} className="flex-1 bg-primary text-black font-semibold rounded-2xl py-3 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                  <Save className="w-4 h-4" /> Save Changes
                </button>
                <button onClick={() => setEditing(false)} className="px-4 py-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Full Name", icon: User, value: user?.name },
                { label: "Email", icon: Mail, value: user?.email },
                { label: "Phone", icon: Phone, value: user?.phone || "Not set" },
                { label: "Role", icon: User, value: user?.role || "None selected" },
              ].map(({ label, icon: Icon, value }) => (
                <div key={label} className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-2 text-white/50 text-xs mb-1"><Icon className="w-3 h-3" />{label}</div>
                  <p className="font-semibold text-white/90">{value}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Save success toast */}
        <AnimatePresence>
          {saved && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed bottom-8 right-8 bg-green-500/20 border border-green-500/40 text-green-400 px-5 py-3 rounded-2xl flex items-center gap-2 font-medium text-sm backdrop-blur-md">
              <CheckCircle className="w-4 h-4" /> Profile saved successfully!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Logout */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <button onClick={handleLogout} className="w-full glass-panel rounded-3xl p-5 flex items-center justify-between hover:bg-red-500/10 border border-white/5 hover:border-red-500/20 transition-all group">
          <div>
            <p className="font-semibold text-red-400">Sign Out</p>
            <p className="text-white/40 text-sm">You will be redirected to the login page.</p>
          </div>
          <LogOut className="w-5 h-5 text-red-400 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
}
