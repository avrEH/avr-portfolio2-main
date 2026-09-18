import { useEffect, useRef } from "react";
import { GraduationCap, Smartphone, Globe, Briefcase, MapPin } from "lucide-react";

const stats = [
  { value: "2+", label: "Years Learning", color: "#007AFF" },
  { value: "7+", label: "Projects Built",  color: "#30D158" },
  { value: "3",  label: "Platforms",       color: "#C0C0C0" },
  { value: "20+",label: "Technologies",    color: "#FF9F0A" },
];

const highlights = [
  {
    icon: GraduationCap,
    title: "Education",
    subtitle: "BTech — CSE",
    body: "Pursuing B.Tech in Computer Science & Engineering at Galgotias University, Greater Noida.",
    color: "#007AFF",
  },
  {
    icon: Briefcase,
    title: "Experience",
    subtitle: "iOS Intern @ Infosys",
    body: "Built native iOS applications at Infosys using SwiftUI and Apple ecosystem tools.",
    color: "#30D158",
  },
  {
    icon: Smartphone,
    title: "Specialization",
    subtitle: "Mobile Development",
    body: "Cross-platform & native apps with React Native, SwiftUI and Flutter for iOS & Android.",
    color: "#C0C0C0",
  },
  {
    icon: Globe,
    title: "Also Into",
    subtitle: "Web & Backend",
    body: "Full-stack web with React, Supabase and Firebase to complement mobile expertise.",
    color: "#FF9F0A",
  },
];

const About = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal, .reveal-left, .reveal-right")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="py-28"
      ref={ref}
      style={{ background: "#000000" }}
    >
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="mb-16 reveal">
          <div className="section-tag mb-4">About Me</div>
          <h2
            className="font-bold tracking-tight mb-4 text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "-0.03em" }}
          >
            Turning ideas into{" "}
            <span className="gradient-text">real products</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: "500px" }} className="text-lg">
            BTech student who ships real things — from iOS internships to open-source apps.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 reveal" style={{ transitionDelay: "0.1s" }}>
          {stats.map((s) => (
            <div
              key={s.label}
              className="apple-card p-6 text-center"
            >
              <div
                className="font-bold mb-1 mono"
                style={{ fontSize: "2rem", letterSpacing: "-0.04em", color: s.color }}
              >
                {s.value}
              </div>
              <div className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.45)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* Info cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((item, i) => (
              <div
                key={item.title}
                className="reveal apple-card p-6"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${item.color}1A` }}
                >
                  <item.icon size={18} style={{ color: item.color }} />
                </div>
                <h3 className="font-semibold text-sm mb-0.5 text-white">{item.title}</h3>
                <p className="text-xs font-semibold mb-2" style={{ color: item.color }}>
                  {item.subtitle}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          {/* Story */}
          <div className="reveal-right apple-card p-8" style={{ transitionDelay: "0.15s" }}>
            <h3
              className="font-bold mb-6 text-white"
              style={{ fontSize: "1.375rem", letterSpacing: "-0.025em" }}
            >
              My Journey
            </h3>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
              <p>
                My journey into tech started with curiosity — "How do apps actually work?" That curiosity turned into a React Native project in my 1st year, then led to an internship at Infosys where I built native iOS apps using SwiftUI.
              </p>
              <p>
                Since then, I've expanded across the mobile ecosystem — React Native for cross-platform, Flutter for modern UI experiences, and SwiftUI for deep iOS integration. I've built tools like AquaView on Firebase for real-world water monitoring.
              </p>
              <p>
                I believe great software should feel invisible — it just works. Whether it's a fleet management system or a groundwater monitoring dashboard, I focus on clean architecture, intuitive UX, and code that's a pleasure to maintain.
              </p>
            </div>

            <div
              className="flex items-center gap-2 mt-6 text-sm font-medium"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              <MapPin size={14} />
              Greater Noida, India
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;