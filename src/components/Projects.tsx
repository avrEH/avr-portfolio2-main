import { useEffect, useRef } from "react";
import { Github, ExternalLink } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  color: string;
  github: string;
  featured: boolean;
  emoji: string;
  gradient: string;
}

const projects: Project[] = [
  {
    title: "Fleet Management System",
    description:
      "Native iOS application built with SwiftUI and Supabase to streamline driver workflows, trip management, and real-time navigation for fleet operators.",
    tags: ["SwiftUI", "Swift", "Supabase", "PostgreSQL", "Jira"],
    color: "#007AFF",
    gradient: "linear-gradient(135deg, rgba(0,122,255,0.25) 0%, rgba(88,86,214,0.15) 100%)",
    github: "https://github.com/avrEH/Fleet-Management-System",
    featured: true,
    emoji: "🚗",
  },
  {
    title: "AquaView — Smart Water Monitoring",
    description:
      "Real-time groundwater monitoring app leveraging DWLR data to give citizens & officials transparent insights into water levels, quality and resource availability.",
    tags: ["Flutter", "Dart", "Firebase", "REST APIs", "DWLR"],
    color: "#5AC8FA",
    gradient: "linear-gradient(135deg, rgba(90,200,250,0.2) 0%, rgba(48,209,88,0.12) 100%)",
    github: "https://github.com/avrEH/Aqua_View",
    featured: true,
    emoji: "💧",
  },
  {
    title: "Budget Calculator App",
    description:
      "Comprehensive budget management app to track income, expenses, and savings goals with intuitive visualizations and financial insights.",
    tags: ["React Native", "SQLite", "Chart.js", "AsyncStorage"],
    color: "#FF9F0A",
    gradient: "linear-gradient(135deg, rgba(255,159,10,0.2) 0%, rgba(255,55,95,0.1) 100%)",
    github: "https://github.com/avrEH/BudgetCalculatorApp",
    featured: false,
    emoji: "💰",
  },
  {
    title: "Algo Mentor",
    description:
      "AI-powered Socratic coding tutor built with RAG and a multi-node LangGraph pipeline. Debugs algorithmic solutions by asking the right questions — never giving the answer directly.",
    tags: ["Python", "LangGraph", "RAG", "ChromaDB", "Gemini API"],
    color: "#E8E8E8",
    gradient: "linear-gradient(135deg, rgba(232,232,232,0.15) 0%, rgba(160,160,160,0.08) 100%)",
    github: "https://github.com/avrEH/algo-mentor-rag",
    featured: true,
    emoji: "🧠",
  },
  {
    title: "Gemini Clone",
    description:
      "AI-powered chat app inspired by Google's Gemini with natural language processing and intelligent conversations via the Gemini API.",
    tags: ["React", "Gemini API", "TypeScript", "Tailwind CSS"],
    color: "#D0D0D0",
    gradient: "linear-gradient(135deg, rgba(208,208,208,0.15) 0%, rgba(160,160,160,0.08) 100%)",
    github: "https://github.com/avrEH/Gemini-Clone",
    featured: false,
    emoji: "🤖",
  },
  {
    title: "Offline Music Sync",
    description:
      "Music sharing app using WiFi Direct for offline peer-to-peer music synchronization between devices — zero internet required.",
    tags: ["React Native", "WiFi Direct", "Audio API", "P2P"],
    color: "#FF375F",
    gradient: "linear-gradient(135deg, rgba(255,55,95,0.2) 0%, rgba(191,90,242,0.1) 100%)",
    github: "https://github.com/avrEH/syncMusicApp",
    featured: false,
    emoji: "🎵",
  },
  {
    title: "Face Unlock System",
    description:
      "Windows authentication system using facial recognition for secure app access and password management — built in Python with OpenCV.",
    tags: ["Python", "OpenCV", "Face Recognition", "Windows API"],
    color: "#30D158",
    gradient: "linear-gradient(135deg, rgba(48,209,88,0.2) 0%, rgba(90,200,250,0.1) 100%)",
    github: "https://github.com/avrEH/Face-Unlock",
    featured: false,
    emoji: "👤",
  },
  {
    title: "Face Recognition Attendance",
    description:
      "Automated attendance tracking system using facial recognition to identify students/employees and mark attendance without manual input.",
    tags: ["Python", "OpenCV", "Machine Learning", "Database"],
    color: "#FFD60A",
    gradient: "linear-gradient(135deg, rgba(255,214,10,0.18) 0%, rgba(255,159,10,0.1) 100%)",
    github: "https://github.com/avrEH/FaceReconitionInPython",
    featured: false,
    emoji: "📋",
  },
];

