import loader from "../loader.ts";
import {
  Ability,
  Effects,
  TargetContext,
  TraditionalBBP as T,
  permanent,
  MoveEntry,
  effectAction,
  chance,
} from "../mod.ts";

export const FlameBody: Ability = loader.register(P => ({
  name: "Flame Body",
  description: "Contact with the Pokémon may burn the attacker.",
  slot: "ability",

  apply: ({ self }) => {
    function maybeBurnOnContact(_effect: Effects<T>, { action, source, battle }: TargetContext<T>) {
      if (!(source instanceof MoveEntry)) return;
      if (!source.effects.makesContact) return;

      action.reactions.add(
        effectAction({
          battle,
          user: self,
          targets: [source.user],
          parent: action,
          effect: {
            status: chance(3 / 10, P.Statuses.Burn),
          },
        })
      );
    }

    return {
      name: FlameBody.name,
      activate: () => self.on("receiveEffects", maybeBurnOnContact),
      deactivate: () => self.off("receiveEffects", maybeBurnOnContact),
      expiry: permanent,
    };
  },
}));
