"use client";

export default function ProjectCategoryTabs({
  categories,
  active,
  setActive,
}: {
  categories: string[];
  active: string;
  setActive: (value: string) => void;
}) {
  return (
    <div className="mt-8 flex justify-center">
      <div className="w-full max-w-5xl rounded-2xl border border-[var(--color-border)] bg-white p-2">
        <div className="flex justify-start gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0">
          {categories.map((category) => {
            const isActive = active === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                className={`shrink-0 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[var(--color-accent)] text-white shadow-sm"
                    : "text-[var(--color-secondary-text)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-primary)]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}