const featured = projects.filter((p) => p.featured);
const others   = projects.filter((p) => !p.featured);

const Projects = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.06 }
    );
    ref.current?.querySelectorAll(".reveal, .reveal-left, .reveal-right")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      className="py-28"
      ref={ref}
      style={{ background: "#000000" }}
    >
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="mb-16 reveal">
          <div className="section-tag mb-4">Projects</div>
          <h2
            className="font-bold tracking-tight mb-4 text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "-0.03em" }}
          >
            Things I've{" "}
            <span className="gradient-text">built</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", maxWidth: "460px" }} className="text-lg">
            Real-world tools, side projects and experimental builds across mobile and web.
          </p>
        </div>

        {/* ── Featured ── */}
        <div className="space-y-5 mb-14">
          {featured.map((p, i) => (
            <div
              key={p.title}
              className="reveal apple-card overflow-hidden"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="grid lg:grid-cols-2">

                {/* Visual — on odd items, push to right via order */}
                <div
                  className={`flex flex-col items-center justify-center p-10 min-h-[240px] relative overflow-hidden ${i % 2 === 1 ? "lg:order-2" : ""}`}
                  style={{ background: p.gradient }}
                >
                  <div
                    className="absolute inset-0"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${p.color}25, transparent 70%)` }}
                  />
                  <div
                    className="text-7xl sm:text-8xl mb-4 relative animate-float"
                    style={{ animationDelay: `${i * 0.7}s`, filter: `drop-shadow(0 0 20px ${p.color}60)` }}
                  >
                    {p.emoji}
                  </div>
                  <div
                    className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full relative"
                    style={{ background: `${p.color}20`, border: `1px solid ${p.color}40`, color: p.color }}
                  >
                    ✦ Featured Project
                  </div>
                </div>

                {/* Content — on odd items, push to left via order */}
                <div className={`p-7 lg:p-10 flex flex-col justify-center ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <h3
                    className="font-bold mb-3 text-white"
                    style={{ fontSize: "1.5rem", letterSpacing: "-0.025em" }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {p.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{
                          background: `${p.color}15`,
                          color: p.color,
                          border: `1px solid ${p.color}30`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      style={{ padding: "0.6rem 1.25rem", fontSize: "0.875rem" }}
                    >
                      <Github size={14} />
                      View on GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── More Projects ── */}
        <div>
          <h3
            className="font-bold mb-8 reveal text-white"
            style={{ fontSize: "1.5rem", letterSpacing: "-0.025em" }}
          >
            More Projects
          </h3>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {others.map((p, i) => (
              <div
                key={p.title}
                className="project-card reveal group"
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
                {/* Top */}
                <div
                  className="h-36 flex items-center justify-center relative overflow-hidden"
                  style={{ background: p.gradient }}
                >
                  <div
                    className="absolute inset-0"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${p.color}20, transparent 70%)` }}
                  />
                  <span
                    className="text-5xl relative group-hover:scale-110 transition-transform duration-300 inline-block"
                    style={{ filter: `drop-shadow(0 0 12px ${p.color}50)` }}
                  >
                    {p.emoji}
                  </span>
                </div>

                {/* Body */}
                <div className="p-5">
                  <h4 className="font-semibold text-base mb-2 text-white">{p.title}</h4>
                  <p
                    className="text-xs leading-relaxed mb-4 line-clamp-3"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {p.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{
                          background: `${p.color}15`,
                          color: p.color,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200"
                    style={{ color: p.color }}
                  >
                    <Github size={12} />
                    View Source
                    <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub CTA */}
        <div className="mt-12 text-center reveal" style={{ transitionDelay: "0.35s" }}>
          <a
            href="https://github.com/avrEH"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            <Github size={16} />
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
