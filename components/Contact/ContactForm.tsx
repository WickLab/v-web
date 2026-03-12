"use client";

import { useMemo, useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const mailto = useMemo(() => {
    const to = "info@vidulawickramasinghe.online";
    const s = encodeURIComponent(subject || "Portfolio Contact");
    const body = encodeURIComponent(`Hi Vidula,\n\n${message}\n\n— ${name}\n${email}`);
    return `mailto:${to}?subject=${s}&body=${body}`;
  }, [email, message, name, subject]);

  const valid = name.trim() && email.trim() && message.trim();

  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-white p-4 sm:p-5 md:p-6">
      <h3 className="text-lg font-semibold text-[var(--color-primary)]">Get in Touch</h3>
      <p className="mt-2 text-sm text-[var(--color-body-text)] leading-relaxed">
        Please complete and submit the contact form below. Your message will be delivered directly to my email inbox, and I will respond to your inquiry as soon as possible. I look forward to connecting with you.
      </p>

      <form className="mt-6 grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Name" value={name} setValue={setName} placeholder="Your name" />
          <Field label="Email" value={email} setValue={setEmail} placeholder="you@example.com" />
        </div>

        <Field label="Subject" value={subject} setValue={setSubject} placeholder="Internship / Collaboration / Question" />

        <div>
          <label className="text-xs text-[var(--color-secondary-text)]">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell me about your idea or opportunity..."
            className="mt-2 min-h-32 sm:min-h-36 w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-primary)] placeholder:text-[var(--color-secondary-text)] outline-none focus:border-[var(--color-accent)] focus:ring-4 focus:ring-cyan-100 transition resize-y"
          />
        </div>

        <a
          href={valid ? mailto : undefined}
          aria-disabled={!valid}
          className={[
            "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3.5 text-sm font-medium transition w-full sm:w-auto",
            valid
              ? "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]"
              : "bg-[var(--color-surface-muted)] text-[var(--color-secondary-text)] border border-[var(--color-border)] cursor-not-allowed pointer-events-none",
          ].join(" ")}
        >
          <Send size={16} />
          Send
        </a>

        {!valid && <p className="text-xs text-[var(--color-secondary-text)]">Fill in Name, Email, and Message to enable sending.</p>}
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  setValue,
  placeholder,
}: {
  label: string;
  value: string;
  setValue: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="text-xs text-[var(--color-secondary-text)]">{label}</label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-primary)] placeholder:text-[var(--color-secondary-text)] outline-none focus:border-[var(--color-accent)] focus:ring-4 focus:ring-cyan-100 transition"
      />
    </div>
  );
}