"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Linkedin,
  Github,
  Send,
  Globe,
  ArrowRight,
  Quote,
  CheckCircle2,
  Loader2,
} from "lucide-react";

// --- Custom Hooks ---

const useReveal = () => {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, revealed] as const;
};

// --- Layout Components ---

const PageShell = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-white text-[var(--color-primary)] overflow-hidden relative">
    {/* Shifted the blur down slightly (top-20) to match the new top padding */}
    <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[320px] bg-cyan-50 rounded-full blur-[120px] pointer-events-none" />
    <div className="relative z-10">{children}</div>
  </div>
);

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`mx-auto max-w-[1200px] px-6 ${className}`}>
    {children}
  </section>
);

// --- Widget Components ---

const zones = [
  { city: "Cupertino", tz: "America/Los_Angeles" },
  { city: "Paris", tz: "Europe/Paris" },
  { city: "London", tz: "Europe/London" },
  { city: "Berlin", tz: "Europe/Berlin" },
  { city: "Colombo", tz: "Asia/Colombo" },
  { city: "Tokyo", tz: "Asia/Tokyo" },
  { city: "Brisbane", tz: "Australia/Brisbane" },
  { city: "Melbourne", tz: "Australia/Melbourne" },
];

function WorldTimes() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!now) return null;

  const getTime = (tz: string) =>
    new Intl.DateTimeFormat("en-AU", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: tz,
    }).format(now);

  const getOffset = (tz: string) => {
    const local = new Date(now.toLocaleString("en-US", { timeZone: tz })).getTime();
    const mel = new Date(now.toLocaleString("en-US", { timeZone: "Australia/Melbourne" })).getTime();
    const diff = Math.round((local - mel) / 3600000);

    if (diff === 0) return "Local";
    return diff > 0 ? `+${diff}h` : `${diff}h`;
  };

  return (
    <div className="rounded-xl border border-[var(--color-border, #e2e8f0)] bg-white p-6 w-full mt-16 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Globe className="w-4 h-4 text-[var(--color-accent, #06b6d4)]" />
        <p className="text-xs uppercase tracking-[0.2em] font-semibold text-slate-500">
          Global Time Zones
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4">
        {zones.map((z) => (
          <div
            key={z.city}
            className="group flex flex-col justify-center rounded-lg border border-slate-100 bg-slate-50 p-4 hover:bg-white hover:border-cyan-100 hover:shadow-sm transition-all duration-200"
          >
            <span className="text-sm font-medium text-slate-700 group-hover:text-cyan-600 transition-colors mb-1">
              {z.city}
            </span>
            <div className="flex items-end justify-between">
              <span className="font-mono text-sm tracking-wider text-cyan-600">{getTime(z.tz)}</span>
              <span className="text-[10px] font-medium text-slate-400">
                {getOffset(z.tz)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  setValue,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-slate-500 tracking-wide">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-50 transition-all duration-200"
      />
    </div>
  );
}

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const valid = name.trim() && email.trim() && message.trim();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;

    setStatus("sending");
    setStatusMessage("");

    setTimeout(() => {
      setStatus("success");
      setStatusMessage("Message sent successfully. I'll get back to you soon.");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");

      setTimeout(() => {
        setStatus("idle");
        setStatusMessage("");
      }, 5000);
    }, 1500);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 md:p-10 shadow-sm relative overflow-hidden h-full">
      <h3 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">Get in Touch</h3>
      <p className="text-sm text-slate-600 leading-relaxed mb-8">
        Complete the form below. Your message will be delivered directly to my inbox, and I'll respond as soon as I can.
      </p>

      <form className="grid gap-6 relative z-10" onSubmit={onSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Field label="Name" value={name} setValue={setName} placeholder="John Doe" />
          <Field label="Email" value={email} setValue={setEmail} placeholder="john@example.com" type="email" />
        </div>

        <Field label="Subject" value={subject} setValue={setSubject} placeholder="Internship / Collaboration / Hello" />

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 tracking-wide">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell me about your idea or opportunity..."
            className="min-h-[140px] w-full resize-y rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-50 transition-all duration-200"
          />
        </div>

        <button
          type="submit"
          disabled={!valid || status === "sending"}
          className={`w-full group mt-2 flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold transition-all duration-200 ${
            valid && status !== "sending" && status !== "success"
              ? "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100"
              : status === "success"
              ? "bg-cyan-50 text-cyan-600 border border-cyan-200"
              : "bg-slate-50 text-slate-400 border border-slate-200 cursor-not-allowed"
          }`}
        >
          {status === "sending" ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending...
            </span>
          ) : status === "success" ? (
            "Message Sent!"
          ) : (
            <span className="flex items-center gap-2">
              Send Message
              <Send size={16} className="text-slate-500 group-hover:text-slate-700 transition-colors" />
            </span>
          )}
        </button>

        {statusMessage && (
          <div
            className={`rounded-lg p-4 text-sm border ${
              status === "success"
                ? "bg-cyan-50 border-cyan-200 text-cyan-700"
                : "bg-red-50 border-red-200 text-red-600"
            }`}
          >
            {statusMessage}
          </div>
        )}
      </form>
    </div>
  );
}

const testimonialData = [
  {
    quote: "An exceptional problem solver who approaches systems thinking with clarity and discipline.",
    author: "Professor",
    role: "Academic Mentor",
    initial: "P",
    color: "bg-cyan-100",
  },
  {
    quote: "Demonstrated an innate ability to bridge the gap between complex data sets and actionable business insights.",
    author: "Project Lead",
    role: "Tech Solutions Inc.",
    initial: "L",
    color: "bg-slate-100",
  },
  {
    quote: "Highly disciplined in their approach to architecture, ensuring scalability remains at the core of every design.",
    author: "Senior Architect",
    role: "Industry Consultant",
    initial: "S",
    color: "bg-zinc-100",
  },
];

function Testimonials() {
  const [ref, isVisible] = useReveal();

  return (
    <section className="py-16 sm:py-20 md:py-[100px] bg-[var(--color-surface-muted, #f8fafc)] border-t border-[var(--color-border, #e2e8f0)] mt-16">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-[10px] font-bold tracking-[0.4em] text-[var(--color-accent, #06b6d4)] uppercase mb-4">
            Endorsements
          </h2>
          <h3 className="text-[36px] font-semibold tracking-tight text-[var(--color-primary, #0f172a)]">
            Trusted by Mentors & Peers
          </h3>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonialData.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col p-8 rounded-xl bg-white border border-[var(--color-border, #e2e8f0)] hover:bg-[#F8FAFC] transition-all duration-200"
            >
              <Quote className="absolute top-6 right-8 w-10 h-10 text-slate-100" />
              <div className="flex-grow">
                <p className="text-lg md:text-xl font-medium text-[var(--color-body-text, #475569)] leading-relaxed mb-10 italic relative z-10">
                  “{item.quote}”
                </p>
              </div>
              <div className="flex items-center gap-4 border-t border-[var(--color-border, #e2e8f0)] pt-6">
                <div
                  className={`shrink-0 w-12 h-12 rounded-full ${item.color} flex items-center justify-center text-[var(--color-primary, #0f172a)] font-bold border border-[var(--color-border, #e2e8f0)]`}
                >
                  {item.initial}
                </div>
                <div className="overflow-hidden">
                  <p className="text-[var(--color-primary, #0f172a)] font-semibold text-base truncate">{item.author}</p>
                  <p className="text-[var(--color-accent, #06b6d4)] text-[11px] font-bold uppercase tracking-wider truncate">
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [ref, isVisible] = useReveal();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <section className="py-16 sm:py-20 md:py-[100px] bg-white border-t border-[var(--color-border, #e2e8f0)]">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row items-center justify-between gap-10"
        >
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-semibold text-[var(--color-primary, #0f172a)] mb-3 tracking-tight">
              Subscribe to publications on Medium.
            </h3>
            <p className="text-[var(--color-body-text, #475569)] text-sm md:text-base leading-relaxed">
              Get notified whenever I drop new articles, architectural deep-dives, and tech insights. Join my reading
              community on Medium today.
            </p>
          </div>

          <div className="w-full md:w-1/2 max-w-md mx-auto md:mx-0">
            <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                disabled={status !== "idle"}
                required
                className="w-full bg-white border border-[var(--color-border, #e2e8f0)] text-[var(--color-primary, #0f172a)] placeholder:text-slate-400 rounded-full px-6 py-4 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={status !== "idle"}
                className={`flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-white transition-all duration-200 sm:absolute sm:right-1 sm:top-1 sm:bottom-1 sm:py-0 ${
                  status === "success" ? "bg-cyan-600" : "bg-[var(--color-accent, #06b6d4)] hover:bg-cyan-600"
                } disabled:cursor-not-allowed`}
              >
                <AnimatePresence mode="wait">
                  {status === "idle" && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2"
                    >
                      Subscribe <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  )}
                  {status === "loading" && (
                    <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Loader2 className="w-5 h-5 animate-spin" />
                    </motion.span>
                  )}
                  {status === "success" && (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2"
                    >
                      Subscribed! <CheckCircle2 className="w-4 h-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </form>
            <p className="text-[11px] text-slate-500 mt-4 text-center md:text-left">
              By subscribing, you agree to the Terms of Service and Privacy Policy.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- Main Page Component ---

export default function ContactPage() {
  return (
    <PageShell>
      {/* Added top padding here to clear the header */}
      <Section className="pt-32 md:pt-40 lg:pt-48 pb-16">
        <div className="grid items-start gap-12 lg:gap-20 lg:grid-cols-[1fr_1.1fr]">
          
          {/* Left Column */}
          {/* Added lg:top-32 here to match the new top spacing */}
          <div className="w-full lg:sticky lg:top-32">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50/50 px-3 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-600">Contact</span>
            </div>

            <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Let’s Build <br />
              <span className="text-[var(--color-accent, #06b6d4)]">
                Something <br />
                Impactful
              </span>
            </h1>

            <p className="text-[17px] text-slate-600 leading-relaxed mb-10 max-w-md">
              I'm open to internships, collaborations, and innovative opportunities. Feel free to reach out through the
              form or connect directly using the links below.
            </p>

            <div className="space-y-4 max-w-md">
              <a
                href="mailto:info@vidulawickramasinghe.online"
                className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 hover:shadow-sm hover:border-slate-300 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-50 text-cyan-600">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 mb-0.5">Email</p>
                    <p className="text-sm font-medium text-slate-900 group-hover:text-cyan-600 transition-colors">
                      info@vidulawickramasinghe.online
                    </p>
                  </div>
                </div>
                <ArrowRight
                  size={18}
                  className="text-slate-400 group-hover:text-cyan-600 group-hover:translate-x-1 transition-all"
                />
              </a>

              <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-50 text-cyan-600">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-0.5">Location</p>
                  <p className="text-sm font-medium text-slate-900">Melbourne, Victoria, Australia</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <a
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 hover:shadow-sm hover:border-slate-300 transition-all"
                >
                  <Linkedin
                    size={18}
                    className="text-slate-500 group-hover:text-[#0A66C2] transition-colors"
                  />
                  <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                    LinkedIn
                  </span>
                </a>
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 hover:shadow-sm hover:border-slate-300 transition-all"
                >
                  <Github
                    size={18}
                    className="text-slate-500 group-hover:text-black transition-colors"
                  />
                  <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                    GitHub
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full h-full">
            <ContactForm />
          </div>
        </div>

        <WorldTimes />
      </Section>

      <Testimonials />
      <Newsletter />
    </PageShell>
  );
}