"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/lib/data";
import Link from "next/link";
import { Zap } from "lucide-react";
import { SiLinkedin, SiGithub, SiGmail, SiInstagram } from "react-icons/si";

export default function Contact() {
    return (
        <section id="contact" className="relative z-10 overflow-hidden px-6 py-40">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#efe4d6]/50 via-transparent to-transparent" />

            <div className="relative mx-auto max-w-5xl text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-white/80 px-4 py-2 backdrop-blur-md">
                        <Zap className="text-secondary" size={16} />
                        <span className="font-mono text-xs font-bold uppercase tracking-widest text-secondary">
                            Encryption Established
                        </span>
                    </div>

                    <h2 className="mb-8 text-5xl font-black leading-[0.9] tracking-tighter text-foreground md:text-8xl">
                        READY TO <br />
                        <span className="text-gradient">INITIALIZE?</span>
                    </h2>

                    <p className="mx-auto mb-16 max-w-2xl border-l-2 border-secondary/30 pl-6 text-left font-mono text-lg text-muted-foreground md:border-l-0 md:text-center">
                        Let&apos;s re-engineer the digital landscape together. <br />
                        <span className="text-foreground">System awaits your command.</span>
                    </p>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <Link
                            href={`mailto:${resumeData.contact.email}`}
                            className="group relative rounded-2xl bg-gradient-to-b from-white/70 to-transparent p-1 transition-all duration-300"
                        >
                            <div className="relative flex h-full flex-col items-center gap-6 overflow-hidden rounded-xl border border-white/70 bg-white/78 p-8 backdrop-blur-xl transition-colors">
                                <div className="absolute inset-0 translate-y-full bg-secondary/6 transition-transform duration-300 group-hover:translate-y-0" />

                                <div className="relative z-10 rounded-full bg-white p-4 transition-colors">
                                    <SiGmail className="text-foreground transition-colors group-hover:text-secondary" size={32} />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="mb-1 text-xl font-bold text-foreground">Email Protocol</h3>
                                    <p className="font-mono text-sm text-muted-foreground">Send encrypt_msg</p>
                                </div>
                            </div>
                        </Link>

                        <Link
                            href={resumeData.contact.linkedin}
                            target="_blank"
                            className="group relative rounded-2xl bg-gradient-to-b from-white/70 to-transparent p-1 transition-all duration-300"
                        >
                            <div className="relative flex h-full flex-col items-center gap-6 overflow-hidden rounded-xl border border-white/70 bg-white/78 p-8 backdrop-blur-xl transition-colors">
                                <div className="absolute inset-0 translate-y-full bg-[#7da4c4]/8 transition-transform duration-300 group-hover:translate-y-0" />

                                <div className="relative z-10 rounded-full bg-white p-4 transition-colors">
                                    <SiLinkedin className="text-foreground transition-colors group-hover:text-[#5f86a8]" size={32} />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="mb-1 text-xl font-bold text-foreground">LinkedIn Network</h3>
                                    <p className="font-mono text-sm text-muted-foreground">Connect_Node</p>
                                </div>
                            </div>
                        </Link>

                        <Link
                            href={resumeData.contact.github}
                            target="_blank"
                            className="group relative rounded-2xl bg-gradient-to-b from-white/70 to-transparent p-1 transition-all duration-300"
                        >
                            <div className="relative flex h-full flex-col items-center gap-6 overflow-hidden rounded-xl border border-white/70 bg-white/78 p-8 backdrop-blur-xl transition-colors">
                                <div className="absolute inset-0 translate-y-full bg-secondary/6 transition-transform duration-300 group-hover:translate-y-0" />

                                <div className="relative z-10 rounded-full bg-white p-4 transition-colors">
                                    <SiGithub className="text-foreground transition-colors group-hover:text-secondary" size={32} />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="mb-1 text-xl font-bold text-foreground">Github Repos</h3>
                                    <p className="font-mono text-sm text-muted-foreground">Access_Source</p>
                                </div>
                            </div>
                        </Link>

                        <Link
                            href={resumeData.contact.instagram}
                            target="_blank"
                            className="group relative rounded-2xl bg-gradient-to-b from-white/70 to-transparent p-1 transition-all duration-300"
                        >
                            <div className="relative flex h-full flex-col items-center gap-6 overflow-hidden rounded-xl border border-white/70 bg-white/78 p-8 backdrop-blur-xl transition-colors">
                                <div className="absolute inset-0 translate-y-full bg-[#d7a9a7]/8 transition-transform duration-300 group-hover:translate-y-0" />

                                <div className="relative z-10 rounded-full bg-white p-4 transition-colors">
                                    <SiInstagram className="text-foreground transition-colors group-hover:text-[#b97e7b]" size={32} />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="mb-1 text-xl font-bold text-foreground">Instagram</h3>
                                    <p className="font-mono text-sm text-muted-foreground">Follow_Feed</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
