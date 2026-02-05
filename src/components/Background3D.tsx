"use client";

import { useEffect, useState, useRef } from "react";

// Tech tool icons with colors
const TECH_ICONS = [
    { name: "React", icon: "/icons/react.svg", color: "#61DAFB" },
    { name: "Next.js", icon: "/icons/nextdotjs.svg", color: "#ffffff" },
    { name: "TypeScript", icon: "/icons/typescript.svg", color: "#3178C6" },
    { name: "JavaScript", icon: "/icons/javascript.svg", color: "#F7DF1E" },
    { name: "Python", icon: "/icons/python.svg", color: "#3776AB" },
    { name: "Docker", icon: "/icons/docker.svg", color: "#2496ED" },
    { name: "AWS", icon: "/icons/amazonaws.svg", color: "#FF9900" },
    { name: "Node.js", icon: "/icons/nodedotjs.svg", color: "#339933" },
    { name: "Linux", icon: "/icons/linux.svg", color: "#FCC624" },
    { name: "Git", icon: "/icons/git.svg", color: "#F05032" },
    { name: "MongoDB", icon: "/icons/mongodb.svg", color: "#47A248" },
    { name: "PostgreSQL", icon: "/icons/postgresql.svg", color: "#4169E1" },
    { name: "Redis", icon: "/icons/redis.svg", color: "#DC382D" },
    { name: "Kubernetes", icon: "/icons/kubernetes.svg", color: "#326CE5" },
    { name: "GraphQL", icon: "/icons/graphql.svg", color: "#E10098" },
    { name: "TensorFlow", icon: "/icons/tensorflow.svg", color: "#FF6F00" },
    { name: "FastAPI", icon: "/icons/fastapi.svg", color: "#009688" },
    { name: "Tailwind", icon: "/icons/tailwindcss.svg", color: "#06B6D4" },
    { name: "VS Code", icon: "/icons/visualstudiocode.svg", color: "#007ACC" },
    { name: "GitHub", icon: "/icons/github.svg", color: "#ffffff" },
    { name: "Nginx", icon: "/icons/nginx.svg", color: "#009639" },
    { name: "Firebase", icon: "/icons/firebase.svg", color: "#FFCA28" },
];

const MATRIX_CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF";

interface FloatingIcon {
    id: number;
    angle: number;
    distance: number;
    icon: string;
    color: string;
    speed: number;
    delay: number;
    size: number;
}

