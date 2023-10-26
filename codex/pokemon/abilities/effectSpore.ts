import loader from "../loader.ts";
import P, {
  Ability,
  TargetContext,
  permanent,
  TraditionalBBP as T,
  MoveEntry,
  chance,
  weighted,
  TargetEffects,
  effectAction,
} from "../mod.ts";

export const EffectSpore: Ability = loader.register(P => {
  const STATUS_DECIDER = chance(
    1 / 3,
    weighted(
      { effect: P.Statuses.Poison, weight: 9 },
      { effect: P.Statuses.Paralysis, weight: 10 },
      { effect: P.Statuses.Sleep, weight: 11 }
    )
  );

  return {
    name: "Effect Spore",
    description: "Contact with the Pokémon may inflict poison, sleep, or paralysis on the attacker.",
    slot: "ability",

    apply: ({ self }) => {
      function maybeApplyEffectOnContact(_effect: TargetEffects<T>, { source, action, battle }: TargetContext<T>) {
        if (!(source instanceof MoveEntry)) return;
        if (!source.effects.makesContact) return;
        if (source.user.getSpecies().types.includes(P.Types.Grass)) return;
        if (source.user.ability === P.Abilities.Overcoat) return;
        // TODO if source user is holding Safety Goggles, don't apply effect

        action.reactions.add(
          effectAction({
            battle,
            user: self,
            targets: [source.user],
            parent: action,
            effect: { status: STATUS_DECIDER },
          })
        );
      }

      return {
        name: EffectSpore.name,
        activate: () => self.on("receiveEffects", maybeApplyEffectOnContact),
        deactivate: () => self.off("receiveEffects", maybeApplyEffectOnContact),
        expiry: permanent,
      };
    },
  };
});
