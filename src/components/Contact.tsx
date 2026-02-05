"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/lib/data";
import { Mail, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { SiLinkedin, SiGithub, SiGmail, SiInstagram } from "react-icons/si";

export default function Contact() {
    return (
        <section id="contact" className="py-40 px-6 relative z-10 overflow-hidden">

            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            <div className="max-w-5xl mx-auto text-center relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md">
                        <Zap className="text-primary animate-pulse" size={16} />
                        <span className="text-xs font-mono font-bold text-primary tracking-widest uppercase">Encryption Established</span>
                    </div>

                    <h2 className="text-5xl md:text-8xl font-black mb-8 text-white tracking-tighter leading-[0.9]">
                        READY TO <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">INITIALIZE?</span>
                    </h2>

                    <p className="text-gray-400 text-lg md:text-2xl font-mono mb-16 max-w-2xl mx-auto border-l-2 border-primary/50 pl-6 text-left md:text-center md:border-l-0">
                        Let's re-engineer the digital landscape together. <br />
                        <span className="text-white">System awaits your command.</span>
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Email Button */}
                        <Link
                            href={`mailto:${resumeData.contact.email}`}
                            className="group relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-primary/50 transition-all duration-300"
                        >
                            <div className="bg-black/80 backdrop-blur-xl h-full p-8 rounded-xl flex flex-col items-center gap-6 border border-white/5 relative overflow-hidden group-hover:border-primary/50 transition-colors">
                                <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

                                <div className="p-4 rounded-full bg-white/5 group-hover:bg-primary/20 transition-colors relative z-10">
                                    <SiGmail className="text-white group-hover:text-primary transition-colors" size={32} />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold text-white mb-1">Email Protocol</h3>
                                    <p className="text-gray-500 font-mono text-sm">Send encrypt_msg</p>
                                </div>
                            </div>
                        </Link>

                        {/* LinkedIn Button */}
                        <Link
                            href={resumeData.contact.linkedin}
                            target="_blank"
                            className="group relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-blue-500/50 transition-all duration-300"
                        >
                            <div className="bg-black/80 backdrop-blur-xl h-full p-8 rounded-xl flex flex-col items-center gap-6 border border-white/5 relative overflow-hidden group-hover:border-blue-500/50 transition-colors">
                                <div className="absolute inset-0 bg-blue-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

                                <div className="p-4 rounded-full bg-white/5 group-hover:bg-blue-500/20 transition-colors relative z-10">
                                    <SiLinkedin className="text-white group-hover:text-blue-500 transition-colors" size={32} />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold text-white mb-1">LinkedIn Network</h3>
                                    <p className="text-gray-500 font-mono text-sm">Connect_Node</p>
                                </div>
                            </div>
                        </Link>

                        {/* GitHub Button */}
                        <Link
                            href={resumeData.contact.github}
                            target="_blank"
                            className="group relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-purple-500/50 transition-all duration-300"
                        >
                            <div className="bg-black/80 backdrop-blur-xl h-full p-8 rounded-xl flex flex-col items-center gap-6 border border-white/5 relative overflow-hidden group-hover:border-purple-500/50 transition-colors">
                                <div className="absolute inset-0 bg-purple-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

                                <div className="p-4 rounded-full bg-white/5 group-hover:bg-purple-500/20 transition-colors relative z-10">
                                    <SiGithub className="text-white group-hover:text-purple-500 transition-colors" size={32} />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold text-white mb-1">Github Repos</h3>
                                    <p className="text-gray-500 font-mono text-sm">Access_Source</p>
                                </div>
                            </div>
                        </Link>

                        {/* Instagram Button */}
                        <Link
                            href={resumeData.contact.instagram}
                            target="_blank"
                            className="group relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-pink-500/50 transition-all duration-300"
                        >
                            <div className="bg-black/80 backdrop-blur-xl h-full p-8 rounded-xl flex flex-col items-center gap-6 border border-white/5 relative overflow-hidden group-hover:border-pink-500/50 transition-colors">
                                <div className="absolute inset-0 bg-pink-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

                                <div className="p-4 rounded-full bg-white/5 group-hover:bg-pink-500/20 transition-colors relative z-10">
                                    <SiInstagram className="text-white group-hover:text-pink-500 transition-colors" size={32} />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold text-white mb-1">Instagram</h3>
                                    <p className="text-gray-500 font-mono text-sm">Follow_Feed</p>
                                </div>
                            </div>
                        </Link>
                    </div>

                </motion.div>
            </div>
        </section>
    );
}
