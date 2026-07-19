"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuthStore, UserRole } from "@/store/useAuthStore";
import { Users, HardHat, Shield } from "lucide-react";

export default function RoleSelectionScreen() {
  const router = useRouter();
  const { user, updateProfile } = useAuthStore();

  // If not logged in, redirect to login
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const selectRole = (role: UserRole) => {
    updateProfile({ role });
    router.push("/dashboard");
  };

  const roles = [
    {
      id: "Fan",
      title: "Fan",
      description: "Navigate the stadium, order food, and get real-time game updates.",
      icon: Users,
      color: "from-blue-500/20 to-cyan-500/20",
      border: "hover:border-cyan-500/50",
      iconColor: "text-cyan-400"
    },
    {
      id: "Volunteer",
      title: "Volunteer",
      description: "Access task assignments, report issues, and help fans.",
      icon: HardHat,
      color: "from-green-500/20 to-emerald-500/20",
      border: "hover:border-emerald-500/50",
      iconColor: "text-emerald-400"
    },
    {
      id: "Organizer",
      title: "Organizer",
      description: "Monitor crowd density, view stadium operations, and manage staff.",
      icon: Shield,
      color: "from-purple-500/20 to-indigo-500/20",
      border: "hover:border-indigo-500/50",
      iconColor: "text-indigo-400"
    }
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Choose Your Role</h2>
          <p className="text-white/60 text-lg">Select how you will experience ArenaMind OS</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role, idx) => {
            const Icon = role.icon;
            return (
              <motion.button
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => selectRole(role.id as UserRole)}
                className={`glass-panel p-8 rounded-3xl text-left relative overflow-hidden transition-all duration-300 group border border-white/5 ${role.border} hover:-translate-y-2`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
                
                <div className="mb-6 inline-block p-4 bg-black/40 rounded-2xl border border-white/10 group-hover:scale-110 transition-transform">
                  <Icon className={`w-8 h-8 ${role.iconColor}`} />
                </div>
                
                <h3 className="text-2xl font-bold mb-3">{role.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{role.description}</p>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
