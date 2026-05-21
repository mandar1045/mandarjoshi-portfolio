"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/lib/data";
import { Terminal, Server, Code, Cpu, Box, Globe, Database } from "lucide-react";
import type { ComponentType } from "react";
import {
    SiPython, SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiNodedotjs,
    SiTailwindcss, SiDocker, SiKubernetes, SiAmazon, SiGit, SiLinux,
    SiPytorch, SiPandas, SiSocketdotio, SiExpress, SiFastapi, SiTensorflow,
    SiKeras, SiOpencv, SiHuggingface, SiGithubactions, SiMongodb, SiPostgresql,
    SiRedis, SiFigma, SiPostman, SiGnubash, SiCplusplus, SiMysql
} from "react-icons/si";

type SkillIconProps = {
    size?: number;
    color?: string;
    className?: string;
};

type SkillIcon = {
    icon: ComponentType<SkillIconProps>;
    color: string;
};

const getIcon = (name: string) => {
    const iconMap: Record<string, SkillIcon> = {
        "Python": { icon: SiPython, color: "#5B7FA3" },
        "Java": { icon: Code, color: "#7A5B45" },
        "JavaScript": { icon: SiJavascript, color: "#C5A03A" },
        "TypeScript": { icon: SiTypescript, color: "#4F7AA5" },
        "C++": { icon: SiCplusplus, color: "#5E7896" },
        "Bash": { icon: SiGnubash, color: "#66845F" },
        "SQL": { icon: SiMysql, color: "#5C7B8F" },

        "React": { icon: SiReact, color: "#5B90A5" },
        "Next.js": { icon: SiNextdotjs, color: "#4D453F" },
        "Node.js": { icon: SiNodedotjs, color: "#668B59" },
        "Express.js": { icon: SiExpress, color: "#5A514B" },
        "FastAPI": { icon: SiFastapi, color: "#5D8B79" },
        "Socket.io": { icon: SiSocketdotio, color: "#5A514B" },
        "TailwindCSS": { icon: SiTailwindcss, color: "#5B95A7" },

        "PyTorch": { icon: SiPytorch, color: "#C8725A" },
        "Pandas": { icon: SiPandas, color: "#6D6393" },
        "NumPy": { icon: Box, color: "#657C8E" },
        "TensorFlow": { icon: SiTensorflow, color: "#C98743" },
        "Keras": { icon: SiKeras, color: "#B55A5A" },
        "OpenCV": { icon: SiOpencv, color: "#7B66A7" },
        "Hugging Face": { icon: SiHuggingface, color: "#C7A548" },
        "Machine Learning": { icon: Cpu, color: "#8A775E" },
        "Deep Learning": { icon: Cpu, color: "#8A775E" },
        "LLMs": { icon: Cpu, color: "#5A514B" },
        "RAG": { icon: Database, color: "#6E665D" },
        "Model Deployment": { icon: Server, color: "#6E665D" },

        "Docker": { icon: SiDocker, color: "#5A88B3" },
        "Kubernetes": { icon: SiKubernetes, color: "#5578AF" },
        "AWS": { icon: SiAmazon, color: "#BA8744" },
        "Linux": { icon: SiLinux, color: "#AD934F" },
        "GitHub Actions": { icon: SiGithubactions, color: "#5C7FAE" },
        "CI/CD": { icon: Box, color: "#5C7FAE" },

        "Git": { icon: SiGit, color: "#BE6F58" },
        "GitHub": { icon: SiGit, color: "#5A514B" },
        "Postman": { icon: SiPostman, color: "#C87653" },
        "MongoDB": { icon: SiMongodb, color: "#62835D" },
        "PostgreSQL": { icon: SiPostgresql, color: "#5A7398" },
        "Redis": { icon: SiRedis, color: "#B86161" },
        "Figma": { icon: SiFigma, color: "#C47759" },
    };

    const item = iconMap[name] || { icon: Code, color: "#7A5B45" };
    const IconComponent = item.icon;

    return (
        <div className="relative group/icon flex h-10 w-10 items-center justify-center rounded-2xl border border-white/80 bg-white shadow-sm">
            <IconComponent size={30} color={item.color} />
            <div
                className="absolute -bottom-3 left-1/2 h-2 w-8 -translate-x-1/2 rounded-[100%] opacity-0 blur-md transition-opacity duration-300 group-hover/icon:opacity-35"
                style={{ background: item.color }}
            />
        </div>
    );
};

