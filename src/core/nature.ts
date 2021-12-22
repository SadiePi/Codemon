import { Stat } from "./stats.ts"
//import { BiMap } from "https://deno.land/x/rimbu@0.6.9/bimap/mod.ts"

export type Nature = [buff: Stat, nerf: Stat]
//export const Natures = BiMap.empty<string, Nature>()
export const Natures = new Map<Nature, string>()
export function getRandomNature() {
  return [...Natures.keys()][Math.floor(Math.random() * Natures.size)]
}
