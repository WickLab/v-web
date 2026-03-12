import { Github, Linkedin, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-white text-[var(--color-primary)] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-100 rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-12 sm:py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid gap-10 md:grid-cols-4 md:gap-8 lg:gap-12">
          
          {/* Brand & Bio (Spans 2 columns on medium screens and up) */}
          <div className="md:col-span-2">
            <div className="text-lg sm:text-xl font-semibold tracking-tight mb-4 flex items-center gap-2 text-[var(--color-primary)]">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse"></span>
              Vidula Wickramasinghe
            </div>
            <p className="text-sm text-[var(--color-body-text)] leading-relaxed max-w-sm">
              Building intelligent systems, scalable web apps, and future-driven digital solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-xs font-bold tracking-widest text-[var(--color-secondary-text)] uppercase mb-5 sm:mb-6">
              Quick Links
            </h3>
            <div className="flex flex-col gap-3 text-sm text-[var(--color-body-text)]">
              <a href="/" className="hover:text-[var(--color-accent)] transition-colors w-fit flex items-center gap-2 group">
                <span className="w-0 h-px bg-[var(--color-accent)] transition-all duration-200 group-hover:w-3"></span>
                Home
              </a>
              <a href="/portfolio" className="hover:text-[var(--color-accent)] transition-colors w-fit flex items-center gap-2 group">
                <span className="w-0 h-px bg-[var(--color-accent)] transition-all duration-200 group-hover:w-3"></span>
                Portfolio
              </a>
              <a href="/achievements" className="hover:text-[var(--color-accent)] transition-colors w-fit flex items-center gap-2 group">
                <span className="w-0 h-px bg-[var(--color-accent)] transition-all duration-200 group-hover:w-3"></span>
                Achievements
              </a>
              <a href="/contact" className="hover:text-[var(--color-accent)] transition-colors w-fit flex items-center gap-2 group">
                <span className="w-0 h-px bg-[var(--color-accent)] transition-all duration-200 group-hover:w-3"></span>
                Contact
              </a>
            </div>
          </div>

          {/* Connect & Location */}
          <div className="md:col-span-1">
            <h3 className="text-xs font-bold tracking-widest text-[var(--color-secondary-text)] uppercase mb-5 sm:mb-6">
              Connect
            </h3>
            
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <a
                href="https://github.com/your-username"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-[var(--color-border)] hover:bg-[var(--color-surface-muted)] group transition-all duration-200"
              >
                <Github className="h-4 w-4 text-[var(--color-secondary-text)] group-hover:text-[var(--color-primary)] transition-colors" />
              </a>

              <a
                href="https://linkedin.com/in/your-link"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-[var(--color-border)] hover:bg-[var(--color-surface-muted)] group transition-all duration-200"
              >
                <Linkedin className="h-4 w-4 text-[var(--color-secondary-text)] group-hover:text-[var(--color-accent)] transition-colors" />
              </a>

              <a
                href="mailto:youremail@example.com"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-[var(--color-border)] hover:bg-[var(--color-surface-muted)] group transition-all duration-200"
              >
                <Mail className="h-4 w-4 text-[var(--color-secondary-text)] group-hover:text-[var(--color-accent)] transition-colors" />
              </a>
            </div>

            <p className="flex items-center gap-2 text-sm text-[var(--color-secondary-text)]">
              <MapPin className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
              Melbourne, Australia
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 sm:mt-16 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-[var(--color-border)] pt-6 sm:pt-8 text-xs text-[var(--color-secondary-text)]">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} Vidula Wickramasinghe. All Rights Reserved.
          </p>

          <div className="flex items-center gap-4 sm:gap-6">
            <a href="/privacy-policy" className="hover:text-[var(--color-primary)] transition-colors">
              Privacy Policy
            </a>
            <a href="/terms-and-conditions" className="hover:text-[var(--color-primary)] transition-colors">
              Terms and Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}