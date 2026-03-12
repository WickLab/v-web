export const PRIVATE_PROJECT_IDS = [
  "ads-plane-feeder",
  "digital-wardrobe",
  "vending-machine",
  "greenloop",
  "self-driving-drone",
  "holographic-eye",
] as const;

const PRIVATE_PROJECT_ID_SET = new Set<string>(PRIVATE_PROJECT_IDS);

export function isPrivateProject(projectId: string) {
  return PRIVATE_PROJECT_ID_SET.has(projectId);
}