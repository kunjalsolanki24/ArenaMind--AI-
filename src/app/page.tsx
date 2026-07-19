"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Shield, Users, Map } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";

export default function LandingScreen() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Hide splash screen after animation completes
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Initial Full Screen Logo Animation */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <div className="glass-panel p-6 rounded-3xl mb-6 shadow-[0_0_80px_rgba(0,242,254,0.3)] relative group border-primary/40">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-secondary/30 rounded-3xl opacity-50 blur-xl -z-10" />
                <Activity className="w-20 h-20 text-primary animate-pulse" />
              </div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-4xl font-extrabold tracking-tight"
              >
                ArenaMind <span className="text-gradient">OS</span>
              </motion.h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="glass-panel sticky top-0 z-50 px-6 py-4 flex justify-between items-center border-b border-white/10"
      >
        <div className="flex items-center space-x-2">
          <Activity className="w-6 h-6 text-primary" />
          <span className="font-bold text-xl tracking-tight">ArenaMind</span>
        </div>
        <button onClick={() => router.push('/login')} className="bg-primary/20 text-primary px-6 py-2.5 rounded-full font-bold hover:bg-primary/30 transition-colors shadow-sm">
          Sign In
        </button>
      </motion.header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 relative">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="z-10 max-w-4xl"
        >
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs font-medium text-white/70">FIFA World Cup 2026 Ready</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            The Smart Stadium <br />
            <span className="text-gradient">Operating System</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto font-light">
            Empower organizers, volunteers, and fans with real-time crowd intelligence, predictive AI, and interactive 3D navigation.
          </p>

          <button onClick={() => router.push('/login')} className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]">
            Explore Platform
          </button>
        </motion.div>

        {/* 3D Background Element */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 2.8, duration: 2 }}
          className="absolute inset-0 -z-10"
        >
          <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
            <Sphere args={[1.5, 64, 64]} position={[0, 0, 0]}>
              <MeshDistortMaterial
                color="#00f2fe"
                attach="material"
                distort={0.4}
                speed={2}
                roughness={0.2}
              />
            </Sphere>
          </Canvas>
        </motion.div>
      </main>

      {/* Feature Cards */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Users, title: "Crowd Intelligence", desc: "Predict congestion before it happens with AI." },
            { icon: Map, title: "3D Navigation", desc: "Interactive mapping for fans and emergency routing." },
            { icon: Shield, title: "Instant Response", desc: "Automated task delegation to volunteers." }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform cursor-pointer border border-white/5 hover:border-primary/30 group"
            >
              <div className="p-4 bg-primary/10 w-max rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-white/60">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-panel py-8 text-center border-t border-white/10 z-10">
        <p className="text-white/40 text-sm">ArenaMind AI MVP - Built for FIFA WC 2026 Hackathon</p>
      </footer>
    </div>
  );
}
