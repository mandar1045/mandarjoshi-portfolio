"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/lib/data";
import { BookOpen, Activity, Globe, Cpu } from "lucide-react";
import { useState } from "react";

export default function Profile() {
    const [activeTab, setActiveTab] = useState<"education" | "courses" | "interests">("education");

    return (
        <section className="relative z-10 mx-auto max-w-7xl px-6 py-24">
            <div className="flex flex-col gap-12">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative group w-full"
                >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary/25 to-[#d8c5ae]/25 opacity-40 blur-md transition duration-700 group-hover:opacity-60" />

                    <div className="clip-path-cyberpunk-card relative border border-white/60 bg-white/75 p-2 backdrop-blur-xl">
                        <div className="relative overflow-hidden border border-white/50 bg-[#f5ede2]/80 p-8">
                            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(120,102,79,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,102,79,0.06)_1px,transparent_1px)] bg-[size:32px_32px]" />
                            <div className="animate-scan pointer-events-none absolute top-0 left-0 h-px w-full bg-secondary/25 opacity-50" />

                            <div className="relative z-10">
                                <div className="mb-8 flex flex-col items-start justify-between gap-6 border-b border-border/70 pb-8 md:flex-row md:items-center">
                                    <div>
                                        <div className="mb-3 flex items-center gap-3">
                                            <div className="h-2 w-2 rounded-full bg-[#8b9d7e] shadow-[0_0_0_6px_rgba(139,157,126,0.14)]" />
                                            <span className="font-mono text-xs uppercase tracking-widest text-[#7b8b6d]">
                                                Identity_Confirmed
                                            </span>
                                            <span className="hidden font-mono text-xs text-muted-foreground md:inline">|</span>
                                            <span className="hidden font-mono text-xs uppercase tracking-widest text-secondary md:inline">
                                                ID: 8492-AX
                                            </span>
                                        </div>
                                        <h2 className="mb-2 text-5xl font-black tracking-tighter text-foreground md:text-6xl">
                                            {resumeData.name.toUpperCase()}
                                        </h2>
                                        <p className="font-mono text-lg uppercase tracking-widest text-secondary">{resumeData.role}</p>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="min-w-[120px] border border-white/60 bg-white/65 p-4 text-center">
                                            <div className="mb-1 text-[10px] font-mono uppercase text-muted-foreground">Status</div>
                                            <div className="flex items-center justify-center gap-2 text-sm font-bold tracking-wide text-[#7b8b6d]">
                                                <Activity size={14} /> ACTIVE
                                            </div>
                                        </div>
                                        <div className="min-w-[120px] border border-white/60 bg-white/65 p-4 text-center">
                                            <div className="mb-1 text-[10px] font-mono uppercase text-muted-foreground">Loc</div>
                                            <div className="flex items-center justify-center gap-2 text-sm font-bold tracking-wide text-foreground">
                                                <Globe size={14} /> VELLORE
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
                                    <div className="relative border-l-2 border-secondary/25 pl-6">
                                        <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-muted-foreground">
                                            Mission Profile
                                            <span className="ml-2 rounded bg-secondary/10 px-2 py-0.5 text-xs text-secondary">
                                                CONFIDENTIAL
                                            </span>
                                        </h3>
                                        <p className="font-mono text-lg leading-relaxed text-foreground/80 text-justify">
                                            {resumeData.summary}
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        <div className="rounded border border-dashed border-border bg-white/55 p-4 transition-colors hover:border-secondary/35">
                                            <div className="mb-1 text-xs uppercase text-muted-foreground">Clearance Level</div>
                                            <div className="font-mono text-xl text-foreground">
                                                L-5 <span className="text-xs text-muted-foreground">/ 8</span>
                                            </div>
                                            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-[#dfd3c4]">
                                                <div className="h-full w-[65%] bg-secondary" />
                                            </div>
                                        </div>
                                        <div className="rounded border border-dashed border-border bg-white/55 p-4 transition-colors hover:border-secondary/35">
                                            <div className="mb-1 text-xs uppercase text-muted-foreground">Specialization</div>
                                            <div className="font-mono text-base text-secondary">FULL_STACK_DEV</div>
                                            <p className="mt-1 text-[10px] text-muted-foreground">Node.js, React, Cloud Infra</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative group w-full"
                >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#d9c8b1]/25 to-secondary/20 opacity-40 blur-md transition duration-700 group-hover:opacity-60" />

                    <div className="clip-path-cyberpunk-card relative border border-white/60 bg-white/75 p-2 backdrop-blur-xl">
                        <div className="relative flex min-h-[400px] flex-col overflow-hidden border border-white/50 bg-[#f5ede2]/80 p-6 md:p-8">
                            <div className="pointer-events-none absolute top-0 right-0 p-4 opacity-10">
                                <Cpu size={100} />
                            </div>

                            <div className="z-10 mb-8 flex border-b border-border/70">
                                {(["education", "courses", "interests"] as const).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all ${activeTab === tab
                                            ? "border-b-2 border-secondary bg-secondary/10 text-secondary"
                                            : "text-muted-foreground hover:bg-white/40 hover:text-foreground"
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            <div className="relative z-10 flex-1">
                                {activeTab === "education" && (
                                    <div className="grid gap-6 md:grid-cols-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                        {resumeData.education.map((edu, i) => (
                                            <div
                                                key={i}
                                                className="group relative border border-white/70 bg-white/65 p-6 transition-all hover:border-secondary/40 hover:shadow-[0_10px_24px_rgba(120,102,79,0.08)]"
                                            >
                                                <div className="absolute top-0 right-0 rounded-bl bg-white/80 px-2 py-1 font-mono text-[10px] text-muted-foreground">
                                                    ACADEMIC
                                                </div>
                                                <h4 className="mb-2 text-xl font-bold text-foreground">{edu.institution}</h4>
                                                <p className="mb-4 font-mono text-sm text-secondary">{edu.degree}</p>
                                                <div className="flex items-end justify-between border-t border-border/60 pt-4">
                                                    <div className="font-mono text-xs text-muted-foreground">{edu.date}</div>
                                                    <div className="font-mono text-xs text-muted-foreground">{edu.location}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {activeTab === "courses" && (
                                    <div className="grid gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300 md:grid-cols-2 lg:grid-cols-3">
                                        {resumeData.courses.map((course, i) => (
                                            <div
                                                key={i}
                                                className="group/course border border-white/70 bg-white/65 p-5 transition-all hover:border-secondary/35 hover:bg-white/80"
                                            >
                                                <div className="mb-3 flex items-center justify-between">
                                                    <span className="font-mono text-xs uppercase text-muted-foreground">{course.provider}</span>
                                                    <BookOpen size={14} className="text-muted-foreground transition-colors group-hover/course:text-secondary" />
                                                </div>
                                                <h5 className="mb-2 h-10 line-clamp-2 text-sm font-bold text-foreground transition-colors group-hover/course:text-secondary">
                                                    {course.name}
                                                </h5>
                                                <div className="mt-2 flex justify-between border-t border-border/50 pt-2 font-mono text-[10px] text-muted-foreground">
                                                    <span>COMPLETED</span>
                                                    <span>{course.date}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {activeTab === "interests" && (
                                    <div className="grid gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300 md:grid-cols-[1fr_300px]">
                                        <div className="border border-white/70 bg-white/65 p-6 font-mono text-lg leading-relaxed text-foreground/80">
                                            {resumeData.interests}
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <h4 className="mb-2 text-sm font-bold uppercase tracking-wider text-foreground">
                                                Active Protocols
                                            </h4>
                                            {["Security", "AI Models", "DeFi", "Automation", "Blockchain"].map((tag, i) => (
                                                <div
                                                    key={i}
                                                    className="flex cursor-crosshair items-center gap-2 border border-white/70 bg-white/65 p-2 px-3 font-mono text-xs text-secondary transition-colors hover:bg-secondary/8"
                                                >
                                                    <div className="h-1.5 w-1.5 rounded-full bg-secondary" />
                                                    {tag}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <style jsx global>{`
                .clip-path-cyberpunk-card {
                    clip-path: polygon(
                        0 0,
                        100% 0,
                        100% 100%,
                        97% 100%,
                        95% 98%,
                        5% 98%,
                        3% 100%,
                        0 100%
                    );
                }
                @keyframes scan {
                    0% { top: 0%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
                .animate-scan {
                    animation: scan 4s linear infinite;
                }
            `}</style>
        </section>
    );
}
