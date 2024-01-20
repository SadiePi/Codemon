import { Move, chance, power } from "../mod.ts";
import loader from "../loader.ts";

export const AcidSpray: Move = loader.register<Move>(P => ({
  name: "Acid Spray",
  description: "The user spits fluid that works to melt the target. This harshly lowers the target's Sp. Def stat.",
  target: { position: "Adjacent", alignment: "Foe" },
  category: "Special",
  type: P.Types.Poison,
  pp: 20,
  makesContact: false,

  attack: power(40),
  stages: { specialDefense: -2 },
}));
