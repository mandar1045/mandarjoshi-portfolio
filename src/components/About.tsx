"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/lib/data";
import { Cpu } from "lucide-react";

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function About() {
    return (
        <section id="about" className="py-32 px-6 max-w-7xl mx-auto relative z-10">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ staggerChildren: 0.2 }}
            >
                {/* Header */}
                <motion.div variants={cardVariants} className="flex items-center justify-center gap-3 mb-20">
                    <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                        <Cpu className="text-primary" size={32} />
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-center text-white tracking-tighter">
                        SYSTEM <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">ARCHITECTURE</span>
                    </h2>
                </motion.div>

                {/* Bio Section - Terminal Style - Centered */}
                <motion.div variants={cardVariants} className="max-w-3xl mx-auto w-full">
                    <div className="glass-panel p-1 rounded-2xl border border-white/10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Mac-like header */}
                        <div className="bg-black/50 px-4 py-3 flex items-center gap-2 border-b border-white/5">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            <div className="ml-auto text-xs text-stone-500 font-mono">user@mandar-dev:~</div>
                        </div>

                        <div className="p-8 font-mono text-base md:text-lg leading-relaxed text-gray-300 relative z-10">
                            <p className="mb-4">
                                <span className="text-primary">➜</span> <span className="text-secondary">whoami</span>
                            </p>
                            <p className="mb-6 pl-4 border-l-2 border-primary/20">
                                {resumeData.summary}
                            </p>

                            <p className="mb-4">
                                <span className="text-primary">➜</span> <span className="text-secondary">current_status</span>
                            </p>
                            <p className="pl-4 border-l-2 border-primary/20">
                                {resumeData.role}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
