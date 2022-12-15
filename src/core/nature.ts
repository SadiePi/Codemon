import { PermanentStat } from "./stats.ts";
import C from "../base/index.ts";
import { randomChoice } from "./util.ts";

export interface Nature {
  name: string;
  buff: PermanentStat;
  nerf: PermanentStat;
}

export function getRandomNature(): Nature {
  return randomChoice(Object.values(C.Natures));
}
