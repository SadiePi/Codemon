import { ExperienceGroup } from "../mod.ts";

export const Slow: ExperienceGroup = (l: number) => (5 * Math.pow(l, 3)) / 4 /* so Slow(1)=0 */ - 5 / 4;
