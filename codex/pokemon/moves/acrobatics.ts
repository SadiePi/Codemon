import { Move, power } from "../mod.ts";
import loader from "../loader.ts";

export const Acrobatics: Move = loader.register<Move>(P => ({
  name: "Acrobatics",
  description: "The user nimbly strikes the target. This attack does massive damage if the user isn't holding an item.",
  type: P.Types.Flying,
  category: "Physical",
  pp: 15,
  target: { position: "Any" },
  makesContact: true,
  attack: power(55, (_attack, _context) => {
    // TODO if(!_context.user.heldItem) _attack.power *= 2;
  }),
}));
