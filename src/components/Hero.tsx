"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Typewriter from "typewriter-effect";

export default function Hero() {
    return (
        <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-[#e9dfd1]/70" />

            <div className="container relative z-10 mx-auto flex flex-col items-center px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-white/80 px-4 py-1.5 backdrop-blur-md"
                >
                    <span className="h-2 w-2 rounded-full bg-secondary shadow-[0_0_0_4px_rgba(158,132,106,0.12)]" />
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                        System Operational
                    </span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative mb-6 overflow-visible"
                >
                    <h1 className="text-gradient overflow-visible text-6xl font-black leading-none tracking-tighter md:text-8xl lg:text-9xl">
                        MANDAR
                    </h1>
                    <h1 className="text-gradient overflow-visible text-6xl font-black leading-none tracking-tighter md:text-8xl lg:text-9xl">
                        JOSHI
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mb-12 flex h-[30px] items-center justify-center gap-2 font-mono text-xl font-medium text-muted-foreground md:text-2xl"
                >
                    <span className="text-secondary">&gt;</span>
                    <Typewriter
                        options={{
                            strings: [
                                "Architecting Digital Realities",
                                "Full Stack Engineer",
                                "MERN Stack Developer",
                                "AI/ML Enthusiast",
                                "Cybersecurity Enthusiast"
                            ],
                            autoStart: true,
                            loop: true,
                            deleteSpeed: 30,
                            delay: 50,
                            cursor: "_",
                            wrapperClassName: "text-foreground"
                        }}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col items-center gap-6"
                >
                    <Link
                        href="#contact"
                        className="group flex items-center gap-2 border border-border bg-white/80 px-8 py-4 text-sm font-bold uppercase tracking-widest text-foreground backdrop-blur-sm transition-all hover:border-secondary/40 hover:bg-white"
                    >
                        <span>Contact Link</span>
                        <ArrowRight size={18} className="text-secondary transition-transform group-hover:translate-x-1" />
                    </Link>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Scroll to Explore</span>
                <div className="h-12 w-px bg-gradient-to-b from-secondary/70 to-transparent" />
            </motion.div>
        </section>
    );
}
