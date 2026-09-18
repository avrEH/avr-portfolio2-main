import { useEffect, useRef } from "react";

const categories = [
  {
    title: "iOS & Mobile",
    emoji: "📱",
    color: "#007AFF",
    skills: ["SwiftUI", "Swift", "React Native", "Flutter", "Dart", "Expo", "iOS SDK", "Android Studio"],
  },
  {
    title: "Frontend Web",
    emoji: "🌐",
    color: "#30D158",
    skills: ["React", "TypeScript", "JavaScript", "HTML5 & CSS3", "Tailwind CSS", "Vite"],
  },
  {
    title: "Backend & Database",
    emoji: "🗄️",
    color: "#FF9F0A",
    skills: ["Supabase", "Firebase", "PostgreSQL", "SQLite", "AsyncStorage", "REST APIs"],
  },
  {
    title: "AI & Tools",
    emoji: "🛠️",
    color: "#BF5AF2",
    skills: ["Python", "OpenCV", "Face Recognition", "Git & GitHub", "Gemini API", "Jira", "P2P Networks"],
  },
];

const Skills = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    ref.current?.querySelectorAll(".reveal, .reveal-left, .reveal-right")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      className="py-28"
      ref={ref}
      style={{ background: "#0A0A0C" }}   /* very slightly elevated from pure black */
    >
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="mb-16 reveal">
          <div className="section-tag mb-4">Skills</div>
          <h2
            className="font-bold tracking-tight mb-4 text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "-0.03em" }}
          >
            Technologies I{" "}
            <span className="gradient-text">work with</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", maxWidth: "440px" }} className="text-lg">
            From native iOS to cross-platform mobile to full-stack web.
          </p>
        </div>

        {/* Skill Cards */}
        <div className="grid md:grid-cols-2 gap-5 mb-12">
          {categories.map((cat, i) => (
            <div
              key={cat.title}
              className="reveal apple-card p-7"
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl"
                  style={{
                    background: `${cat.color}18`,
                    border: `1px solid ${cat.color}30`,
                  }}
                >
                  {cat.emoji}
                </div>
                <div>
                  <h3 className="font-semibold text-base text-white">{cat.title}</h3>
                  <div className="text-xs font-medium mt-0.5" style={{ color: cat.color }}>
                    {cat.skills.length} skills
                  </div>
                </div>

                {/* Glow dot */}
                <div
                  className="ml-auto w-2 h-2 rounded-full"
                  style={{
                    background: cat.color,
                    boxShadow: `0 0 8px ${cat.color}`,
                  }}
                />
              </div>

              {/* Pills */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-pill"
                    style={{ cursor: "default" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="reveal apple-card p-8" style={{ transitionDelay: "0.3s" }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "2+",  label: "Years Learning",       emoji: "📅", color: "#007AFF" },
              { value: "7+",  label: "Projects Shipped",     emoji: "🚀", color: "#30D158" },
              { value: "3",   label: "Platforms",            emoji: "📱", color: "#BF5AF2" },
              { value: "20+", label: "Technologies",         emoji: "⚡", color: "#FF9F0A" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl mb-2">{s.emoji}</div>
                <div
                  className="font-bold mb-1 mono"
                  style={{ fontSize: "2rem", letterSpacing: "-0.04em", color: s.color }}
                >
                  {s.value}
                </div>
                <div className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;