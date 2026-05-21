"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/lib/data";
import { ArrowUpRight, Folder, GitBranch } from "lucide-react";
import { SiGithub } from "react-icons/si";

export default function Projects() {
    return (
        <section id="projects" className="relative z-10 mx-auto max-w-7xl px-6 py-32">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-20 flex items-center justify-center gap-3"
            >
                <Folder className="text-secondary" size={32} />
                <h2 className="text-center text-4xl font-black tracking-tighter text-foreground md:text-6xl">
                    FEATURED <span className="text-gradient">PROJECTS</span>
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 gap-12">
                {resumeData.projects.map((project, index) => {
                    const liveLink = "link" in project ? project.link : undefined;
                    const githubLink = "github" in project ? project.github : undefined;
                    const videoLink = "video" in project ? project.video : undefined;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08 }}
                            className="group relative"
                        >
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-secondary/8 to-white/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

                            <div className="glass-card relative flex h-full flex-col gap-8 overflow-hidden rounded-3xl border border-white/60 p-8 transition-colors md:flex-row md:p-10">
                                <div className="flex flex-1 flex-col">
                                    <div className="absolute top-0 right-0 z-20 flex gap-4 p-4 opacity-60 transition-opacity group-hover:opacity-100">
                                        {githubLink && (
                                            <a
                                                href={githubLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block cursor-pointer transition-transform hover:scale-110"
                                                title="View GitHub Repository"
                                            >
                                                <SiGithub className="text-foreground transition-colors group-hover:text-secondary" size={20} />
                                            </a>
                                        )}
                                        {liveLink ? (
                                            <a
                                                href={liveLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block cursor-pointer transition-transform hover:scale-110"
                                                title="View Live Site"
                                            >
                                                <ArrowUpRight className="text-foreground transition-colors group-hover:text-secondary" size={24} />
                                            </a>
                                        ) : (
                                            <ArrowUpRight className="text-foreground transition-colors group-hover:text-secondary" size={24} />
                                        )}
                                    </div>

                                    <div className="mb-6">
                                        <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-secondary/80">
                                            <GitBranch size={12} />
                                            <span>Main Branch</span>
                                        </div>
                                        <h3 className="mb-2 text-3xl font-bold text-foreground transition-all group-hover:text-secondary md:text-4xl">
                                            {project.title}
                                        </h3>
                                        <p className="text-base font-mono uppercase tracking-wide text-muted-foreground">
                                            {project.subtitle}
                                        </p>
                                    </div>

                                    <div className="mb-8 flex flex-wrap gap-2">
                                        {project.tech.map((t) => (
                                            <span
                                                key={t}
                                                className="rounded border border-white/80 bg-white/80 px-3 py-1.5 font-mono text-xs uppercase text-muted-foreground transition-colors group-hover:border-secondary/20 group-hover:text-secondary"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-auto space-y-4 border-t border-border/60 pt-6">
                                        <ul className="space-y-3">
                                            {project.points.map((point, i) => (
                                                <li key={i} className="flex items-start gap-3 text-base leading-relaxed text-muted-foreground">
                                                    <span className="mt-1.5 scale-75 text-secondary">▹</span>
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {videoLink && (
                                    <div className="w-full self-start overflow-hidden rounded-xl border border-white/70 shadow-[0_14px_30px_rgba(120,102,79,0.08)] transition-colors group-hover:border-secondary/20 md:mt-12 md:w-[55%] lg:w-[60%]">
                                        <video
                                            src={videoLink}
                                            className="h-auto w-full object-cover"
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            controls
                                        />
                                    </div>
                                )}

                                <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-secondary to-[#d9c2a6] transition-transform duration-500 group-hover:scale-x-100" />
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
