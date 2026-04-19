"use client";
import Link from "next/link";
import { motion, Variants } from "framer-motion"; // Added Variants to the import
import { Brain, Zap, Target, BarChart3 } from "lucide-react";
export default function HeroSection() {
      const containerVariants: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Time between each child's animation
      },
    },
  };

  const itemVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  };
  return (
    // <div className="text-center mt-12 md:mt-20">
    //   <h1 className="text-4xl font-bold text-slate-800">Welcome to FocusFlow</h1>
    //   <p className="text-lg text-slate-600 mt-4">
    //     Your all-in-one productivity companion
    //   </p>
    // </div>


     <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24 bg-slate-100 overflow-x-hidden">
      {/* Challenge Badge - Simple Fade In */}
  {/* Challenge Badge - Hanging/Dangling Effect */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          rotate: [0, -3, 3, -2, 2, 0], // The "dangle" sequence
        }}
        transition={{
          opacity: { duration: 0.5 },
          y: { duration: 0.5 },
          rotate: {
            delay: 0.5,
            duration: 4,
            repeat: Infinity, // Keeps it dangling
            ease: "easeInOut",
          }
        }}
        style={{ originY: 0 }} // Sets the "hinge" at the top
        className="z-10 max-w-5xl w-full flex justify-center lg:justify-between font-mono text-sm mb-12 lg:mb-0"
      >
        <p className="fixed left-0 top-0 flex w-full text-[#000000] justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-400 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-400 lg:p-4 shadow-sm">
          Day 14: #ENg30DayChallenge
        </p>
      </motion.div>

      {/* Hero Section Container */}
      <motion.div 
        className="text-center mt-12 md:mt-20"
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }} 
      >
        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-6xl font-bold text-[#000000] mb-6 tracking-tight"
        >
          FocusFlow
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-slate-900 max-w-2xl mx-auto mb-10 px-4"
        >
          AI-powered productivity that respects your bandwidth. 
          Break down tasks and manage your energy, not just your time.
        </motion.p>
        
        {/* Buttons - Staggered within the Hero Section */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
        <Link href="/dashboard">  <button className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all active:scale-95 shadow-md">
            Start Building
          </button>
          </Link>
            <Link href="/learn-more">  <button className="w-full sm:w-auto bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all active:scale-95 shadow-sm">
              Learn More
            </button>
          </Link>

        </motion.div>
      </motion.div>

      <motion.div 
        className="mt-10 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-4xl w-full"
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div 
          variants={itemVariants}
          className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-default"
        >
          <h3 className="font-bold md:text-xl text-lg mb-2 text-[#000000] flex items-center gap-2">
            AI Task Decomposition
          </h3>
          <p className="text-slate-900 text-sm md:text-lg leading-relaxed">
            Automatically split big goals into manageable sub-tasks using GPT-4 architecture.
          </p>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-default"
        >
          <h3 className="font-bold md:text-xl text-lg mb-2 text-[#000000] flex items-center gap-2">
            Energy Tracking
          </h3>
          <p className="text-slate-900 text-sm md:text-lg leading-relaxed">
            Tag tasks by mental load and filter your day based on how you feel right now.
          </p>
        </motion.div>
      </motion.div>









{/* Add this below your <HeroSection /> */}
<section className="py-20 bg-white/20 mt-10">
  <div className="max-w-6xl mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Master Your Workflow</h2>
      <p className="text-black/70 max-w-xl mx-auto">FocusFlow isn't just a to-do list. It's an operating system for your brain.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-10">
      {[
        {
          icon: Brain,
          title: "Cognitive Offloading",
          desc: "Clear your mental space by dumping every task into our secure cloud vault instantly."
        },
        {
          icon: Zap,
          title: "Energy Syncing",
          desc: "Our algorithm suggests the best time to work based on your historical peak focus hours."
        },
        {
          icon: Target,
          title: "Deep Work Mode",
          desc: "Silence the noise with built-in focus timers designed to keep you in the flow state longer."
        }
      ].map((feature, i) => (
        <div key={i} className="flex flex-col items-center text-center p-6">
          <div className="w-full h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
            <feature.icon className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-black mb-3">{feature.title}</h3>
          <p className="text-black text-lg leading-relaxed">{feature.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>


    </main>
  );
}