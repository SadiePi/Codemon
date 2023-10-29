import { ExperienceGroup } from "../mod.ts";

export const MedFast: ExperienceGroup = (l: number) => Math.pow(l, 3) /* so MedFast(1)=0 */ - 1;
