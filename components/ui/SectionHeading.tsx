import clsx from "clsx";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={clsx("max-w-3xl", className)}>
      {eyebrow && <div className="text-xs uppercase tracking-[0.22em] text-[var(--color-secondary-text)]">{eyebrow}</div>}
      <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl text-[var(--color-primary)]">{title}</h1>
      {subtitle && <p className="mt-3 text-sm leading-relaxed text-[var(--color-body-text)] md:text-base">{subtitle}</p>}
    </div>
  );
}