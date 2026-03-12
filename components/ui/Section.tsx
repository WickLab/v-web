import type { ReactNode } from "react";
import Container from "./Container";

export default function Section({
  children,
  className = "",
  containerClassName = ""
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section className={`py-12 md:py-16 lg:py-20 ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}