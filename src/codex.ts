// I know what I'm doing, Deno.
// deno-lint-ignore-file ban-types

import { Weather } from "./battle.ts";
import { Ability, Gender, Species, Type } from "./codemon.ts";
import { Item } from "./item.ts";
import { Move } from "./move.ts";
import { ExperienceGroup, Nature } from "./stats.ts";
import { Strategy, Trainer } from "./trainer.ts";
import { config as currentConfig } from "./config.ts";
import { DeepPartial } from "./util.ts";
import { StatusEffect } from "./mod.ts";
import { merge } from "./external.ts";

export class CodexBuilder<C extends Codex> {
  private built = false;
  private builders: [{}, (codex: C) => {}, ((codex: C) => void)?][] = [];

  register<R extends {}>(builder: (codex: C) => R, after?: (codex: C) => void): R {
    if (this.built) throw new Error("Codex already built, register in new codex and merge");
    const placeholder = {} as R;
    this.builders.push([placeholder, builder, after]);
    return placeholder;
  }

  build(codex: C, config: DeepPartial<typeof currentConfig> = {}) {
    if (this.built) throw new Error("Don't call build() twice");

    merge(currentConfig, config); // deeply merges config into defaultConfig

    this.builders.forEach(b => Object.assign(b[0], b[1](codex)));
    this.builders.forEach(b => b[2]?.(codex));
  }
}

export abstract class Codex {
  public abstract Abilities: Record<string, Ability>;
  public abstract Experience: Record<string, ExperienceGroup>;
  public abstract Genders: Record<string, Gender>;
  public abstract Items: Record<string, Item>;
  public abstract Moves: Record<string, Move>;
  public abstract Natures: Record<string, Nature>;
  public abstract Species: Record<string, Species>;
  public abstract Statuses: Record<string, StatusEffect>;
  public abstract Strategies: Record<string, Strategy>;
  public abstract Trainers: Record<string, Trainer>;
  public abstract Types: Record<string, Type>;
  public abstract Weathers: Record<string, Weather>;
}

// TODO use?
type DeepMap<T, U> = T extends Record<string, unknown> ? { [K in keyof T]: DeepMap<T[K], U> } : U;
export type DiscoveryMap<Codex> = DeepMap<Codex, boolean>;

export default function codex<C extends Codex>(): CodexBuilder<C> {
  return new CodexBuilder<C>();
}
