import P, {
  Ability,
  Battle,
  Effects,
  MoveEntry,
  TraditionalBBP as T,
  TargetContext,
  decide,
  permanent,
} from "../mod.ts";

export const Overgrow: Ability = {
  name: "Overgrow",
  description: "Powers up Grass-type moves when the Pokémon's HP is low.",
  slot: "ability",

  apply: ({ self }) => {
    const boostGrassMovesWhenLowHP = (effect: Effects<T>, { source }: TargetContext<T>) => {
      if (!(source instanceof MoveEntry)) return;
      if (source.user !== self) return;
      if (source.effects.type !== P.Types.Grass) if (action.params.source.user !== self) return;
      if (!effect.attack) return;
      if (self.stats.hp.percent > 1 / 3) return;

      const old = effect.attack;
      effect.attack = () => {
        const attack = decide(old, context);
        if (!attack) return undefined;
        attack.stat = attack.stat * 1.5;
        return attack;
      };
    };

    const startListeningForEffects = (battle: Battle<T>) => battle.on("effect", boostGrassMovesWhenLowHP);
    const stopListeningForEffects = (battle: Battle<T>) => battle.off("effect", boostGrassMovesWhenLowHP);

    return {
      name: Overgrow.name,
      activate: () => {
        self.on("enterBattle", startListeningForEffects);
        self.on("exitBattle", stopListeningForEffects);
      },
      deactivate: () => {
        self.off("enterBattle", startListeningForEffects);
        self.off("exitBattle", stopListeningForEffects);

        // TODO battle.off somehow
      },
      expiry: permanent,
    };
  },
};
