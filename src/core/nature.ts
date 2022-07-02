import { PermanentStat } from "./stats.ts";
import C from "../base/index.ts";

export interface Nature {
  name: string;
  buff: PermanentStat;
  nerf: PermanentStat;
}

export function getRandomNature(): Nature {
  const nats = Object.values(C.Nature);
  return nats[(nats.length * Math.random()) << 0];
}
