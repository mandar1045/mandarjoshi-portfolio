"use client";

import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navigation = [
    { name: "About", path: "/about" },
    { name: "Skills", path: "/skills" },
    { name: "Experience", path: "/experience" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 16);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45 }}
            className={cn(
                "fixed top-4 left-1/2 z-50 flex w-[92%] max-w-6xl -translate-x-1/2 items-center justify-between rounded-full px-5 py-3 md:px-7",
                scrolled
                    ? "border border-white/70 bg-white/78 shadow-[0_18px_40px_rgba(94,72,50,0.12)] backdrop-blur-xl"
                    : "border border-white/50 bg-white/58 backdrop-blur-lg"
            )}
        >
            <Link href="/" className="flex items-center gap-3 text-primary">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/15 bg-primary text-sm font-semibold text-primary-foreground">
                    MJ
                </div>
                <div>
                    <p className="text-sm font-semibold tracking-tight text-foreground">Mandar Joshi</p>
                    <p className="text-xs text-muted-foreground">Software Engineer</p>
                </div>
            </Link>

            <div className="hidden items-center gap-7 md:flex">
                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        href={item.path}
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        {item.name}
                    </Link>
                ))}
            </div>

            <div className="flex items-center gap-3">
                <Link
                    href="https://github.com/mandar1045"
                    target="_blank"
                    className="rounded-full border border-transparent p-2 text-muted-foreground transition-colors hover:border-border hover:bg-white/60 hover:text-foreground"
                >
                    <Github size={18} />
                </Link>
                <Link
                    href="https://linkedin.com/in/mandar-joshi-0b951b28a"
                    target="_blank"
                    className="rounded-full border border-transparent p-2 text-muted-foreground transition-colors hover:border-border hover:bg-white/60 hover:text-foreground"
                >
                    <Linkedin size={18} />
                </Link>
                <Link
                    href="https://drive.google.com/file/d/14D60DcuBjqzsVc6QSNhtfTqiLQBdp_Mi/view?usp=drivesdk"
                    className="hidden rounded-full border border-primary/15 bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex"
                >
                    Resume
                </Link>
            </div>
        </motion.nav>
    );
}
