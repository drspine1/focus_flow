"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Zap, BrainCircuit, ShieldCheck, ArrowRight, Lightbulb, CheckCircle2 } from "lucide-react";

// Animation Variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function LearnMorePage() {
  return (
    <div className="min-h-screen bg-slate-100 overflow-x-hidden">
      {/* Navigation */}
      <nav className="p-4 md:p-6 flex justify-between items-center max-w-6xl mx-auto border-b border-black/5">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600">
          <CheckCircle2 className="w-6 h-6" /> FocusFlow
        </Link>
        <Link href="/dashboard" className="bg-blue-600 text-white px-4 py-2 md:px-5 md:py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md text-sm md:text-base">
          Get Started
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Hero Section */}
        <motion.header 
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="text-center mb-16 md:mb-20"
        >
          <motion.h1 
            variants={fadeIn}
            className="text-4xl md:text-6xl font-extrabold text-black mb-6 tracking-tight px-2"
          >
            Work with your <span className="text-blue-600">Biology</span>, not against it.
          </motion.h1>
          <motion.p 
            variants={fadeIn}
            className="text-lg md:text-xl text-black/70 leading-relaxed max-w-2xl mx-auto"
          >
            FocusFlow reimagines productivity by aligning your daily output with your natural mental energy peaks.
          </motion.p>
        </motion.header>

        {/* The Methodology Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-20 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">The Energy-First Approach</h2>
            <p className="text-base md:text-lg text-black/90 mb-6 leading-relaxed">
              Traditional time management assumes every hour is equal. FocusFlow helps you prioritize based on your cognitive bandwidth:
            </p>
            <div className="space-y-3">
              {[
                { icon: Zap, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-100", title: "High Power:", desc: "Deep work and complex architecture." },
                { icon: BrainCircuit, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100", title: "Medium Flow:", desc: "Creative brainstorming and docs." },
                { icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50", border: "border-green-100", title: "Low Energy:", desc: "Maintenance and admin tasks." }
              ].map((item, index) => (
                <div key={index} className={`flex gap-4 p-4 ${item.bg} rounded-2xl border ${item.border}`}>
                  <item.icon className={`${item.color} w-6 h-6 shrink-0`} />
                  <p className="text-black text-sm md:text-base font-medium">
                    <strong className="text-black">{item.title}</strong> {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 2 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl mt-8 md:mt-0"
          >
             <Lightbulb className="text-yellow-400 w-10 h-10 md:w-12 md:h-12 mb-6" />
             <h3 className="text-xl md:text-2xl font-bold mb-4">Optimization Tip</h3>
             <p className="opacity-80 text-sm md:text-base leading-relaxed italic">
               "Schedule your High Power tasks during your peak alertness window—typically the first 4 hours of your workday—for maximum cognitive efficiency."
             </p>
          </motion.div>
        </section>

         <section className="mb-24">
  <h2 className="text-3xl font-bold text-black mb-12 text-center">The FocusFlow Engine</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {[
      { 
        step: "01", 
        title: "Dump your brain", 
        desc: "Add your tasks as they come. Don't worry about the order yet—just get them out of your head." 
      },
      { 
        step: "02", 
        title: "Assign Energy", 
        desc: "Tag each task as High, Mid, or Low power based on the mental effort required." 
      },
      { 
        step: "03", 
        title: "Filter & Execute", 
        desc: "Check your internal 'battery.' Feeling sharp? Filter for High Power. Feeling tired? Switch to Low Energy." 
      }
    ].map((item, i) => (
      <div key={i} className="relative p-8 bg-white border border-black/5 rounded-[2rem] shadow-sm hover:shadow-lg transition-shadow">
        <span className="text-4xl font-black text-black/5 absolute top-4 right-6">{item.step}</span>
        <h3 className="text-xl font-bold text-black mb-3">{item.title}</h3>
        <p className="text-black/90 text-lg leading-relaxed">{item.desc}</p>
      </div>
    ))}
  </div>
</section>



        {/* Privacy & Trust */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 md:mb-24 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-full mb-6">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
            <span className="text-sm md:text-lg font-bold text-black">Privacy Focused</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-6 px-4">Your Data Stays Yours</h2>
          <p className="md:text-lg text-black max-w-2xl mx-auto px-4">
            FocusFlow uses local-first encryption. Your task data is handled with the highest security standards, ensuring your strategic plans remain private.
          </p>
        </motion.section>

        {/* Final CTA */}
        <motion.section 
          whileHover={{ y: -5 }}
          className="bg-slate-50 border border-black/5 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 text-center shadow-inner"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">Ready to reach your peak?</h2>
          <p className="text-black/90 mb-8 max-w-md mx-auto text-sm md:text-base px-2">
            Experience the difference of an energy-mapped workflow. Start building your focus today.
          </p>
          <Link href="/dashboard" className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 md:px-10 md:py-4 rounded-2xl font-bold text-base md:text-lg hover:bg-blue-700 transition-all shadow-lg active:scale-95">
            Get Started <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.section>
      </main>
    </div>
  );
}