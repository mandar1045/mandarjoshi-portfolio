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
        <section id="experience" className="relative z-10 px-6 py-32">
            <div className="mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 flex items-center justify-center gap-3"
                >
                    <Briefcase className="text-secondary" size={32} />
                    <h2 className="text-center text-4xl font-black tracking-tighter text-foreground md:text-6xl">
                        SYSTEM <span className="text-gradient">LOGS</span>
                    </h2>
                </motion.div>

                <div className="relative ml-3 space-y-16 py-4 md:ml-6">
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-secondary/35 to-transparent" />

                    {resumeData.experience.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.16 }}
                            className="group relative pl-8 md:pl-12"
                        >
                            <div className="absolute -left-[5px] top-10 z-10 h-3 w-3 rounded-full border border-secondary/35 bg-[#f8f2ea] shadow-[0_0_0_6px_rgba(158,132,106,0.08)] transition-all duration-300 group-hover:scale-110 group-hover:bg-white" />
                            <div className="absolute -left-[35px] top-10 h-px w-8 bg-secondary/20 transition-colors group-hover:bg-secondary/35" />

                            <div className="glass-card group relative overflow-hidden rounded-3xl border border-white/60 p-10 transition-all duration-500 hover:border-secondary/35 hover:shadow-[0_18px_40px_rgba(120,102,79,0.10)]">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-secondary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                                <div className="relative z-10">
                                    <div className="mb-6 flex flex-col">
                                        <div className="mb-2 flex items-center justify-between">
                                            <h3 className="text-3xl font-bold font-sans tracking-tight text-foreground transition-all group-hover:text-secondary">
                                                {exp.role}
                                            </h3>
                                        </div>
                                        <div className="flex items-center gap-3 text-lg font-medium text-muted-foreground">
                                            <span className="text-secondary">@</span>
                                            <span>{exp.company}</span>
                                            <span className="h-1.5 w-1.5 rounded-full bg-border" />
                                            <div className="flex items-center gap-1.5 rounded-full border border-border bg-white/75 px-3 py-1 text-xs font-mono text-secondary">
                                                <Calendar size={12} />
                                                <span>{exp.date}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <ul className="space-y-4">
                                        {exp.description.map((desc, i) => (
                                            <li
                                                key={i}
                                                className="group/item flex items-start gap-4 text-base leading-relaxed text-muted-foreground transition-colors hover:text-foreground"
                                            >
                                                <ChevronRight
                                                    className="mt-1.5 shrink-0 text-secondary/60 transition-colors group-hover/item:text-secondary"
                                                    size={18}
                                                />
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
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-28"
                >
                    <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div>
                            <h3 className="text-2xl font-bold text-foreground md:text-3xl">
                                OPEN <span className="text-gradient">SOURCE</span>
                            </h3>
                            <p className="mt-2 max-w-3xl text-muted-foreground">
                                Authored {totalOpenSourcePRs}+ pull requests across FOSSology, Kubernetes, Supabase, Cal.com, and PostHog, with additional issue reporting and follow-through from GitHub.
                            </p>
                        </div>

                        <a
                            href={resumeData.contact.github}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-white/75 px-4 py-2 font-mono text-sm text-secondary transition-colors hover:bg-white md:self-auto"
                        >
                            <Github size={16} />
                            <span>github.com/mandar1045</span>
                        </a>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {resumeData.openSource.map((contribution, index) => (
                            <motion.div
                                key={contribution.repository}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                                className="glass-card group relative overflow-hidden rounded-3xl border border-white/60 p-8 transition-all duration-500 hover:border-secondary/30 hover:shadow-[0_16px_34px_rgba(120,102,79,0.08)]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-secondary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                                <div className="relative z-10">
                                    <div className="mb-5 flex items-start justify-between gap-4">
                                        <div>
                                            <h4 className="text-2xl font-bold text-foreground">{contribution.name}</h4>
                                            <p className="mt-1 font-mono text-sm text-muted-foreground">{contribution.repository}</p>
                                        </div>

                                        <div className="whitespace-nowrap rounded-full border border-border bg-white/75 px-3 py-1 text-xs font-mono text-secondary">
                                            <span>{contribution.pullRequests} PRs</span>
                                        </div>
                                    </div>

                                    <ul className="mb-6 space-y-3">
                                        {contribution.highlights.map((highlight, highlightIndex) => (
                                            <li
                                                key={highlightIndex}
                                                className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                                            >
                                                <ChevronRight className="mt-1 shrink-0 text-secondary/60" size={16} />
                                                <span>{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <a
                                        href={contribution.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-medium text-secondary transition-colors hover:text-foreground"
                                    >
                                        <span>View authored PRs</span>
                                        <ExternalLink size={15} />
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32"
                >
                    <div className="mb-10 text-center">
                        <h3 className="text-2xl font-bold text-foreground md:text-3xl">
                            <span className="text-secondary">GIT</span> ACTIVITY
                        </h3>
                        <p className="text-muted-foreground">Continuous Integration, Continuous Deployment</p>
                    </div>

                    <div className="glass-card group relative overflow-hidden rounded-3xl border border-white/60 p-8 transition-colors md:p-12">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                        <div className="relative z-10 overflow-x-auto pb-4">
                            <div className="flex min-w-[800px] justify-center">
                                <img
                                    src="https://ghchart.rshah.org/196127/mandar1045"
                                    alt="Mandar's GitHub Contribution Chart"
                                    className="h-auto w-full"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
