"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, Home, Map, Users, HardHat, User,
  Settings, LogOut, MessageSquare, Menu, X, Compass, Accessibility, FileText, Globe
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useDemoStore } from "@/store/useDemoStore";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { language, setLanguage } = useDemoStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "AI Copilot", href: "/dashboard/ai-copilot", icon: MessageSquare },
    { name: "Live Stadium", href: "/dashboard/map", icon: Map },
    { name: "Crowd Intel", href: "/dashboard/crowd-analytics", icon: Users },
    { name: "Smart Navigation", href: "/dashboard/smart-navigation", icon: Compass },
    { name: "Volunteer Hub", href: "/dashboard/volunteer-hub", icon: HardHat },
    { name: "Accessibility", href: "/dashboard/accessibility", icon: Accessibility },
    { name: "Reports", href: "/dashboard/reports", icon: FileText },
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const languages = ["EN", "ES", "FR", "AR", "HI"];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row relative">
      {/* Mobile Header */}
      <div className="md:hidden glass-panel m-4 rounded-2xl p-4 flex justify-between items-center z-50 sticky top-4">
        <div className="flex items-center space-x-2">
          <Activity className="w-6 h-6 text-primary" />
          <span className="font-bold text-lg tracking-tight">ArenaMind</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar (Desktop) */}
      <motion.aside 
        className={`fixed md:sticky top-0 left-0 h-screen w-64 glass-panel border-r border-white/10 z-40 p-6 flex-col justify-between hidden md:flex overflow-y-auto scrollbar-hide`}
      >
        <div>
          <div className="flex items-center space-x-3 mb-8 px-2">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Activity className="w-7 h-7 text-primary" />
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              ArenaMind OS
            </span>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link key={item.name} href={item.href}>
                  <div className={`relative flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-primary/10 text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
                    <Icon className="w-5 h-5 z-10" />
                    <span className="font-medium text-sm z-10">{item.name}</span>
                    {isActive && (
                      <motion.div layoutId="active-indicator" className="absolute left-0 w-1 h-6 bg-primary rounded-r-full z-10" />
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10 mt-6">
          <div className="flex items-center justify-between px-2 mb-6">
            <div className="flex items-center space-x-2 text-white/50 text-sm">
              <Globe className="w-4 h-4" />
              <span>Language</span>
            </div>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-lg text-xs p-1 outline-none text-white focus:border-primary"
            >
              {languages.map(lang => <option key={lang} value={lang.toLowerCase()}>{lang}</option>)}
            </select>
          </div>

          <Link href="/dashboard/profile">
            <div className="flex items-center space-x-3 px-4 py-3 bg-black/40 rounded-xl mb-4 hover:bg-black/60 transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold text-black">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div className="overflow-hidden flex-1">
                <p className="text-sm font-semibold truncate">{user?.name || "Demo User"}</p>
                <p className="text-xs text-white/40 truncate">{user?.role || "Organizer"}</p>
              </div>
              <User className="w-4 h-4 text-white/30 group-hover:text-primary transition-colors" />
            </div>
          </Link>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400/80 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </div>
      </motion.aside>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-20 z-40 p-4 md:hidden"
          >
            <div className="glass-panel h-full rounded-3xl p-6 flex flex-col justify-between overflow-y-auto">
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                      <div className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-primary/10 text-primary' : 'text-white/60'}`}>
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </Link>
                  );
                })}
              </nav>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-3 px-4 py-4 rounded-xl bg-red-500/10 text-red-400 mt-6"
              >
                <LogOut className="w-6 h-6" />
                <span className="font-medium text-lg">Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 md:p-8 pt-0 md:pt-8 overflow-y-auto pb-24">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
