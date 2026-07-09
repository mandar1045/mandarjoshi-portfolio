export const resumeData = {
    name: "Mandar Joshi",
    role: "Scalable Systems Software Engineer",
    tagline: "Building scalable, distributed systems and cloud-native infrastructure.",
    summary: "Software engineer specializing in scalable, distributed systems and cloud-native infrastructure. Experienced in architecting production-grade platforms with Go, gRPC, Kafka, Docker, Kubernetes, and AWS — spanning event-driven microservices, secure data layers, and full observability. Focused on the convergence of distributed systems design, cloud scalability, and reliable software architecture.",
    contact: {
        email: "mandarjoshi1045@gmail.com",
        phone: "+91 7020212202",
        linkedin: "https://www.linkedin.com/in/mandar-joshi-0b951b28a/",
        github: "https://github.com/mandar1045",
        instagram: "https://www.instagram.com/mandar._2005/",
    },
    education: [
        {
            degree: "B.Tech in Information Technology",
            institution: "Vellore Institute of Technology",
            location: "Vellore, India",
            date: "July 2024 – Present",
        },
    ],
    skills: {
        languages: ["Python", "Java", "JavaScript", "TypeScript", "SQL", "Bash", "C++"],
        frameworks: ["React", "Next.js", "Node.js", "Express.js", "FastAPI", "PyTorch", "NumPy", "Pandas", "TailwindCSS", "Socket.io"],
        ai_ml: ["Machine Learning", "Deep Learning", "TensorFlow", "Keras", "OpenCV", "Hugging Face", "LLMs", "RAG", "Model Deployment"],
        devops: ["AWS", "Docker", "Kubernetes", "CI/CD", "Linux", "GitHub Actions"],
        tools: ["Git", "GitHub", "Postman", "MongoDB", "PostgreSQL", "Redis", "Figma"]
    },
    experience: [
        {
            company: "Xnotch Itech",
            role: "Full Stack Developer",
            date: "2026 – Present",
            location: "Remote",
            context: "Renew Care Plus",
            description: [
                "Engineering complex, security-hardened database management for Renew Care Plus, a B2B healthcare platform, with encrypted-at-rest storage, role-based access controls, and audit-ready data models for sensitive records",
                "Building B2B dashboard analytics that surface real-time business metrics, cohort reporting, and drill-down insights for enterprise clients",
                "Designing secure, high-performance query layers and schema migrations that safeguard sensitive data while keeping analytics responsive at scale",
                "Owning full-stack delivery end to end — from database schema and API contracts to the interactive analytics UI"
            ],
        },
        {
            company: "Tense AI",
            role: "Software Engineer",
            date: "Mar 2026 – Jun 2026",
            location: "Remote/Vellore",
            description: [
                "Building production-facing platform features across backend services, workflow automation, and AI-assisted product surfaces",
                "Owning end-to-end engineering work from API design and service integration to frontend delivery, debugging, and reliability improvements",
                "Improving system scalability with queue-driven workflows, better data flow design, and tighter coordination across product and engineering teams",
                "Shipping fast-moving product iterations while keeping developer tooling, release quality, and user experience aligned"
            ],
        },
        {
            company: "Tense AI",
            role: "Full Stack Developer Intern",
            date: "Dec 2025 – Feb 2026",
            location: "Remote/Vellore",
            description: [
                "Architecting scalable RESTful APIs and microservices using Node.js and Express, ensuring high performance and security for enterprise-grade applications",
                "Developing dynamic, responsive user interfaces with Next.js and React, optimizing state management and component reusability for a seamless user experience",
                "Designing high-performance database schemas with MongoDB, utilizing advanced aggregation pipelines for complex data analytics and efficient storage solutions",
                "Collaborating with cross-functional teams to integrate AI/ML models into web applications, enhancing product capabilities with intelligent automation"
            ],
        },
    ],
    openSource: [
        {
            name: "FOSSology",
            repository: "fossology/fossology",
            url: "https://github.com/fossology/fossology/pulls?q=author%3Amandar1045",
            pullRequests: 22,
            highlights: [
                "Authored API, DAO, proxy, and package-metadata fixes covering null safety, status codes, import robustness, and scan stability.",
                "Contributed Kubernetes-native deployment work spanning scheduler host routing, SSH worker pods, Helm packaging, Argo CD, and KEDA-based scaling."
            ]
        },
        {
            name: "Kubernetes",
            repository: "kubernetes/kubernetes",
            url: "https://github.com/kubernetes/kubernetes/pulls?q=author%3Amandar1045",
            pullRequests: 2,
            highlights: [
                "Opened upstream fixes in `authn` to preserve TokenReview cancellation behavior without leaking request-scoped values.",
                "Contributed `apimachinery` cleanup to ignore private fields during unstructured conversion and reduce surprising serialization behavior."
            ]
        },
        {
            name: "Supabase",
            repository: "supabase/supabase",
            url: "https://github.com/supabase/supabase/pulls?q=author%3Amandar1045",
            pullRequests: 3,
            highlights: [
                "Worked on self-hosted reliability fixes including moving `Realtime DB_ENC_KEY` into environment configuration.",
                "Contributed improvements around self-hosted observability exposure and clearer CSV import constraint error handling in Studio."
            ]
        },
        {
            name: "Cal.com",
            repository: "calcom/cal.diy",
            url: "https://github.com/calcom/cal.diy/pulls?q=author%3Amandar1045",
            pullRequests: 2,
            highlights: [
                "Contributed booking-limit logic updates to correctly count overlapping bookings during scheduling checks.",
                "Cleaned up docs, comments, and setup copy to improve the self-hosted developer experience in `cal.diy`."
            ]
        },
        {
            name: "PostHog",
            repository: "PostHog/posthog",
            url: "https://github.com/PostHog/posthog/pulls?q=author%3Amandar1045",
            pullRequests: 3,
            highlights: [
                "Authored frontend/runtime fixes for stale lazy chunk recovery outside the scene loader.",
                "Contributed fixes around sandbox MCP readonly header handling and cleanup of runtime copy and prompts."
            ]
        }
    ],
    projects: [
        {
            category: "startup",
            title: "Resync",
            subtitle: "UPI Autopay Recovery Platform",
            tech: ["Go", "gRPC / Protobuf", "Kafka", "Redis", "PostgreSQL", "Docker", "AWS"],
            date: "2026",
            points: [
                "Architected a 9-microservice payment-recovery platform in Go with gRPC/Protobuf service contracts — the recovery layer for India's UPI Autopay ecosystem, executing smart retries on merchants' own gateway accounts with success-based pricing (3% of recovered revenue)",
                "Designed a UPI failure-code classifier that normalizes 30+ NPCI/Razorpay/Cashfree codes into 8 internal categories, routing to 4 context-aware retry strategies (salary-day, exponential backoff, next-day, and hard-fail cancellation)",
                "Orchestrated an event-driven pipeline with Apache Kafka (Redpanda), Redis SETNX distributed locks, and structured idempotency keys — guaranteeing zero double-charges even under concurrent cron workers",
                "Shipped npm- and pip-published Node.js & Python SDKs with HMAC-SHA256 webhook verification, plus a Next.js merchant dashboard with real-time recovery analytics and gateway onboarding",
                "Deployed a full observability stack (Prometheus, Grafana, Alertmanager) across ~20MB distroless Docker images on Oracle Cloud ARM with Caddy auto-HTTPS and Terraform-provisioned AWS ECS Fargate"
            ],
            video: "/videos/resync-demo.mp4",
            link: "https://resync.biz",
            github: "https://github.com/mandar1045/Resync"
        },
        {
            title: "Continum",
            subtitle: "AI/ML Driven Tools Automation Platform",
            tech: ["Python", "Docker", "Kubernetes", "CI/CD"],
            date: "2025",
            points: [
                "Engineered a RAG-powered agentic system that analyzes email context to generate intelligent drafts, implementing a robust 'human-in-the-loop' workflow where agents wait for user approval before final dispatch",
                "Designed smart agents that parse communication to offer actionable suggestions, automatically executing tasks like scheduling Calendar events and generating Google Meet links upon approval",
                "Architected a scalable microservices environment using Docker and Kubernetes to orchestrate multiple concurrent AI agents with high availability",
                "Implemented comprehensive CI/CD pipelines to automate testing and deployment, ensuring rapid and reliable delivery of new agent features"
            ],
            video: "/videos/continum-demo.mp4",
            link: "https://continum.online/"
        },
        {
            title: "Real Time Crowd Management System",
            subtitle: "AI-Powered Surveillance & Safety Analytics",
            tech: ["Python", "OpenCV", "Deep Learning", "YOLO"],
            date: "2024",
            points: [
                "Developed a real-time computer vision system to monitor CCTV feeds and estimate crowd density with high accuracy",
                "Implemented predictive algorithms to detect early signs of overcrowding and potential stampede risks",
                "Designed an automated alert system that instantly notifies authorities of critical safety anomalies",
                "Optimized processing pipelines to handle multiple simultaneous camera streams with minimal latency"
            ],
            video: "/videos/crowd-management.mp4"
        },
        {
            title: "YoChat",
            subtitle: "Real-Time Chat Web Application",
            tech: ["MERN Stack", "Socket.io", "JavaScript"],
            date: "2024",
            points: [
                "Developed a full-stack web application enabling real-time user communication through chat rooms with support for both group and private chats",
                "Implemented front-end and back-end logic for chat room creation, joining, and messaging",
                "Employed modern web technologies to create a seamless chat interface, reinforcing skills in web development, real-time communication, and user-focused design",
                "Gained hands-on experience in designing web services that host multiple users, manage chat sessions, and deliver real-time communication"
            ],
            video: "/videos/yochat.mp4",
            link: "https://yochat-2nay.onrender.com/"
        },
        {
            title: "GearUp Sports",
            subtitle: "Premium E-commerce Platform",
            tech: ["MERN Stack", "Redux", "TailwindCSS", "Stripe"],
            date: "2024",
            points: [
                "Engineered a high-performance sports e-commerce prototype with a focus on premium user experience and seamless navigation",
                "Implemented complex state management using Redux Toolkit to handle cart operations, user authentication, and product filtering",
                "Developed a secure checkout flow and integrated comprehensive search functionality for a diverse sports catalog",
                "Crafted a responsive, mobile-first UI with a modern aesthetic, ensuring consistent performance across all devices"
            ],
            video: "/videos/gearup.mp4",
            link: "https://gearupsports.vercel.app/",
            github: "https://github.com/mandar1045/GearUp-Sports"
        },
        {
            title: "Autonomous API Version Migration System",
            subtitle: "Intelligent System",
            tech: ["Python", "API Design", "Automation"],
            date: "2024",
            points: [
                "Developed an intelligent system to automate application migration across evolving API versions, reducing manual effort and minimizing integration errors",
                "Implemented core features including API change detection, compatibility checks, automated mapping logic, and validation workflows",
                "Significantly improved developer productivity by streamlining API upgrades and reducing technical debt in long-term software development",
                "Strengthened understanding of backend development, API lifecycle management, and system automation"
            ],
        },
    ],
    courses: [
        {
            name: "Cohort 3.0 - Web Development",
            provider: "100xDevs",
            date: "Dec 2024 – Present",
            description: [
                "Completed web development training program gaining hands-on experience in building responsive and dynamic websites",
                "Developed understanding of core front-end and back-end technologies while collaborating on real-world-style projects"
            ]
        }
    ],
    interests: "Deeply interested in Artificial Intelligence, Machine Learning, and Web3 technologies. I enjoy exploring how intelligent algorithms can automate decision-making, how machine learning models can uncover patterns in data, and how decentralized systems like blockchain can enable trustless, transparent applications. I actively follow advancements in these fields, experiment with small projects, and aim to integrate these technologies into real-world software solutions."
};
