"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/lib/data";
import { ArrowUpRight, Folder, GitBranch, Rocket } from "lucide-react";
import { SiGithub } from "react-icons/si";

type Project = (typeof resumeData.projects)[number];

function ProjectCard({ project, index, badge }: { project: Project; index: number; badge?: string }) {
    const liveLink = "link" in project ? project.link : undefined;
    const githubLink = "github" in project ? project.github : undefined;
    const videoLink = "video" in project ? project.video : undefined;

    return (
        <motion.div
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
                            {badge ? <Rocket size={12} /> : <GitBranch size={12} />}
                            <span>{badge ?? "Main Branch"}</span>
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
                    <div className="w-full self-start overflow-hidden rounded-xl border border-white/70 shadow-[0_14px_30px_rgba(28,32,40,0.10)] transition-colors group-hover:border-secondary/20 md:mt-12 md:w-[55%] lg:w-[60%]">
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

                <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-secondary to-[#9aa3af] transition-transform duration-500 group-hover:scale-x-100" />
            </div>
        </motion.div>
    );
}

export default function Projects() {
    const startupProjects = resumeData.projects.filter(
        (p) => "category" in p && p.category === "startup"
    );
    const featuredProjects = resumeData.projects.filter(
        (p) => !("category" in p) || p.category !== "startup"
    );

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

            {startupProjects.length > 0 && (
                <div className="mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-10 flex flex-col items-center gap-3 text-center"
                    >
                        <span className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/5 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-secondary">
                            <Rocket size={13} />
                            Startup
                        </span>
                        <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
                            Products I&apos;m building and shipping to real users — from architecture to production.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-12">
                        {startupProjects.map((project, index) => (
                            <ProjectCard key={project.title} project={project} index={index} badge="Startup" />
                        ))}
                    </div>
                </div>
            )}

            {startupProjects.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-14 flex items-center gap-4"
                >
                    <span className="h-px flex-1 bg-gradient-to-r from-transparent to-secondary/25" />
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                        More Work
                    </span>
                    <span className="h-px flex-1 bg-gradient-to-l from-transparent to-secondary/25" />
                </motion.div>
            )}

            <div className="grid grid-cols-1 gap-12">
                {featuredProjects.map((project, index) => (
                    <ProjectCard key={project.title} project={project} index={index} />
                ))}
            </div>
        </section>
    );
}
