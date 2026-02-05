"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/lib/data";
import { Terminal, Server, Code, Cpu, Globe, Database, Box } from "lucide-react";
import {
    SiPython, SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiNodedotjs,
    SiTailwindcss, SiDocker, SiKubernetes, SiAmazon, SiGit, SiLinux,
    SiPytorch, SiPandas, SiSocketdotio, SiExpress, SiFastapi, SiTensorflow,
    SiKeras, SiOpencv, SiHuggingface, SiTerraform, SiAnsible, SiGrafana,
    SiPrometheus, SiGithubactions, SiMongodb, SiPostgresql, SiRedis,
    SiFigma, SiJira, SiPostman, SiGnubash, SiCplusplus, SiMysql
} from "react-icons/si";

// Icon mapping helper
const getIcon = (name: string) => {
    const iconMap: { [key: string]: any } = {
        "Python": { icon: SiPython, color: "#3776AB" },
        "Java": { icon: Code, color: "#5382a1" },
        "JavaScript": { icon: SiJavascript, color: "#F7DF1E" },
        "TypeScript": { icon: SiTypescript, color: "#3178C6" },
        "C++": { icon: SiCplusplus, color: "#00599C" },
        "Bash": { icon: SiGnubash, color: "#4EAA25" },
        "SQL": { icon: SiMysql, color: "#4479A1" },

        "React": { icon: SiReact, color: "#61DAFB" },
        "Next.js": { icon: SiNextdotjs, color: "#ffffff" },
        "Node.js": { icon: SiNodedotjs, color: "#339933" },
        "Express.js": { icon: SiExpress, color: "#ffffff" },
        "FastAPI": { icon: SiFastapi, color: "#009688" },
        "Socket.io": { icon: SiSocketdotio, color: "#ffffff" },
        "TailwindCSS": { icon: SiTailwindcss, color: "#06B6D4" },

        "PyTorch": { icon: SiPytorch, color: "#EE4C2C" },
        "Pandas": { icon: SiPandas, color: "#150458" },
        "NumPy": { icon: Box, color: "#013243" },
        "TensorFlow": { icon: SiTensorflow, color: "#FF6F00" },
        "Keras": { icon: SiKeras, color: "#D00000" },
        "OpenCV": { icon: SiOpencv, color: "#5C3EE8" },
        "Hugging Face": { icon: SiHuggingface, color: "#FFD21E" },
        "Machine Learning": { icon: Cpu, color: "#FFD21E" },
        "Deep Learning": { icon: Cpu, color: "#FFD21E" },
        "LLMs": { icon: Cpu, color: "#ffffff" },
        "RAG": { icon: Database, color: "#ffffff" },
        "Model Deployment": { icon: Server, color: "#ffffff" },

        "Docker": { icon: SiDocker, color: "#2496ED" },
        "Kubernetes": { icon: SiKubernetes, color: "#326CE5" },
        "AWS": { icon: SiAmazon, color: "#FF9900" },
        "Linux": { icon: SiLinux, color: "#FCC624" },
        "Terraform": { icon: SiTerraform, color: "#7B42BC" },
        "Ansible": { icon: SiAnsible, color: "#EE0000" },
        "Grafana": { icon: SiGrafana, color: "#F46800" },
        "Prometheus": { icon: SiPrometheus, color: "#E6522C" },
        "GitHub Actions": { icon: SiGithubactions, color: "#2088FF" },
        "CI/CD": { icon: Box, color: "#2088FF" },

        "Git": { icon: SiGit, color: "#F05032" },
        "GitHub": { icon: SiGit, color: "#ffffff" },
        "Postman": { icon: SiPostman, color: "#FF6C37" },
        "MongoDB": { icon: SiMongodb, color: "#47A248" },
        "PostgreSQL": { icon: SiPostgresql, color: "#336791" },
        "Redis": { icon: SiRedis, color: "#DC382D" },
        "Figma": { icon: SiFigma, color: "#F24E1E" },
        "Jira": { icon: SiJira, color: "#0052CC" },
    };

    const item = iconMap[name] || { icon: Code, color: "#ffffff" };
    const IconComponent = item.icon;

    return (
        <div className="relative group/icon" style={{ perspective: '1000px', width: '40px', height: '40px' }}>
            <div
                className="relative w-full h-full transform-style-3d transition-all duration-500 ease-out group-hover/icon:rotate-x-12 group-hover/icon:rotate-y-12"
                style={{ transformStyle: 'preserve-3d', transform: 'rotateX(10deg) rotateY(-10deg)' }}
            >
                {/* Simulated Thickness Layers */}
                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none"
                        style={{
                            transform: `translateZ(${-i}px)`,
                            color: item.color,
                            filter: 'brightness(0.7)'
                        }}
                    >
                        <IconComponent size={34} />
                    </div>
                ))}

                {/* Main Face */}
                <div
                    className="absolute inset-0 flex items-center justify-center z-10"
                    style={{
                        transform: 'translateZ(2px)',
                        filter: `drop-shadow(0 4px 8px ${item.color}60)`
                    }}
                >
                    <IconComponent
                        size={34}
                        color={item.color}
                    />
                </div>
            </div>

            {/* Dynamic Glow Base */}
            <div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-10 h-3 rounded-[100%] blur-md opacity-0 group-hover/icon:opacity-60 transition-opacity duration-500 pointer-events-none"
                style={{ background: item.color, transform: 'rotateX(70deg)' }}
            ></div>
        </div>
    );
};

