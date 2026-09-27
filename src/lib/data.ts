export const resumeData = {
    name: "Mandar Joshi",
    role: "Open Source Contributor & Software Engineer",
    tagline: "Building scalable backend systems and contributing to the open-source infrastructure powering them.",
    summary: "Software Engineer and active Open Source Contributor specializing in distributed systems, backend infrastructure, and API reliability. Core contributor to massive open-source ecosystems including Supabase (securing self-hosted Realtime infrastructure), FOSSology (resolving critical C/PHP memory bugs), and Kubernetes (CNCF). Architected production-grade microservice platforms in Go and TypeScript handling enterprise workflows, driven by a deep passion for building secure, scalable software in the open.",
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
        languages: ["Go", "TypeScript", "C", "PHP", "Elixir", "Python", "SQL", "Bash", "JavaScript"],
        frameworks: ["gRPC/Protobuf", "Node.js", "Express.js", "React.js", "Next.js"],
        devops: ["Docker", "Kubernetes", "Linux", "Nginx", "Caddy", "Terraform", "CI/CD"],
        tools: ["Git", "GitHub", "PostgreSQL", "Redis", "Apache Kafka"]
    },
    experience: [
        {
            company: "Locara Labs",
            role: "Software Developer Intern",
            date: "August 2026 – Present",
            location: "Remote",
            context: "Embodied AI & Robotics Data",
            description: [
                "Building production web and mobile applications for large-scale egocentric video datasets that power the next generation of robotics and embodied AI systems",
                "Developing full-stack features and infrastructure across a modern stack including Next.js, React Native, Supabase, and Cloudflare",
                "Building and supporting robust data pipelines and quality-assurance tooling to streamline high-throughput video dataset workflows",
                "Owning end-to-end feature delivery, participating in code reviews, and debugging production issues for internal users, field teams, and clients"
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
            role: "Software Engineer Intern",
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
            mergedPRs: 8,
            openPRs: 1,
            issuesOpened: 3,
            contributions: [
                {
                    title: "fossology/fossology#3605: Correct typos in user-facing messages",
                    description: "Fixed typos across multiple UI components and user-facing CLI messages for better clarity.",
                    url: "https://github.com/fossology/fossology/pull/3605",
                    tech: ["PHP"]
                },
                {
                    title: "fossology/fossology#3555: Fix pkgagent memory & encoding bugs",
                    description: "Resolved unsafe strcpy(), NULL-before-free crashes, and HTML double-encoding in package info.",
                    url: "https://github.com/fossology/fossology/pull/3555",
                    tech: ["C", "PHP"]
                },
                {
                    title: "fossology/fossology#3554: Fix libfossrepo path string lengths",
                    description: "Fixed strlen(Type) misuse in tracking extension length during temporary path generation.",
                    url: "https://github.com/fossology/fossology/pull/3554",
                    tech: ["C"]
                },
                {
                    title: "fossology/fossology#3513: Fix DAO SQL bugs & null safety",
                    description: "Fixed SQL formatting bugs, array intval() misuse, and added full test coverage for License DAOs.",
                    url: "https://github.com/fossology/fossology/pull/3513",
                    tech: ["PHP", "SQL"]
                },
                {
                    title: "fossology/fossology#3477: Fix GroupController HTTP status codes",
                    description: "Corrected null safety gaps and updated REST conventions (200→201/202) in member API endpoints.",
                    url: "https://github.com/fossology/fossology/pull/3477",
                    tech: ["PHP", "REST API"]
                },
                {
                    title: "fossology/fossology#3456: Fix N+1 queries & API crashes",
                    description: "Eliminated redundant DB lookups and prevented TypeErrors on synthetic license entries in the /scanned API.",
                    url: "https://github.com/fossology/fossology/pull/3456",
                    tech: ["PHP", "REST API"]
                },
                {
                    title: "fossology/fossology#3443: Update deprecated PHPUnit assertions",
                    description: "Replaced deprecated assertRegExp calls across the test suite for modern PHPUnit compatibility.",
                    url: "https://github.com/fossology/fossology/pull/3443",
                    tech: ["PHP", "Testing"]
                },
                {
                    title: "fossology/fossology#3438: Fix API null safety & misleading errors",
                    description: "Resolved unhandled null states, corrected status codes, and fixed typos in error payloads.",
                    url: "https://github.com/fossology/fossology/pull/3438",
                    tech: ["PHP", "REST API"]
                }
            ]
        },
        {
            name: "Supabase",
            repository: "supabase/supabase",
            url: "https://github.com/supabase/supabase/pulls?q=author%3Amandar1045",
            mergedPRs: 8,
            openPRs: 9,
            issuesOpened: 5,
            contributions: [
                {
                    title: "supabase/realtime#2231: Fix WAL sender test flakes",
                    description: "Fixed max_wal_senders test flakes caused by missing public.test table in Realtime.",
                    url: "https://github.com/supabase/realtime/pull/2231",
                    tech: ["Elixir", "PostgreSQL", "Testing"]
                },
                {
                    title: "supabase/realtime#2228: Consolidate extension tests",
                    description: "Refactored and consolidated extension tests into one canonical location mirroring lib/.",
                    url: "https://github.com/supabase/realtime/pull/2228",
                    tech: ["Elixir", "Testing"]
                },
                {
                    title: "supabase/realtime#2222: Suppress Ranch connection logs",
                    description: "Added tests to verify that Ranch killed connection logs are properly suppressed in the tracker.",
                    url: "https://github.com/supabase/realtime/pull/2222",
                    tech: ["Elixir", "Ranch"]
                },
                {
                    title: "supabase/realtime#2174: Fix emoji slicing in fuzzy search",
                    description: "Prevented emoji surrogate pair slicing bugs in the Realtime inspector's fuzzy search feature.",
                    url: "https://github.com/supabase/realtime/pull/2174",
                    tech: ["Elixir", "Search"]
                },
                {
                    title: "supabase/realtime#2167: Fix Ranch charlist log filter",
                    description: "Fixed character list handling in the Ranch log filter to prevent logging errors.",
                    url: "https://github.com/supabase/realtime/pull/2167",
                    tech: ["Elixir", "Logging"]
                },
                {
                    title: "supabase/supabase#50306: Proxy .well-known auth route",
                    description: "Proxied /.well-known/* and /pg/* routes to the API gateway in Caddy/Nginx configs to fix 404s.",
                    url: "https://github.com/supabase/supabase/pull/50306",
                    tech: ["Docker", "Nginx", "Caddy"]
                },
                {
                    title: "supabase/supabase#46021: Secure Realtime encryption key",
                    description: "Moved hardcoded Realtime DB_ENC_KEY to a configurable .env variable for self-hosted instances.",
                    url: "https://github.com/supabase/supabase/pull/46021",
                    tech: ["Docker", "Security"]
                },
                {
                    title: "supabase/server#160: Validate JWT audience & issuer",
                    description: "Added strict validation for JWT audience and issuer fields to improve authentication security.",
                    url: "https://github.com/supabase/server/pull/160",
                    tech: ["TypeScript", "Security", "Auth"]
                }
            ]
        },
        {
            name: "Cal.com",
            repository: "calcom/cal.diy",
            url: "https://github.com/calcom/cal.diy/pulls?q=author%3Amandar1045",
            mergedPRs: 2,
            openPRs: 0,
            issuesOpened: 0,
            contributions: [
                {
                    title: "Improved Setup Documentation",
                    description: "Cleaned up typos across docs, comments, and setup copy for PayPal integrations.",
                    url: "https://github.com/calcom/cal.diy/pull/29260",
                    tech: ["Markdown", "Docs"]
                }
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
