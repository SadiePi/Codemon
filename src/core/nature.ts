import { PermanentStat } from "./stats.ts";

export interface Nature {
  name: string;
  buff: PermanentStat;
  nerf: PermanentStat;
}

const nats: Record<string, Nature> = {};

export function getRandomNature(): Nature {
  const vals = Object.values(nats);
  return vals[(vals.length * Math.random()) << 0];
}

export default nats;
