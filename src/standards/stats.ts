import { Stat } from "../core/stats.ts"
import { Natures } from "../core/nature.ts"

const map: [[Stat, Stat], string][] = [
  [["Attack", "Defense"], "Lonely"],
  [["Attack", "Speed"], "Brave"],
  [["Attack", "SpecialAttack"], "Adamant"],
  [["Attack", "SpecialDefense"], "Naughty"],
  // TODO ...
]

map.forEach((n) => Natures.set(n[0], n[1]))
