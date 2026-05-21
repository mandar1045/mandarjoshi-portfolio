"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/lib/data";
import { Cpu } from "lucide-react";

const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 }
};

export default function About() {
    return (
        <section id="about" className="relative z-10 mx-auto max-w-7xl px-6 py-32">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ staggerChildren: 0.12 }}
            >
                <motion.div variants={cardVariants} className="mb-20 flex items-center justify-center gap-3">
                    <div className="rounded-full border border-secondary/20 bg-white/80 p-3">
                        <Cpu className="text-secondary" size={32} />
                    </div>
                    <h2 className="text-center text-4xl font-black tracking-tighter text-foreground md:text-6xl">
                        SYSTEM <span className="text-gradient">ARCHITECTURE</span>
                    </h2>
                </motion.div>

                <motion.div variants={cardVariants} className="mx-auto w-full max-w-3xl">
                    <div className="glass-panel group relative overflow-hidden rounded-2xl border border-white/60 p-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-secondary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        <div className="border-b border-border/60 bg-[#eee4d7]/70 px-4 py-3 flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-[#d8b89b]" />
                            <div className="h-3 w-3 rounded-full bg-[#d7c3a3]" />
                            <div className="h-3 w-3 rounded-full bg-[#b8c8b2]" />
                            <div className="ml-auto font-mono text-xs text-muted-foreground">user@mandar-dev:~</div>
                        </div>

                        <div className="relative z-10 p-8 font-mono text-base leading-relaxed text-muted-foreground md:text-lg">
                            <p className="mb-4">
                                <span className="text-secondary">➜</span>{" "}
                                <span className="text-foreground">whoami</span>
                            </p>
                            <p className="mb-6 border-l-2 border-secondary/25 pl-4 text-foreground/80">
                                {resumeData.summary}
                            </p>

                            <p className="mb-4">
                                <span className="text-secondary">➜</span>{" "}
                                <span className="text-foreground">current_status</span>
                            </p>
                            <p className="border-l-2 border-secondary/25 pl-4 text-foreground">
                                {resumeData.role}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