// Animation Variants
const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

// Reusable Cyberpunk Card Component
const SkillCard = ({ title, icon: Icon, skills, accentColor = "primary" }: { title: string, icon: any, skills: string[], accentColor?: "primary" | "secondary" }) => (
    <div className="relative group w-full">
        {/* Decorative Glow */}
        <div className={`absolute -inset-0.5 bg-gradient-to-r from-${accentColor}/50 to-${accentColor === 'primary' ? 'blue-600' : 'purple-600'}/50 opacity-20 group-hover:opacity-60 blur-md transition duration-1000`}></div>

        <div className="relative bg-black/80 backdrop-blur-xl border border-white/10 p-2 clip-path-cyberpunk-card">
            <div className="bg-black/40 border border-white/5 p-8 relative overflow-hidden flex flex-col">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

                {/* Header */}
                <h3 className={`text-2xl font-bold mb-8 text-white flex items-center gap-4 relative z-10`}>
                    <div className={`p-3 rounded bg-${accentColor}/10 border border-${accentColor}/30`}>
                        <Icon className={`text-${accentColor}`} size={24} />
                    </div>
                    <span className="tracking-wide uppercase font-mono">{title}</span>
                </h3>

                {/* Grid - Expanded for full width */}
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-8 relative z-10 p-4">
                    {skills.map((skill) => (
                        <div key={skill} className="flex flex-col items-center gap-4 p-5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group/item hover:-translate-y-2">
                            {getIcon(skill)}
                            <span className="text-xs text-gray-400 group-hover/item:text-white transition-colors uppercase font-mono text-center tracking-wide">{skill}</span>
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
        <section id="skills" className="py-32 px-6 max-w-7xl mx-auto relative z-10">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ staggerChildren: 0.2 }}
            >
                {/* Header */}
                <motion.div variants={cardVariants} className="flex flex-col items-center gap-4 mb-20 text-center">
                    <div className="relative inline-block">
                        <div className="absolute inset-0 bg-primary/20 blur-xl"></div>
                        <div className="relative p-4 rounded-2xl bg-black/50 border border-primary/50 text-primary">
                            <Code size={40} />
                        </div>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                        TECHNICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">ARSENAL</span>
                    </h2>
                    <p className="text-gray-400 font-mono text-sm tracking-widest uppercase">
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
