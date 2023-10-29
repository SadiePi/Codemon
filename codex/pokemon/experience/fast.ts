import { ExperienceGroup } from "../mod.ts";

export const Fast: ExperienceGroup = (l: number) => (4 * Math.pow(l, 3)) / 5 /* so Fast(1)=0 */ - 4 / 5;
