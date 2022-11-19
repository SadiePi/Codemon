import { ExperienceGroup } from "../core/experience.ts";

export const Slow: ExperienceGroup = (l: number) => (5 * Math.pow(l, 3)) / 4;

export const MedSlow: ExperienceGroup = (l: number) => (6 * Math.pow(l, 3)) / 5 - 15 * Math.pow(l, 2) + 100 * l - 140;

export const MedFast: ExperienceGroup = (l: number) => Math.pow(l, 3);

export const Fast: ExperienceGroup = (l: number) => (4 * Math.pow(l, 3)) / 5;

export const Erratic: ExperienceGroup = function (l: number) {
  if (l <= 50) return (Math.pow(l, 3) * (100 - l)) / 50;
  else if (l <= 68) return (Math.pow(l, 3) * (150 - l)) / 100;
  else if (l <= 98) return (Math.pow(l, 3) * ((1911 - 10 * l) / 3)) / 500;
  else if (l <= 100) return (Math.pow(l, 3) * (160 - l)) / 100;
  return Number.POSITIVE_INFINITY;
};

export const Fluctuating: ExperienceGroup = function (l: number) {
  if (l <= 15) return (Math.pow(l, 3) * ((l + 1) / 3 + 24)) / 50;
  if (l <= 36) return (Math.pow(l, 3) * (l + 14)) / 50;
  if (l <= 100) return (Math.pow(l, 3) * (l / 2 + 32)) / 50;
  return Number.POSITIVE_INFINITY;
};