// Blackhole visual effect
function Blackhole() {
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
            {/* Event horizon - the black center */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"
                style={{
                    width: '80px',
                    height: '80px',
                    boxShadow: `
                        0 0 60px 30px rgba(0,0,0,1),
                        0 0 100px 60px rgba(0,0,0,0.8),
                        0 0 140px 90px rgba(0,0,0,0.6)
                    `,
                }}
            />

            {/* Accretion disk rings */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-spin-slow"
                style={{
                    width: '200px',
                    height: '200px',
                    background: 'conic-gradient(from 0deg, transparent, rgba(0,243,255,0.3) 90deg, transparent 180deg, rgba(255,0,255,0.3) 270deg, transparent)',
                    filter: 'blur(8px)',
                }}
            />
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-spin-reverse"
                style={{
                    width: '280px',
                    height: '280px',
                    background: 'conic-gradient(from 180deg, transparent, rgba(255,100,0,0.2) 60deg, rgba(255,200,0,0.3) 120deg, transparent 180deg, rgba(0,100,255,0.2) 240deg, rgba(100,0,255,0.3) 300deg, transparent)',
                    filter: 'blur(12px)',
                }}
            />
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-spin-slow"
                style={{
                    width: '350px',
                    height: '350px',
                    background: 'conic-gradient(from 90deg, transparent 0%, rgba(0,243,255,0.15) 25%, transparent 50%, rgba(255,0,255,0.15) 75%, transparent 100%)',
                    filter: 'blur(15px)',
                }}
            />

            {/* Gravitational lensing effect - light bending ring */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                    width: '120px',
                    height: '120px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    boxShadow: `
                        inset 0 0 30px rgba(255,255,255,0.1),
                        0 0 20px rgba(0,243,255,0.5),
                        0 0 40px rgba(0,243,255,0.3)
                    `,
                }}
            />

            {/* Inner glow pulse */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-pulse"
                style={{
                    width: '100px',
                    height: '100px',
                    background: 'radial-gradient(circle, rgba(100,0,255,0.3) 0%, transparent 70%)',
                }}
            />
        </div>
    );
}

function FloatingToolIcons() {
    const [icons, setIcons] = useState<FloatingIcon[]>([]);

    useEffect(() => {
        const generatedIcons: FloatingIcon[] = [];
        for (let i = 0; i < 35; i++) {
            const tech = TECH_ICONS[i % TECH_ICONS.length];
            // Random angle for radial direction (0-360 degrees)
            const angle = Math.random() * 360;
            generatedIcons.push({
                id: i,
                angle: angle,
                distance: 50 + Math.random() * 50, // How far they travel
                icon: tech.icon,
                color: tech.color,
                speed: 16 + Math.random() * 12,
                delay: Math.random() * 10,
                size: 56 + Math.random() * 56,
            });
        }
        setIcons(generatedIcons);
    }, []);

    return (
        <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ perspective: "1200px", perspectiveOrigin: "center center" }}
        >
            {icons.map((item) => {
                // Calculate end position based on angle
                const radians = (item.angle * Math.PI) / 180;
                const endX = 50 + Math.cos(radians) * item.distance;
                const endY = 50 + Math.sin(radians) * item.distance;

                return (
                    <div
                        key={item.id}
                        className="absolute animate-emerge-from-blackhole"
                        style={{
                            left: '50%',
                            top: '50%',
                            width: `${item.size}px`,
                            height: `${item.size}px`,
                            animationDuration: `${item.speed}s`,
                            animationDelay: `${item.delay}s`,
                            filter: `drop-shadow(0 0 20px ${item.color})`,
                            '--end-x': `${(endX - 50) * 40}px`,
                            '--end-y': `${(endY - 50) * 40}px`,
                        } as React.CSSProperties}
                    >
                        <img
                            src={item.icon}
                            alt=""
                            className="w-full h-full object-contain"
                            style={{
                                filter: "brightness(1.4) saturate(1.4)"
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
}

interface MatrixColumn {
    id: number;
    x: number;
    speed: number;
    delay: number;
    chars: string[];
}

function MatrixRain() {
    const [columns, setColumns] = useState<MatrixColumn[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const generateColumns = () => {
            const cols: MatrixColumn[] = [];
            const columnCount = Math.floor(window.innerWidth / 30);

            for (let i = 0; i < columnCount; i++) {
                const chars: string[] = [];
                const charCount = 8 + Math.floor(Math.random() * 12);
                for (let j = 0; j < charCount; j++) {
                    chars.push(MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]);
                }
                cols.push({
                    id: i,
                    x: (i / columnCount) * 100,
                    speed: 8 + Math.random() * 12,
                    delay: Math.random() * 15,
                    chars,
                });
            }
            setColumns(cols);
        };

        generateColumns();
        window.addEventListener("resize", generateColumns);
        return () => window.removeEventListener("resize", generateColumns);
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
            {columns.map((column) => (
                <div
                    key={column.id}
                    className="absolute top-0 animate-matrix-fall"
                    style={{
                        left: `${column.x}%`,
                        animationDuration: `${column.speed}s`,
                        animationDelay: `${column.delay}s`,
                    }}
                >
                    {column.chars.map((char, idx) => (
                        <div
                            key={idx}
                            className="font-mono text-sm leading-tight"
                            style={{
                                color: idx === 0 ? "#ffffff" : "#00ff41",
                                opacity: idx === 0 ? 1 : Math.max(0.1, 1 - idx * 0.1),
                                textShadow: idx === 0
                                    ? "0 0 10px #fff, 0 0 20px #00ff41"
                                    : "0 0 5px #00ff41",
                            }}
                        >
                            {char}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

function CyberGrid() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Main 3D Grid Floor - extends from horizon to bottom */}
            <div
                className="absolute left-0 right-0 h-[70%] animate-grid-pulse"
                style={{
                    bottom: 0,
                    background: `
                        repeating-linear-gradient(
                            90deg,
                            transparent,
                            transparent 49px,
                            rgba(0, 102, 255, 0.4) 49px,
                            rgba(0, 102, 255, 0.4) 51px,
                            transparent 51px
                        ),
                        repeating-linear-gradient(
                            0deg,
                            transparent,
                            transparent 49px,
                            rgba(0, 102, 255, 0.3) 49px,
                            rgba(0, 102, 255, 0.3) 51px,
                            transparent 51px
                        )
                    `,
                    backgroundSize: '100px 100px',
                    transform: 'perspective(400px) rotateX(65deg) translateY(-10%)',
                    transformOrigin: 'center bottom',
                    maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, transparent 100%)',
                }}
            />

            {/* Ceiling grid - inverted at top */}
            <div
                className="absolute left-0 right-0 h-[40%] opacity-30"
                style={{
                    top: 0,
                    background: `
                        repeating-linear-gradient(
                            90deg,
                            transparent,
                            transparent 79px,
                            rgba(0, 243, 255, 0.2) 79px,
                            rgba(0, 243, 255, 0.2) 81px,
                            transparent 81px
                        ),
                        repeating-linear-gradient(
                            0deg,
                            transparent,
                            transparent 79px,
                            rgba(0, 243, 255, 0.15) 79px,
                            rgba(0, 243, 255, 0.15) 81px,
                            transparent 81px
                        )
                    `,
                    backgroundSize: '80px 80px',
                    transform: 'perspective(400px) rotateX(-60deg) translateY(20%)',
                    transformOrigin: 'center top',
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 80%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 80%)',
                }}
            />

            {/* Horizon glow line */}
            <div
                className="absolute left-0 right-0 h-[3px]"
                style={{
                    top: '45%',
                    background: 'linear-gradient(90deg, transparent 5%, rgba(0,102,255,0.6) 20%, rgba(0,243,255,1) 50%, rgba(0,102,255,0.6) 80%, transparent 95%)',
                    boxShadow: '0 0 40px rgba(0,243,255,0.8), 0 0 80px rgba(0,102,255,0.5), 0 0 120px rgba(0,102,255,0.3)',
                }}
            />

            {/* Side vertical lines for depth */}
            <div
                className="absolute top-0 bottom-0 w-[2px] opacity-40"
                style={{
                    left: '10%',
                    background: 'linear-gradient(to bottom, transparent 20%, rgba(0,102,255,0.5) 45%, rgba(0,102,255,0.5) 55%, transparent 80%)',
                }}
            />
            <div
                className="absolute top-0 bottom-0 w-[2px] opacity-40"
                style={{
                    right: '10%',
                    background: 'linear-gradient(to bottom, transparent 20%, rgba(0,102,255,0.5) 45%, rgba(0,102,255,0.5) 55%, transparent 80%)',
                }}
            />
        </div>
    );
}

function StarField() {
    const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number; duration: number }>>([]);

    useEffect(() => {
        const generatedStars = Array.from({ length: 100 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 1 + Math.random() * 2,
            delay: Math.random() * 3,
            duration: 2 + Math.random() * 3,
        }));
        setStars(generatedStars);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="absolute rounded-full bg-white animate-twinkle"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        animationDelay: `${star.delay}s`,
                        animationDuration: `${star.duration}s`,
                    }}
                />
            ))}
        </div>
    );
}

export default function Background3D() {
    return (
        <div className="fixed inset-0 -z-10 bg-[#030308] pointer-events-none overflow-hidden">
            {/* Deep space gradient */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse at center top, rgba(0,30,60,0.4) 0%, transparent 50%), radial-gradient(ellipse at center bottom, rgba(0,20,40,0.3) 0%, transparent 50%)',
                }}
            />

            {/* Star field */}
            <StarField />

            {/* Matrix rain effect */}
            <MatrixRain />

            {/* Central Blackhole effect */}
            <Blackhole />

            {/* Floating tech tool icons emerging from blackhole */}
            <FloatingToolIcons />

            {/* Cyber grid floor */}
            <CyberGrid />

            {/* Ambient glow overlay */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse at 30% 20%, rgba(0,243,255,0.05) 0%, transparent 40%), radial-gradient(ellipse at 70% 80%, rgba(255,0,255,0.03) 0%, transparent 40%)',
                }}
            />

            {/* Vignette effect */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
                }}
            />
        </div>
    );
}