const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 }
};

type SkillCardProps = {
    title: string;
    icon: ComponentType<{ size?: number; className?: string }>;
    skills: string[];
    accentColor?: "primary" | "secondary";
};

const SkillCard = ({ title, icon: Icon, skills, accentColor = "primary" }: SkillCardProps) => (
    <div className="relative group w-full">
        <div className="absolute -inset-0.5 rounded-[28px] bg-gradient-to-r from-secondary/20 to-[#d7c2a8]/20 opacity-35 blur-md transition duration-700 group-hover:opacity-55" />

        <div className="clip-path-cyberpunk-card relative border border-white/60 bg-white/75 p-2 backdrop-blur-xl">
            <div className="relative flex flex-col overflow-hidden border border-white/50 bg-[#f5ede2]/80 p-8">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(120,102,79,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,102,79,0.06)_1px,transparent_1px)] bg-[size:24px_24px]" />

                <h3 className="relative z-10 mb-8 flex items-center gap-4 text-2xl font-bold text-foreground">
                    <div className={`rounded border px-3 py-3 ${accentColor === "primary"
                        ? "border-secondary/25 bg-secondary/10"
                        : "border-primary/15 bg-primary/8"
                        }`}>
                        <Icon className={accentColor === "primary" ? "text-secondary" : "text-primary"} size={24} />
                    </div>
                    <span className="font-mono uppercase tracking-wide">{title}</span>
                </h3>

                <div className="relative z-10 grid grid-cols-2 gap-8 p-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                    {skills.map((skill) => (
                        <div
                            key={skill}
                            className="group/item flex flex-col items-center gap-4 rounded-xl border border-white/80 bg-white/80 p-5 transition-all hover:-translate-y-1 hover:bg-white"
                        >
                            {getIcon(skill)}
                            <span className="text-center font-mono text-xs uppercase tracking-wide text-muted-foreground transition-colors group-hover/item:text-foreground">
                                {skill}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export default function Skills() {
    const { skills } = resumeData;

    return (
        <section id="skills" className="relative z-10 mx-auto max-w-7xl px-6 py-32">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ staggerChildren: 0.15 }}
            >
                <motion.div variants={cardVariants} className="mb-20 flex flex-col items-center gap-4 text-center">
                    <div className="relative inline-block">
                        <div className="absolute inset-0 bg-secondary/15 blur-xl" />
                        <div className="relative rounded-2xl border border-secondary/20 bg-white/80 p-4 text-secondary">
                            <Code size={40} />
                        </div>
                    </div>
                    <h2 className="text-4xl font-black tracking-tighter text-foreground md:text-6xl">
                        TECHNICAL <span className="text-gradient">ARSENAL</span>
                    </h2>
                    <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
                        SYSTEM_CAPABILITIES_LOADED
                    </p>
                </motion.div>

                <div className="flex flex-col gap-12">
                    <motion.div variants={cardVariants} className="w-full">
                        <SkillCard title="STACK_PROTOCOL" icon={Terminal} skills={[...skills.languages, ...skills.frameworks]} accentColor="primary" />
                    </motion.div>

                    <motion.div variants={cardVariants} className="w-full">
                        <SkillCard title="INFRASTRUCTURE & TOOLS" icon={Server} skills={[...skills.tools, ...skills.devops]} accentColor="secondary" />
                    </motion.div>

                    <motion.div variants={cardVariants} className="w-full">
                        <SkillCard title="AI & INTELLIGENCE" icon={Cpu} skills={skills.ai_ml || []} accentColor="primary" />
                    </motion.div>
                </div>
            </motion.div>

            <style jsx global>{`
                .clip-path-cyberpunk-card {
                    clip-path: polygon(
                        0 0,
                        100% 0,
                        100% 100%,
                        95% 100%,
                        5% 100%,
                        0 95%
                    );
                }
            `}</style>
        </section>
    );
}
