import { Ability, Effects, MoveEntry, TargetContext, permanent, TraditionalBBP as T, chance } from "../mod.ts";
import loader from "../loader.ts";

export const CuteCharm: Ability = loader.register(P => ({
  name: "Cute Charm",
  description: "The Pokémon may infatuate attackers that make direct contact with it.",
  slot: "ability",

  apply: ({ self }) => {
    function infatuateAttackerOnContact(effect: Effects<T>, context: TargetContext<T>) {
      const { action } = context;

      if (!(action.params.source instanceof MoveEntry)) return;
      if (!action.params.source.effects.makesContact) return;

      // TODO? make it exclusively straight :(

      effect.recoil = { status: chance(1 / 3, P.Statuses.Infatuation) };
    }

    return {
      name: CuteCharm.name,
      activate: () => self.on("receiveEffects", infatuateAttackerOnContact),
      deactivate: () => self.off("receiveEffects", infatuateAttackerOnContact),
      expiry: permanent,
    };
  },
}));
