"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/lib/data";
import { Briefcase, Calendar, ChevronRight, ExternalLink, Github } from "lucide-react";

export default function Experience() {
    const totalOpenSourcePRs = resumeData.openSource.reduce(
        (total, contribution) => total + contribution.pullRequests,
        0
    );

    return (
        <section id="experience" className="py-32 px-6 relative z-10">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center gap-3 mb-20"
                >
                    <Briefcase className="text-secondary" size={32} />
                    <h2 className="text-4xl md:text-6xl font-black text-center text-white tracking-tighter">
                        SYSTEM <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">LOGS</span>
                    </h2>
                </motion.div>

                <div className="relative ml-3 md:ml-6 py-4 space-y-16">
                    {/* Neon Timeline Line */}
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent" />

                    {resumeData.experience.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative pl-8 md:pl-12 group"
                        >
                            {/* Glowing Timeline Dot */}
                            <div className="absolute -left-[5px] top-10 h-3 w-3 rounded-full bg-black border border-primary/50 shadow-[0_0_10px_#00f3ff] group-hover:bg-primary group-hover:scale-125 transition-all duration-300 z-10" />
                            <div className="absolute -left-[35px] top-10 h-[1px] w-8 bg-primary/20 group-hover:bg-primary/50 transition-colors" />

                            <div className="glass-card p-10 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_-5px_rgba(0,243,255,0.2)]">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10">
                                    <div className="flex flex-col mb-6">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-3xl font-bold text-white font-sans tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all">
                                                {exp.role}
                                            </h3>
                                        </div>
                                        <div className="flex items-center gap-3 text-lg font-medium text-gray-300">
                                            <span className="text-secondary">@</span>
                                            <span>{exp.company}</span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-primary/90">
                                                <Calendar size={12} />
                                                <span>{exp.date}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <ul className="space-y-4">
                                        {exp.description.map((desc, i) => (
                                            <li key={i} className="text-gray-400 flex gap-4 items-start text-base leading-relaxed group/item hover:text-gray-300 transition-colors">
                                                <ChevronRight className="text-primary/50 mt-1.5 flex-shrink-0 group-hover/item:text-primary transition-colors" size={18} />
                                                <span>{desc}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-28"
                >
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white">
                                OPEN <span className="text-primary">SOURCE</span>
                            </h3>
                            <p className="text-gray-400 mt-2 max-w-3xl">
                                Authored {totalOpenSourcePRs}+ pull requests across FOSSology, Kubernetes, Supabase, Cal.com, and PostHog, with additional issue reporting and follow-through from GitHub.
                            </p>
                        </div>

                        <a
                            href={resumeData.contact.github}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 self-start md:self-auto px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-mono text-primary hover:border-primary/40 hover:bg-primary/10 transition-colors"
                        >
                            <Github size={16} />
                            <span>github.com/mandar1045</span>
                        </a>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {resumeData.openSource.map((contribution, index) => (
                            <motion.div
                                key={contribution.repository}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                                className="glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_30px_-8px_rgba(0,243,255,0.18)]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between gap-4 mb-5">
                                        <div>
                                            <h4 className="text-2xl font-bold text-white">{contribution.name}</h4>
                                            <p className="text-sm font-mono text-gray-500 mt-1">{contribution.repository}</p>
                                        </div>

                                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-primary/90 whitespace-nowrap">
                                            <span>{contribution.pullRequests} PRs</span>
                                        </div>
                                    </div>

                                    <ul className="space-y-3 mb-6">
                                        {contribution.highlights.map((highlight, highlightIndex) => (
                                            <li
                                                key={highlightIndex}
                                                className="text-gray-400 flex gap-3 items-start text-sm leading-relaxed"
                                            >
                                                <ChevronRight className="text-primary/50 mt-1 flex-shrink-0" size={16} />
                                                <span>{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <a
                                        href={contribution.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary transition-colors"
                                    >
                                        <span>View authored PRs</span>
                                        <ExternalLink size={15} />
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* GitHub Contribution Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32"
                >
                    <div className="text-center mb-10">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            <span className="text-primary">GIT</span> ACTIVITY
                        </h3>
                        <p className="text-gray-400">Continuous Integration, Continuous Deployment</p>
                    </div>

                    <div className="glass-card p-8 md:p-12 rounded-3xl border border-white/10 overflow-hidden relative group hover:border-primary/30 transition-colors">
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10 overflow-x-auto pb-4 scrollbar-hide">
                            <div className="min-w-[800px] flex justify-center">
                                <img
                                    src="https://ghchart.rshah.org/196127/mandar1045"
                                    alt="Mandar's GitHub Contribution Chart"
                                    className="w-full h-auto filter brightness-110 drop-shadow-[0_0_10px_rgba(25,97,39,0.3)]"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
