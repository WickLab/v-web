import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Achievements",
  description: "Selected projects, outcomes, and secure project viewing access.",
};

export default function AchievementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}