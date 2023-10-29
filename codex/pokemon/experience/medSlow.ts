import { ExperienceGroup } from "../mod.ts";

export const MedSlow: ExperienceGroup = (l: number) =>
  (6 * Math.pow(l, 3)) / 5 - 15 * Math.pow(l, 2) + 100 * l - 140 /* so MedSlow(1)=0 */ + 269 / 5;
