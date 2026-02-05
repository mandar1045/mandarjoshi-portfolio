"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/lib/data";
import { Code, ArrowUpRight, Folder, GitBranch, Star } from "lucide-react";
import { SiGithub } from "react-icons/si";

export default function Projects() {
    return (
        <section id="projects" className="py-32 px-6 max-w-7xl mx-auto relative z-10">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-center justify-center gap-3 mb-20"
            >
                <Folder className="text-primary" size={32} />
                <h2 className="text-4xl md:text-6xl font-black text-center text-white tracking-tighter">
                    FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">PROJECTS</span>
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 gap-12">
                {resumeData.projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative"
                    >
                        {/* Holographic Card Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl" />

                        <div className="relative h-full glass-card p-8 md:p-10 rounded-3xl border border-white/10 overflow-hidden group-hover:border-primary/50 transition-colors flex flex-col md:flex-row gap-8">

                            {/* Content Section */}
                            <div className="flex-1 flex flex-col">
                                {/* Corner Accents */}
                                <div className="absolute top-0 right-0 p-4 flex gap-4 opacity-50 group-hover:opacity-100 transition-opacity z-20">
                                    {/* @ts-ignore */}
                                    {project.github && (
                                        <a
                                            // @ts-ignore
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block hover:scale-110 transition-transform cursor-pointer"
                                            title="View GitHub Repository"
                                        >
                                            <SiGithub className="text-white group-hover:text-primary transition-colors" size={20} />
                                        </a>
                                    )}
                                    {/* @ts-ignore */}
                                    {project.link ? (
                                        <a
                                            // @ts-ignore
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block hover:scale-110 transition-transform cursor-pointer"
                                            title="View Live Site"
                                        >
                                            <ArrowUpRight className="text-white group-hover:text-primary transition-colors" size={24} />
                                        </a>
                                    ) : (
                                        <ArrowUpRight className="text-white group-hover:text-primary transition-colors" size={24} />
                                    )}
                                </div>

                                <div className="mb-6">
                                    <div className="flex items-center gap-2 mb-4 text-xs font-mono text-primary/80 uppercase tracking-widest">
                                        <GitBranch size={12} />
                                        <span>Main Branch</span>
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all">
                                        {project.title}
                                    </h3>
                                    <p className="text-base font-mono text-gray-500 uppercase tracking-wide">{project.subtitle}</p>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.tech.map(t => (
                                        <span key={t} className="text-xs px-3 py-1.5 bg-white/5 border border-white/10 rounded text-gray-300 font-mono uppercase group-hover:border-primary/30 group-hover:text-primary transition-colors">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-auto space-y-4 border-t border-white/10 pt-6">
                                    <ul className="space-y-3">
                                        {project.points.map((point, i) => (
                                            <li key={i} className="text-base text-gray-400 flex gap-3 items-start leading-relaxed">
                                                <span className="text-primary mt-1.5 transform scale-75">▹</span>
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Video Section */}
                            {/* @ts-ignore */}
                            {project.video && (
                                <div className="w-full md:w-[55%] lg:w-[60%] rounded-xl overflow-hidden shadow-2xl border border-white/10 group-hover:border-primary/30 transition-colors self-start md:mt-12">
                                    <video
                                        src={project.video}
                                        className="w-full h-auto object-cover"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        controls
                                    />
                                </div>
                            )}

                            {/* Hover Reveal Bottom Bar */}
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
