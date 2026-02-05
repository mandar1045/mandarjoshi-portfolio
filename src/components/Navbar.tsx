"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Terminal } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={cn(
                "fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 w-[90%] max-w-5xl",
                scrolled
                    ? "glass-card bg-black/50 border-primary/20 shadow-[0_0_15px_rgba(0,243,255,0.1)]"
                    : "bg-transparent border border-transparent"
            )}
        >
            <Link href="/" className="text-xl font-bold tracking-tighter flex items-center gap-2 text-white font-mono">
                <Terminal size={20} className="text-primary" />
                Mandar<span className="text-muted-foreground">_Joshi</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
                {[
                    { name: "About", path: "/about" },
                    { name: "Skills", path: "/skills" },
                    { name: "Experience", path: "/experience" },
                    { name: "Projects", path: "/projects" },
                    { name: "Contact", path: "/#contact" },
                ].map((item) => (
                    <Link
                        key={item.name}
                        href={item.path}
                        className="text-sm font-mono font-medium text-gray-500 hover:text-white transition-colors uppercase tracking-widest"
                    >
                        {item.name}
                    </Link>
                ))}
            </div>

            <div className="flex items-center gap-4">
                <Link
                    href="https://github.com/mandar1045"
                    target="_blank"
                    className="text-gray-500 hover:text-white transition-colors"
                >
                    <Github size={20} />
                </Link>
                <Link
                    href="https://linkedin.com/in/mandar-joshi-0b951b28a"
                    target="_blank"
                    className="text-gray-500 hover:text-white transition-colors"
                >
                    <Linkedin size={20} />
                </Link>
                <Link
                    href="/assets/resume.pdf"
                    target="_blank"
                    className="hidden sm:flex items-center gap-2 px-5 py-2 text-xs font-bold font-mono uppercase tracking-wider text-black bg-white rounded-full hover:bg-gray-200 transition-colors"
                >
                    RESUME
                </Link>
            </div>
        </motion.nav>
    );
}
