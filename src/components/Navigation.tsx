import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "#home",     label: "Home"     },
  { href: "#about",    label: "About"    },
  { href: "#skills",   label: "Skills"   },
  { href: "#projects", label: "Projects" },
  { href: "#contact",  label: "Contact"  },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled]             = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection]       = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const sections = navItems.map((i) => i.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'pt-4 px-4 md:px-8' : 'pt-0 px-0'}`}>
      <div
        className={`mx-auto max-w-6xl transition-all duration-500 ${isScrolled ? 'rounded-2xl' : ''}`}
        style={{
          background: isScrolled ? "rgba(20, 20, 25, 0.05)" : "transparent",
          backdropFilter: isScrolled ? "blur(30px) saturate(200%)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(30px) saturate(200%)" : "none",
          border: isScrolled ? "1px solid rgba(255,255,255,0.12)" : "1px solid transparent",
          boxShadow: isScrolled ? "0 10px 40px rgba(0,0,0,0.5)" : "none",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          paddingTop: isScrolled ? "0.75rem" : "1.25rem",
          paddingBottom: isScrolled ? "0.75rem" : "1.25rem",
        }}
      >
        <div className="flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://instagram.com/invincible.avr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl flex items-center justify-center text-black font-bold text-xs transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #E8E8E8, #A0A0A0)",
                boxShadow: "0 4px 14px rgba(232,232,232,0.2)",
              }}
            >
              AVR
            </a>
            <button onClick={() => scrollTo("#home")} className="font-semibold text-sm text-white/90 hover:text-white transition-colors">
              Aditya Vardhan Rai
            </button>
          </div>

          {/* Desktop Nav Pill */}
          <div
            className="hidden md:flex items-center gap-1 p-1 rounded-full"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(20px)",
            }}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300"
                  style={{
                    color: isActive ? "#fff" : "rgba(255,255,255,0.55)",
                    background: isActive
                      ? "rgba(255,255,255,0.12)"
                      : "transparent",
                    border: isActive ? "1px solid rgba(255,255,255,0.2)" : "1px solid transparent",
                    boxShadow: isActive ? "0 2px 12px rgba(255,255,255,0.08)" : "none",
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 text-white/80 hover:text-white"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{ maxHeight: isMobileMenuOpen ? "320px" : "0", opacity: isMobileMenuOpen ? 1 : 0 }}
        >
          <div
            className="mt-3 p-2 rounded-2xl space-y-0.5"
            style={{
              background: "rgba(28,28,30,0.92)",
              backdropFilter: "blur(40px)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
            }}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                  style={{
                    color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.8)",
                    background: isActive ? "rgba(255,255,255,0.1)" : "transparent",
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
