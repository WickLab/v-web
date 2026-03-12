import type { ReactNode } from "react";

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-[100svh] bg-[#0b1220] text-white">
      {children}
    </main>
  );
}