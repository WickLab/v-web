"use client";

import { useRef } from "react";
import clsx from "clsx";

export default function MagneticButton({
  children,
  className,
  as = "button",
  href,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "button" | "a";
  href?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    const dx = x * 0.12;
    const dy = y * 0.18;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  };

  const common = clsx(
    "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition",
    "hover:scale-[1.02] active:scale-[0.99]",
    className
  );

  if (as === "a") {
    return (
      <a
        ref={(node) => {
          ref.current = node;
        }}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={common}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={(node) => {
        ref.current = node;
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      className={common}
      type="button"
    >
      {children}
    </button>
  );
}