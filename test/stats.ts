import * as T from "../src/core/index.ts"
import { garchomp } from "./common.ts"

// https://bulbapedia.bulbagarden.net/wiki/Stat#Example_2
const chompy = new T.Codemon({
  species: garchomp,
  name: "Noam Chompy",
  sex: T.Female,
  level: 78,
  nature: ["Attack", "SpecialAttack"],
  stats: {
    HP: {
      individualValue: 24,
      effortValue: 74,
    },
    Attack: {
      individualValue: 12,
      effortValue: 190,
    },
    Defense: {
      individualValue: 30,
      effortValue: 91,
    },
    SpecialAttack: {
      individualValue: 16,
      effortValue: 48,
    },
    SpecialDefense: {
      individualValue: 23,
      effortValue: 84,
    },
    Speed: {
      individualValue: 5,
      effortValue: 23,
    },
  },
})
console.debug(`${chompy.stats.Speed.value(false)}`)
