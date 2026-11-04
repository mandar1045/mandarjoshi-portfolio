defmodule Portfolio.Profile do
  @moduledoc "Hand-written content for the site. GitHub numbers come from `Portfolio.Activity`."

  def name, do: "Mandar Joshi"
  def badge, do: "Open source · Software engineer"
  def email, do: "mandarjoshi1045@gmail.com"
  def github, do: "https://github.com/mandar1045"
  def linkedin, do: "https://www.linkedin.com/in/mandar-joshi-0b951b28a/"
  def x, do: "https://x.com/Mandarjoshi1045"
  def resume, do: "/mandar-joshi-resume.pdf"
  def timezone, do: "India · UTC+5:30"

  def library do
    %{
      name: "Stampede",
      package: "stampede",
      tagline:
        "Load testing for Phoenix that speaks Phoenix: Channels, LiveView, HTTP and WebSockets.",
      description:
        "Stampede knows the Channels protocol and how a LiveView session starts, so a scenario is just what a user does. Every virtual user is a BEAM process, and when one machine isn't enough, more join over Erlang distribution.",
      github: "https://github.com/mandar1045/stampede",
      hex: "https://hex.pm/packages/stampede",
      docs: "https://stampede.hexdocs.pm",
      tags: ~w(Elixir Phoenix LiveView WebSockets BEAM),
      results: [
        {"Stock Phoenix with Channels", "16 cores, 128 GB", "2M", "concurrent users"},
        {"Stock Phoenix with Channels", "4 cores, 32 GB", "600K", "concurrent users"},
        {"Real Phoenix product, 100 users per channel", "4 cores, 32 GB", "80.9M",
         "messages delivered to 50K users in 10 min"}
      ],
      features: [
        {"--find-limit", "adds users until your thresholds break and reports the most that held"},
        {"mix stampede.record",
         "turns clicking through your app into a load test, sign-in included"},
        {"--probe",
         "shows what the server was doing during the run, with no changes to your app"},
        {nil, "Thresholds fail your CI build when a run regresses"}
      ]
    }
  end

  def experience do
    [
      %{
        role: "Software Developer Intern",
        company: "Robotics data startup",
        date: "Aug 2026 – present",
        stack: ["Next.js", "React Native", "Supabase", "Cloudflare"],
        points: [
          "Building web and mobile apps used by 40+ field operators to manage egocentric video datasets for robotics and embodied AI.",
          "Built a video ingestion and processing pipeline handling 150+ hours of footage a week, cutting dataset turnaround from 2 days to under 6 hours.",
          "Built QA tooling that flags blurry frames and missing metadata before delivery, cutting manual review time by 35%."
        ]
      },
      %{
        role: "Software Engineer Intern",
        company: "B2B SaaS startup",
        date: "Dec 2025 – Jun 2026",
        stack: ["Node.js", "Express", "Queues", "AI workflows"],
        points: [
          "Built 20+ REST APIs for an enterprise operations platform serving 50K+ requests a day.",
          "Shipped a workflow automation engine with AI-assisted actions, adopted by 3 client teams.",
          "Moved report generation to a queue-driven design, cutting p95 API latency from 4.2s to 650ms."
        ]
      }
    ]
  end

  def projects do
    [
      %{
        name: "Resync",
        what: "UPI Autopay recovery platform",
        stack: ["Go", "gRPC", "Kafka", "Redis", "PostgreSQL"],
        url: "https://resync.biz",
        points: [
          "Nine Go microservices behind gRPC, with a dunning engine that classifies UPI failure codes and schedules retries based on the failure reason.",
          "Kafka with partition-keyed ordering, Redis distributed locks and idempotency keys prevent double charges, verified with 500 concurrent duplicate retry events."
        ]
      },
      %{
        name: "Continum",
        what: "AI workflow automation",
        stack: ["TypeScript", "Kubernetes", "GitHub Actions"],
        url: "https://continum.online",
        source: "https://github.com/mandar1045/Continum",
        points: [
          "No-code AI workflows that draft context-aware Gmail replies and schedule meetings, processing 1,000+ emails across pilot users.",
          "Runs as microservices on Kubernetes, with 120+ tests in CI on every push."
        ]
      }
    ]
  end

  def skills do
    [
      {"Languages", ~w(Go Elixir TypeScript C PHP SQL Bash)},
      {"Frameworks",
       ["Phoenix", "Node.js", "Express", "Next.js", "React", "React Native", "gRPC"]},
      {"Infrastructure",
       [
         "PostgreSQL",
         "Redis",
         "Kafka",
         "Docker",
         "Kubernetes",
         "Nginx",
         "Caddy",
         "GitHub Actions"
       ]}
    ]
  end

  def education do
    %{
      school: "Vellore Institute of Technology",
      degree: "B.Tech in Information Technology",
      date: "2024 – 2028",
      location: "Vellore, India",
      coursework:
        "Data structures and algorithms, operating systems, database systems, computer networks, cloud computing"
    }
  end
end
