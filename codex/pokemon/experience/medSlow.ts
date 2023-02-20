import { ExperienceGroup } from "../index.ts";
import loader from "../loader.ts"

export const MedSlow: ExperienceGroup = (l: number) => (6 * Math.pow(l, 3)) / 5 - 15 * Math.pow(l, 2) + 100 * l - 140;
