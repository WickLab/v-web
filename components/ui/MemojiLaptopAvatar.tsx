"use client";

import { useState } from "react";

type Props = {
  /** Put your memoji png in /public and reference it like "/avatars/memoji-male-laptop.png" */
  src?: string;
  alt?: string;
  size?: number; // inner image size
};

const FALLBACK_TWEMOJI =
  "https://twemoji.maxcdn.com/v/latest/72x72/1f468-200d-1f4bb.png"; // 👨‍💻

export default function MemojiLaptopAvatar({
  src = "/avatars/memoji-male-laptop.png",
  alt = "Male memoji avatar using a laptop",
  size = 170
}: Props) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <div className="relative flex h-[260px] w-[260px] items-center justify-center overflow-hidden rounded-[38px] border border-white/10 bg-[#05070d]">
      {/* soft spotlight like your reference */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(255,255,255,0.14),transparent_52%)]" />

      {/* subtle tech glow (kept minimal, doesn’t change your palette) */}
      <div className="pointer-events-none absolute -inset-10 bg-[radial-gradient(circle_at_55%_55%,rgba(34,211,238,0.12),transparent_60%),radial-gradient(circle_at_45%_65%,rgba(139,92,246,0.10),transparent_62%)] blur-2xl" />

      {/* pixel dust like the screenshot vibe */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <span className="absolute left-7 top-10 h-1.5 w-1.5 bg-white/35" />
        <span className="absolute left-16 top-24 h-1 w-1 bg-white/25" />
        <span className="absolute right-10 top-14 h-1.5 w-1.5 bg-white/30" />
        <span className="absolute right-16 top-28 h-1 w-1 bg-white/20" />
        <span className="absolute left-12 bottom-14 h-1 w-1 bg-white/20" />
        <span className="absolute right-14 bottom-12 h-1.5 w-1.5 bg-white/25" />
      </div>

      {/* image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imgSrc}
        alt={alt}
        width={size}
        height={size}
        draggable={false}
        onError={() => setImgSrc(FALLBACK_TWEMOJI)}
        className="relative select-none drop-shadow-[0_18px_22px_rgba(0,0,0,0.55)]"
        style={{ width: size, height: "auto" }}
      />
    </div>
  );
}