import { ExperienceGroup } from "../mod.ts";

export const Erratic: ExperienceGroup = (l: number) => {
  if (l <= 50) return (Math.pow(l, 3) * (100 - l)) / 50 /* so Erratic(1)=0 */ - 99 / 50;
  else if (l <= 68) return (Math.pow(l, 3) * (150 - l)) / 100 - 99 / 50;
  else if (l <= 98) return (Math.pow(l, 3) * ((1911 - 10 * l) / 3)) / 500 - 99 / 50;
  else if (l <= 100) return (Math.pow(l, 3) * (160 - l)) / 100 - 99 / 50;
  return Number.POSITIVE_INFINITY; // TODO extend
};
