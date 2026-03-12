export const PROJECT_CATEGORY_LABELS: Record<string, string> = {
  "IoT / Edge Computing / Aviation Data": "IoT / Aviation",
  "Fashion Tech / Product Design": "Fashion Tech",
  "Business / Workforce Operations": "Workforce Ops",
  "IoT / Smart Retail": "Smart Retail / IoT",
  "Sustainability / Circular Economy": "Sustainability",
  "IoT / Wildlife Conservation / AI": "Wildlife AI / IoT",
  "Autonomous Systems / Robotics": "Robotics",
  "UI/UX Design / Spatial Interfaces": "Spatial UI/UX",
  "Education Technology": "EdTech",
  "Web Development / Service Operations": "Web / Services",
  "Business / Entrepreneurial Projects": "Business Projects",
  "Web Development / Personal Brand": "Web / Personal Brand",
  "Web Development / AgriTech / Export": "Web / AgriTech",
};

export function getProjectCategoryLabel(category: string) {
  return PROJECT_CATEGORY_LABELS[category] ?? category;
}

export const MAIN_PROJECT_CATEGORIES = [
  "All",
  "Web Development",
  "IoT / AI",
  "Business",
  "Design",
  "Education",
  "Sustainability",
] as const;

export function getProjectMainCategory(category: string) {
  if (category.includes("Web Development")) return "Web Development";

  if (
    category.includes("IoT") ||
    category.includes("AI") ||
    category.includes("Autonomous") ||
    category.includes("Robotics") ||
    category.includes("Aviation")
  ) {
    return "IoT / AI";
  }

  if (category.includes("Business")) return "Business";

  if (
    category.includes("UI/UX") ||
    category.includes("Fashion Tech") ||
    category.includes("Product Design") ||
    category.includes("Spatial")
  ) {
    return "Design";
  }

  if (category.includes("Education")) return "Education";
  if (category.includes("Sustainability")) return "Sustainability";

  return "Other";
}

export function getAvailableMainProjectCategories(categories: string[]) {
  const present = new Set(categories.map(getProjectMainCategory));

  const ordered = MAIN_PROJECT_CATEGORIES.filter(
    (category) => category === "All" || present.has(category)
  );

  if (present.has("Other")) {
    return [...ordered, "Other"];
  }

  return ordered;
}