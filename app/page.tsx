"use client";

import { motion, Variants } from "framer-motion"; // Added Variants to the import

export default function Home() {
  // Explicitly defined types to satisfy the TypeScript compiler on Vercel
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
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24 bg-slate-50 overflow-x-hidden">
      {/* Challenge Badge - Simple Fade In */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="z-10 max-w-5xl w-full flex justify-center lg:justify-between font-mono text-sm mb-12 lg:mb-0"
      >
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4">
          Day 1: #ENg30DayChallenge
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
          <button className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all active:scale-95 shadow-md">
            Start Building
          </button>
          <button className="w-full sm:w-auto border border-slate-300 bg-white px-8 py-3 text-[#000000] rounded-lg font-semibold hover:bg-slate-100 transition-all active:scale-95">
            Learn More
          </button>
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
    </main>
  );
}