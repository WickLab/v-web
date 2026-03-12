"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const valid = name.trim() && email.trim() && message.trim();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!valid) return;

    try {
      setStatus("sending");
      setStatusMessage("");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload?.error || "Your message could not be sent at this time. Please try again.");
      }

      setStatus("success");
      setStatusMessage(
        "Your message has been sent successfully. Thank you for reaching out — I will get back to you as soon as possible."
      );
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      setStatus("error");
      setStatusMessage(error instanceof Error ? error.message : "Failed to send message.");
    }
  };

  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-white p-6">
      <h3 className="text-lg font-semibold text-[var(--color-primary)]">Get in Touch</h3>
      <p className="mt-2 text-sm text-[var(--color-body-text)]">
        Please complete and submit the contact form below. Your message will be delivered directly to my email inbox, and I will respond to your inquiry as soon as possible. I look forward to connecting with you.
      </p>

      <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Name" value={name} setValue={setName} placeholder="Your name" />
          <Field label="Email" value={email} setValue={setEmail} placeholder="you@example.com" type="email" />
        </div>
        <Field label="Subject" value={subject} setValue={setSubject} placeholder="Internship / Collaboration / Question" />
        <div>
          <label className="text-xs text-[var(--color-secondary-text)]">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell me about your idea or opportunity..."
            className="mt-2 min-h-32 w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-primary)] placeholder:text-[var(--color-secondary-text)] outline-none focus:border-[var(--color-accent)] focus:ring-4 focus:ring-cyan-100 transition"
          />
        </div>

        <button
          type="submit"
          disabled={!valid || status === "sending"}
          className={[
            "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition",
            valid && status !== "sending"
              ? "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]"
              : "bg-[var(--color-surface-muted)] text-[var(--color-secondary-text)] border border-[var(--color-border)] cursor-not-allowed",
          ].join(" ")}
        >
          <Send size={16} />
          {status === "sending" ? "Sending..." : "Send"}
        </button>

        {!valid && status === "idle" && (
          <p className="text-xs text-[var(--color-secondary-text)]">Fill in Name, Email, and Message to enable sending.</p>
        )}

        {statusMessage && (
          <p className={`text-xs ${status === "success" ? "text-[var(--color-accent)]" : "text-red-600"}`}>{statusMessage}</p>
        )}
      </form>
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
  setValue: (v: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-xs text-[var(--color-secondary-text)]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-primary)] placeholder:text-[var(--color-secondary-text)] outline-none focus:border-[var(--color-accent)] focus:ring-4 focus:ring-cyan-100 transition"
      />
    </div>
  );
}