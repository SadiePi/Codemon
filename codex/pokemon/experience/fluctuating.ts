import { ExperienceGroup } from "../mod.ts";

export const Fluctuating: ExperienceGroup = (l: number) => {
  if (l <= 15) return (Math.pow(l, 3) * ((l + 1) / 3 + 24)) / 50 - 37 / 75;
  if (l <= 36) return (Math.pow(l, 3) * (l + 14)) / 50 - 37 / 75;
  if (l <= 100) return (Math.pow(l, 3) * (l / 2 + 32)) / 50 - 37 / 75;
  return Number.POSITIVE_INFINITY; // TODO extend
};
