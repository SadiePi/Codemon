import { ExperienceGroup } from "../mod.ts";
import loader from "../loader.ts";

export const Slow: ExperienceGroup = (l: number) => (5 * Math.pow(l, 3)) / 4;
