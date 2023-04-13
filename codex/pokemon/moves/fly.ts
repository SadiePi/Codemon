import { EffectParams } from "../../uranium/index.ts";
import { power, Move } from "../index.ts";
import loader from "../loader.ts";
import { SemiInvulnerableTurn } from "../statuses/semiInvulnerableTurn.ts";

export const Fly: Move = loader.register<Move>(P => ({
  name: "Fly",
  description: "The user flies up into the sky and then strikes its target on the next turn.",
  type: P.Types.Flying,
  category: "Physical",
  pp: 15,
  attack: power(90),
  accuracy: 95,
  target: "Any",
  makesContact: true,
  charge: {
    recoil: {
      status: SemiInvulnerableTurn,
    },
  },
}));
