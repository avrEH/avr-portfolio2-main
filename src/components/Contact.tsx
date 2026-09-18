import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle, Loader2, AlertCircle } from "lucide-react";

const EMAILJS_SERVICE_ID  = "service_85grexb";
const EMAILJS_TEMPLATE_ID = "template_1vhchrl";
const EMAILJS_PUBLIC_KEY  = "KydKxq-zj2x_KRBYW";

const contactInfo = [
  { icon: Mail,   label: "Email",    value: "avrrai148@gmail.com",  href: "mailto:avrrai148@gmail.com" },
  { icon: Phone,  label: "Phone",   value: "+91 6306475882",        href: "tel:+916306475882"          },
  { icon: MapPin, label: "Location", value: "Greater Noida, India", href: null                        },
];

const socials = [
  { icon: Github,   label: "GitHub",   href: "https://github.com/avrEH",                         color: "#fff" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/adityavardhanrai/",     color: "#007AFF" },
];

type Status = "idle" | "sending" | "success" | "error";

const inputBase: React.CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#fff",
  borderRadius: "0.875rem",
  width: "100%",
  padding: "0.75rem 1rem",
  fontSize: "0.875rem",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

const Contact = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ from_name: "", from_email: "", subject: "", message: "" });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal, .reveal-left, .reveal-right")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "rgba(0,122,255,0.7)";
    e.target.style.boxShadow   = "0 0 0 3px rgba(0,122,255,0.18)";
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "rgba(255,255,255,0.1)";
    e.target.style.boxShadow   = "none";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id:  EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id:     EMAILJS_PUBLIC_KEY,
          template_params: {
            from_name:  form.from_name,
            from_email: form.from_email,
            subject:    form.subject || "Portfolio Contact",
            message:    form.message,
          },
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ from_name: "", from_email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else throw new Error();
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section
      id="contact"
      className="py-28"
      ref={ref}
      style={{ background: "#0A0A0C" }}
    >
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="mb-16 reveal text-center">
          <div className="section-tag mb-4 mx-auto w-fit">Contact</div>
          <h2
            className="font-bold tracking-tight mb-4 text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "-0.03em" }}
          >
            Let's{" "}
            <span className="gradient-text">work together</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", maxWidth: "400px" }} className="text-lg mx-auto">
            Have a project in mind or just want to say hi? I'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">

          {/* Left */}
          <div className="space-y-5 reveal-left">

            {/* Contact details card */}
            <div className="apple-card p-6 space-y-5">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(0,122,255,0.15)", border: "1px solid rgba(0,122,255,0.25)" }}
                  >
                    <item.icon size={16} style={{ color: "#007AFF" }} />
                  </div>
                  <div>
                    <div className="text-xs font-medium mb-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm font-medium text-white hover:text-blue-400 transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-sm font-medium text-white">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="apple-card p-6">
              <p className="text-sm font-semibold mb-4 text-white">Find me on</p>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "rgba(255,255,255,0.85)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = `${s.color}20`;
                      (e.currentTarget as HTMLElement).style.borderColor = `${s.color}40`;
                      (e.currentTarget as HTMLElement).style.color = s.color;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)";
                    }}
                  >
                    <s.icon size={15} />
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            <p className="text-xs px-1" style={{ color: "rgba(255,255,255,0.3)" }}>
              💬 I typically respond within 24 hours.
            </p>
          </div>

          {/* Right — Form */}
          <div className="reveal-right apple-card p-7">
            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="c-name" className="block text-xs font-medium mb-1.5 text-white/70">Name</label>
                  <input
                    id="c-name" type="text" required
                    placeholder="Your name"
                    value={form.from_name}
                    onChange={(e) => setForm({ ...form, from_name: e.target.value })}
                    disabled={status === "sending"}
                    style={{ ...inputBase }}
                    onFocus={onFocus} onBlur={onBlur}
                  />
                </div>
                <div>
                  <label htmlFor="c-email" className="block text-xs font-medium mb-1.5 text-white/70">Email</label>
                  <input
                    id="c-email" type="email" required
                    placeholder="you@example.com"
                    value={form.from_email}
                    onChange={(e) => setForm({ ...form, from_email: e.target.value })}
                    disabled={status === "sending"}
                    style={{ ...inputBase }}
                    onFocus={onFocus} onBlur={onBlur}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="c-subject" className="block text-xs font-medium mb-1.5 text-white/70">Subject</label>
                <input
                  id="c-subject" type="text"
                  placeholder="What's on your mind?"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  disabled={status === "sending"}
                  style={{ ...inputBase }}
                  onFocus={onFocus} onBlur={onBlur}
                />
              </div>

              <div>
                <label htmlFor="c-message" className="block text-xs font-medium mb-1.5 text-white/70">Message</label>
                <textarea
                  id="c-message" required rows={5}
                  placeholder="Tell me about your project or idea…"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  disabled={status === "sending"}
                  style={{ ...inputBase, resize: "none" }}
                  onFocus={onFocus} onBlur={onBlur}
                />
              </div>

              {/* Status banners */}
              {status === "success" && (
                <div
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium"
                  style={{
                    background: "rgba(48,209,88,0.12)",
                    border: "1px solid rgba(48,209,88,0.3)",
                    color: "#30D158",
                  }}
                >
                  <CheckCircle size={16} />
                  Message sent! I'll get back to you soon 🚀
                </div>
              )}

              {status === "error" && (
                <div
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium"
                  style={{
                    background: "rgba(255,55,95,0.1)",
                    border: "1px solid rgba(255,55,95,0.25)",
                    color: "#FF375F",
                  }}
                >
                  <AlertCircle size={16} />
                  Something went wrong — email me at avrrai148@gmail.com
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending" || status === "success"}
                className="btn-primary w-full justify-center"
                style={{ padding: "0.8rem", opacity: (status === "sending" || status === "success") ? 0.7 : 1 }}
              >
                {status === "sending" ? (
                  <><Loader2 size={16} className="animate-spin" /> Sending…</>
                ) : status === "success" ? (
                  <><CheckCircle size={16} /> Sent!</>
                ) : (
                  <><Send size={16} /> Send Message</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;