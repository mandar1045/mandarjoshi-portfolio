"use client";

import { motion } from "framer-motion";
import { Terminal, ArrowRight } from "lucide-react";
import Link from "next/link";
import Typewriter from "typewriter-effect";

export default function Hero() {
    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">

            {/* Overlay Gradient for contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 pointer-events-none" />

            <div className="container relative z-10 px-6 mx-auto flex flex-col items-center text-center">

                {/* System Status */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md"
                >
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#00f3ff]" />
                    <span className="text-xs font-mono font-bold text-primary tracking-[0.2em] uppercase">System Operational</span>
                </motion.div>

                {/* Main Heading with Glitch Effect */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-6 relative overflow-visible"
                >
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary leading-none glitch-text overflow-visible" data-text="MANDAR">
                        MANDAR
                    </h1>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary leading-none glitch-text overflow-visible" data-text="JOSHI">
                        JOSHI
                    </h1>
                </motion.div>

                {/* Typewriter Subheading */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-xl md:text-2xl text-muted-foreground font-medium mb-12 font-mono h-[30px] flex items-center justify-center gap-2"
                >
                    <span className="text-primary">&gt;</span>
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
                            wrapperClassName: "text-gray-200"
                        }}
                    />
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col items-center gap-6"
                >
                    <Link
                        href="#contact"
                        className="group px-8 py-4 border border-white/20 bg-black/40 backdrop-blur-sm text-white font-bold text-sm tracking-widest uppercase hover:border-primary/50 transition-all hover:shadow-[0_0_20px_rgba(0,243,255,0.3)] flex items-center gap-2"
                    >
                        <span>Contact Link</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-primary" />
                    </Link>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Scroll to Explore</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
            </motion.div>

        </section>
    );
}
