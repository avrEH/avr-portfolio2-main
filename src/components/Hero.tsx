import { useEffect } from "react";
import { Github, Linkedin, Download, ArrowRight, Briefcase } from "lucide-react";

const Hero = () => {
  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const updateTransforms = () => {
      const scrollY = window.scrollY;
      const xPct = (mouseX / window.innerWidth - 0.5) * 40;
      const yPct = (mouseY / window.innerHeight - 0.5) * 40;

      const b1 = document.getElementById("hb1");
      const b2 = document.getElementById("hb2");
      const b3 = document.getElementById("hb3");

      if (b1) {
        b1.style.transform = `translate(${xPct * 0.6}px, ${yPct * 0.6 + scrollY * 0.15}px) rotate(${scrollY * 0.05}deg)`;
      }
      if (b2) {
        b2.style.transform = `translate(${-xPct * 0.5}px, ${-yPct * 0.5 + scrollY * 0.25}px) rotate(${-scrollY * 0.08}deg) scale(${1 + scrollY * 0.0003})`;
      }
      if (b3) {
        b3.style.transform = `translate(${xPct * 0.4}px, ${-yPct * 0.4 - scrollY * 0.1}px) rotate(${scrollY * 0.1}deg)`;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      requestAnimationFrame(updateTransforms);
    };

    const handleScroll = () => {
      requestAnimationFrame(updateTransforms);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial call
    updateTransforms();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#000000", paddingTop: "7rem", paddingBottom: "4rem" }}
    >
      {/* ── Neon Blobs ── */}
      <div id="hb1" className="hero-blob animate-blob"
        style={{
          width: "700px", height: "700px",
          top: "-20%", left: "-15%",
          background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(180,180,180,0.04) 50%, transparent 70%)",
          transition: "transform 0.12s ease-out",
        }}
      />
      <div id="hb2" className="hero-blob animate-blob"
        style={{
          width: "600px", height: "600px",
          bottom: "-15%", right: "-12%",
          background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, rgba(130,130,130,0.03) 50%, transparent 70%)",
          animationDelay: "3.5s",
          transition: "transform 0.12s ease-out",
        }}
      />
      <div id="hb3" className="hero-blob animate-blob"
        style={{
          width: "400px", height: "400px",
          top: "60%", left: "55%",
          background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
          animationDelay: "1.5s",
          transition: "transform 0.12s ease-out",
        }}
      />

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)",
        }}
      />

      {/* ── Content ── */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto">

          {/* Role badge — iOS glass pill */}
          <div className="animate-fadeInUp mb-6">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.18)",
                color: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(12px)",
              }}
            >
              <Briefcase size={13} />
              Mobile App Developer · Ex iOS Intern @ Infosys
            </div>
          </div>

          {/* Name */}
          <h1
            className="animate-fadeInUp delay-100 font-bold tracking-tight mb-4 text-white"
            style={{
              fontSize: "clamp(3rem, 9vw, 6rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
            }}
          >
            Aditya
            <br />
            <span className="gradient-text">Vardhan Rai</span>
          </h1>

          {/* Typing */}
          <div className="animate-fadeInUp delay-200 mb-6">
            <p className="text-xl font-medium mono" style={{ color: "rgba(255,255,255,0.5)" }}>
              <span className="animate-typing">Building apps for iOS, Android & Web</span>
            </p>
          </div>

          {/* Bio */}
          <p
            className="animate-fadeInUp delay-300 text-base sm:text-lg leading-relaxed mb-10"
            style={{ color: "rgba(255,255,255,0.55)", maxWidth: "520px" }}
          >
            I'm a BTech student at Galgotias University, ex‑iOS intern at Infosys. I build mobile apps with React Native, SwiftUI, and Flutter, and love solving real‑world problems with tech.
          </p>

          {/* CTA */}
          <div className="animate-fadeInUp delay-400 flex flex-col sm:flex-row gap-3 mb-10">
            <button className="btn-primary" onClick={() => scrollTo("#projects")}>
              View My Work
              <ArrowRight size={16} />
            </button>
            <button className="btn-ghost" onClick={() => scrollTo("#contact")}>
              Get In Touch
            </button>
          </div>

          {/* Social pills */}
          <div className="animate-fadeInUp delay-500 flex items-center gap-3 flex-wrap">
            {[
              { icon: Github,   label: "GitHub",   href: "https://github.com/avrEH" },
              { icon: Linkedin, label: "LinkedIn",  href: "https://www.linkedin.com/in/adityavardhanrai/" },
              { icon: Download, label: "Resume",    href: "#" },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href === "#" ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(12px)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.13)";
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)";
                }}
              >
                <Icon size={15} />
                {label}
              </a>
            ))}
          </div>

          {/* Scroll hint */}
          <div
            className="animate-fadeInUp delay-700 mt-16 flex items-center gap-2"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            <div
              className="w-px h-8"
              style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.25))" }}
            />
            <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
