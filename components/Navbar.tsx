"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, Menu, X, BookOpen, Linkedin, Github } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/achievements", label: "Achievements" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-[var(--color-border)] py-4 ${
        mobileMenuOpen
          ? "bg-white" // Solid background when menu is open
          : scrolled
          ? "bg-white/80 backdrop-blur-md"
          : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-[var(--color-border)] transition-colors">
            <Image
              src="/genmoji.svg"
              alt="Logo"
              width={40}
              height={40}
              priority
              className="object-cover"
            />
          </div>
        </Link>

        {/* Main Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-all duration-200 relative group ${
                  active
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--color-secondary-text)] hover:text-[var(--color-primary)]"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-0.5 bg-[var(--color-accent)] transition-all duration-200 rounded-full ${
                    active ? "w-5 opacity-100" : "w-0 opacity-0 group-hover:w-5 group-hover:opacity-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {/* Social Icons (Desktop) */}
          <div className="hidden md:flex items-center gap-4 mr-2">
            <a
              href="https://www.linkedin.com/in/vidula-wickramasinghe-931259321/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-secondary-text)] hover:text-[#0A66C2] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/wick-lab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-secondary-text)] hover:text-[var(--color-primary)] transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="mailto:info@vidulawickramasinghe.com"
              className="text-[var(--color-secondary-text)] hover:text-[#EA4335] transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Blog Button (Desktop) */}
          <Link
            href="https://medium.com/@vidulawickramasingha/list/newsletter-articles-b621783ddba9"
            className="hidden md:flex items-center gap-2 rounded-lg border border-[var(--color-secondary-text)] bg-transparent px-5 py-2.5 text-sm font-semibold text-[var(--color-primary)] transition-all duration-200 hover:bg-[var(--color-surface-muted)]"
          >
            <BookOpen className="w-4 h-4" />
            Blog
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[var(--color-secondary-text)] hover:text-[var(--color-primary)] transition-colors border border-[var(--color-border)] rounded-lg bg-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`md:hidden absolute top-full left-0 w-full border-b border-[var(--color-border)] bg-white transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 py-6 gap-6">
          {navLinks.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg font-medium transition-colors ${
                  active ? "text-[var(--color-accent)]" : "text-[var(--color-secondary-text)] hover:text-[var(--color-primary)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="w-full h-px bg-[var(--color-border)] my-2" />

          <div className="flex flex-col gap-3">
            {/* Blog Button (Mobile) */}
            <Link
              href="https://medium.com/@vidulawickramasingha/list/newsletter-articles-b621783ddba9"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full rounded-lg bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--color-accent-hover)] transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Blog
            </Link>
          </div>

          {/* Social Icons (Mobile) */}
          <div className="flex items-center justify-center gap-8 pt-4">
            <a
              href="https://www.linkedin.com/in/vidula-wickramasinghe-931259321/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-secondary-text)] hover:text-[#0A66C2] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/wick_lab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-secondary-text)] hover:text-[var(--color-primary)] transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="mailto:info@vidulawickramasinghe.com"
              className="text-[var(--color-secondary-text)] hover:text-[#EA4335] transition-colors"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}