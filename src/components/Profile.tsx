"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/lib/data";
import { User, BookOpen, Heart, Activity, Globe, Cpu } from "lucide-react";
import { useState } from "react";

export default function Profile() {
    const [activeTab, setActiveTab] = useState<'education' | 'courses' | 'interests'>('education');

    return (
        <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col gap-12">

                {/* CARD 1: BIO / MISSION PROFILE (Full Width) */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative group w-full"
                >
                    {/* Decorative Outer Glow */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-blue-600/50 opacity-20 group-hover:opacity-60 blur-md transition duration-1000"></div>

                    <div className="relative bg-black/80 backdrop-blur-xl border border-white/10 p-2 clip-path-cyberpunk-card">
                        <div className="bg-black/40 border border-white/5 p-8 relative overflow-hidden">

                            {/* Background Grid Texture */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/30 opacity-50 animate-scan pointer-events-none"></div>

                            {/* Inner Layout: Header Left, Stats Right ?? or Just Stacked Header, then Grid Body */}
                            <div className="relative z-10">
                                {/* Header Row */}
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-8 mb-8">
                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                                            <span className="text-xs font-mono text-green-500 tracking-widest uppercase">Identity_Confirmed</span>
                                            <span className="hidden md:inline text-xs font-mono text-gray-600">|</span>
                                            <span className="hidden md:inline text-xs font-mono text-primary tracking-widest uppercase">ID: 8492-AX</span>
                                        </div>
                                        <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-2">
                                            {resumeData.name.toUpperCase()}
                                        </h2>
                                        <p className="text-primary font-mono text-lg tracking-widest uppercase">{resumeData.role}</p>
                                    </div>

                                    {/* Top Right Stats */}
                                    <div className="flex gap-4">
                                        <div className="p-4 bg-white/5 border border-white/10 text-center min-w-[120px]">
                                            <div className="text-[10px] text-gray-500 font-mono uppercase mb-1">Status</div>
                                            <div className="text-green-400 font-bold text-sm tracking-wide flex justify-center items-center gap-2">
                                                <Activity size={14} /> ACTIVE
                                            </div>
                                        </div>
                                        <div className="p-4 bg-white/5 border border-white/10 text-center min-w-[120px]">
                                            <div className="text-[10px] text-gray-500 font-mono uppercase mb-1">Loc</div>
                                            <div className="text-white font-bold text-sm tracking-wide flex justify-center items-center gap-2">
                                                <Globe size={14} /> VELLORE
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Body Row: Bio + Extra Info */}
                                <div className="grid md:grid-cols-[2fr_1fr] gap-10">
                                    <div className="relative pl-6 border-l-2 border-primary/20">
                                        <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider text-gray-400 flex items-center gap-2">
                                            Mission Profile <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded ml-2">CONFIDENTIAL</span>
                                        </h3>
                                        <p className="text-gray-300 font-mono text-lg leading-relaxed text-justify">
                                            {resumeData.summary}
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        <div className="p-4 border border-dashed border-white/10 rounded bg-white/5 group/stat hover:border-primary/40 transition-colors">
                                            <div className="text-xs text-gray-500 uppercase mb-1">Clearance Level</div>
                                            <div className="text-white font-mono text-xl">L-5 <span className="text-xs text-gray-600">/ 8</span></div>
                                            <div className="w-full bg-gray-800 h-1 mt-2 rounded-full overflow-hidden">
                                                <div className="bg-primary w-[65%] h-full"></div>
                                            </div>
                                        </div>
                                        <div className="p-4 border border-dashed border-white/10 rounded bg-white/5 group/stat hover:border-primary/40 transition-colors">
                                            <div className="text-xs text-gray-500 uppercase mb-1">Specialization</div>
                                            <div className="text-primary font-mono text-base">FULL_STACK_DEV</div>
                                            <p className="text-[10px] text-gray-500 mt-1">Node.js, React, Cloud Infra</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* CARD 2: DETAILS (Tabs) - Full Width Below */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative group w-full"
                >
                    {/* Decorative Outer Glow */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary/50 to-purple-600/50 opacity-20 group-hover:opacity-60 blur-md transition duration-1000"></div>

                    <div className="relative bg-black/80 backdrop-blur-xl border border-white/10 p-2 clip-path-cyberpunk-card">
                        <div className="bg-black/40 border border-white/5 p-6 md:p-8 relative overflow-hidden flex flex-col min-h-[400px]">

                            <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
                                <Cpu size={100} />
                            </div>

                            {/* Tabs */}
                            <div className="flex border-b border-white/10 mb-8 z-10">
                                {(['education', 'courses', 'interests'] as const).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all ${activeTab === tab
                                                ? 'bg-secondary/10 text-secondary border-b-2 border-secondary'
                                                : 'text-gray-500 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* Content */}
                            <div className="flex-1 relative z-10">
                                {activeTab === 'education' && (
                                    <div className="grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                        {resumeData.education.map((edu, i) => (
                                            <div key={i} className="group relative p-6 border border-white/10 bg-white/5 hover:border-secondary transition-all hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                                                <div className="absolute top-0 right-0 px-2 py-1 bg-white/10 text-[10px] text-gray-400 font-mono rounded-bl">ACADEMIC</div>
                                                <h4 className="text-white font-bold text-xl mb-2">{edu.institution}</h4>
                                                <p className="text-secondary text-sm font-mono mb-4">{edu.degree}</p>
                                                <div className="flex justify-between items-end border-t border-white/10 pt-4">
                                                    <div className="text-xs text-gray-400 font-mono">{edu.date}</div>
                                                    <div className="text-xs text-gray-400 font-mono">{edu.location}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {activeTab === 'courses' && (
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                        {resumeData.courses.map((course, i) => (
                                            <div key={i} className="p-5 border border-white/10 bg-white/5 hover:border-secondary/40 hover:bg-secondary/5 transition-all group/course">
                                                <div className="flex justify-between items-center mb-3">
                                                    <span className="text-xs font-mono text-gray-500 uppercase">{course.provider}</span>
                                                    <BookOpen size={14} className="text-gray-600 group-hover/course:text-secondary transition-colors" />
                                                </div>
                                                <h5 className="text-white font-bold text-sm mb-2 group-hover/course:text-secondary/90 transition-colors line-clamp-2 h-10">
                                                    {course.name}
                                                </h5>
                                                <div className="text-[10px] text-gray-500 font-mono border-t border-white/5 pt-2 mt-2 flex justify-between">
                                                    <span>COMPLETED</span>
                                                    <span>{course.date}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {activeTab === 'interests' && (
                                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 grid md:grid-cols-[1fr_300px] gap-8">
                                        <div className="p-6 border border-white/10 bg-white/5 leading-relaxed text-gray-300 text-lg font-mono">
                                            {resumeData.interests}
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-2">Active Protocols</h4>
                                            {['Security', 'AI Models', 'DeFi', 'Automation', 'Blockchain'].map((tag, i) => (
                                                <div key={i} className="flex items-center gap-2 p-2 px-3 border border-white/10 bg-black/40 text-xs text-secondary font-mono hover:bg-secondary/10 transition-colors cursor-crosshair">
                                                    <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse"></div>
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
                    animation: scan 3s linear infinite;
                }
            `}</style>
        </section>
    );
}
