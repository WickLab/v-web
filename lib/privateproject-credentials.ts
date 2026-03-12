import "server-only";

export const PRIVATE_PROJECT_ACCESS: Record<
  string,
  { username: string; password: string }
> = {
  "ads-plane-feeder": {
    username: "ads-viewer",
    password: "ChangeMe-ADS-2026!",
  },
  "digital-wardrobe": {
    username: "wardrobe-viewer",
    password: "ChangeMe-Wardrobe-2026!",
  },
  "vending-machine": {
    username: "vending-viewer",
    password: "ChangeMe-Vending-2026!",
  },
  greenloop: {
    username: "greenloop-viewer",
    password: "ChangeMe-GreenLoop-2026!",
  },
  "self-driving-drone": {
    username: "drone-viewer",
    password: "ChangeMe-Drone-2026!",
  },
  "holographic-eye": {
    username: "holo-viewer",
    password: "ChangeMe-Holo-2026!",
  },
};

export function getPrivateProjectCredentials(projectId: string) {
  return PRIVATE_PROJECT_ACCESS[projectId] ?? null;
}