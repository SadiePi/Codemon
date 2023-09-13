import { power, Move } from "../mod.ts";
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
  target: { alignment: "Any" },
  makesContact: true,
  charge: {
    recoil: {
      status: SemiInvulnerableTurn,
    },
  },
}));
