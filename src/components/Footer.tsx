import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

const navLinks = ["About", "Skills", "Projects", "Contact"];

const socials = [
  { icon: Github,   href: "https://github.com/avrEH",                         label: "GitHub"   },
  { icon: Linkedin, href: "https://www.linkedin.com/in/adityavardhanrai/",     label: "LinkedIn" },
  { icon: Mail,     href: "mailto:avrrai148@gmail.com",                        label: "Email"    },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#0A0A0C",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="container mx-auto px-6 pt-14 pb-8">

        {/* Top */}
        <div className="grid md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-xs"
                style={{
                  background: "linear-gradient(135deg, #007AFF, #5856D6)",
                  boxShadow: "0 4px 14px rgba(0,122,255,0.4)",
                }}
              >
                AVR
              </div>
              <span className="font-semibold text-sm text-white">Aditya Vardhan Rai</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
              Mobile App Developer · Ex iOS Intern @ Infosys.<br />
              Building things for iOS, Android & Web.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white">Quick Links</h4>
            <div className="space-y-2.5">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-sm transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#007AFF")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)")}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 
              className="text-sm font-semibold mb-4 text-white cursor-pointer select-none"
              onClick={() => window.dispatchEvent(new CustomEvent('triggerPacman'))}
            >
              Get In Touch
            </h4>
            <div className="space-y-1.5 text-sm mb-5" style={{ color: "rgba(255,255,255,0.4)" }}>
              <p>Greater Noida, India</p>
              <p>avrrai148@gmail.com</p>
            </div>
            <div className="flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.5)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(0,122,255,0.2)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,122,255,0.4)";
                    (e.currentTarget as HTMLElement).style.color = "#007AFF";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
                  }}
                >
                  <s.icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} className="mb-6" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            © {year} Aditya Vardhan Rai. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-1.5 text-xs transition-all duration-200"
            style={{ color: "rgba(255,255,255,0.3)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#007AFF")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)")}
          >
            Back to top
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;