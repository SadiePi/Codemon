import { ExperienceGroup } from "../index.ts";

export const Erratic: ExperienceGroup = (l: number) => {
  if (l <= 50) return (Math.pow(l, 3) * (100 - l)) / 50;
  else if (l <= 68) return (Math.pow(l, 3) * (150 - l)) / 100;
  else if (l <= 98) return (Math.pow(l, 3) * ((1911 - 10 * l) / 3)) / 500;
  else if (l <= 100) return (Math.pow(l, 3) * (160 - l)) / 100;
  return Number.POSITIVE_INFINITY; // TODO extend
};
