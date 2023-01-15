// I know what I'm doing, Deno.
// deno-lint-ignore-file ban-types

import { StatusEffect, Weather } from "./battle.ts";
import { Ability, Gender, Species, Type } from "./codemon.ts";
import { Item } from "./item.ts";
import { Move } from "./move.ts";
import { ExperienceGroup, Nature } from "./stats.ts";
import { Trainer } from "./trainer.ts";

export interface Codex {
  Abilities: Record<string, Ability>;
  Experience: Record<string, ExperienceGroup>;
  Genders: Record<string, Gender>;
  Items: Record<string, Item>;
  Moves: Record<string, Move>;
  Natures: Record<string, Nature>;
  Species: Record<string, Species>;
  Statuses: Record<string, StatusEffect>;
  Trainers: Record<string, Trainer>;
  Types: Record<string, Type>;
  Weathers: Record<string, Weather>;
}

const builders: [{}, (C: Codex)=>{}, ((C: Codex)=>void)?][] = [];
let built = false;

export function register<R extends {}>(
  builder: (codex: Codex) => R,
  after?: (codex: Codex) => void
): R {
  if (built) throw new Error("Codex already built");
  const placeholder = {} as R;
  builders.push([placeholder, builder, after]);
  return placeholder;
}

export function build(codex: Codex) {
  if (built) throw new Error("Don't call build() twice");
  built = true;
  builders.forEach(b => Object.assign(b[0], b[1](codex)));
  builders.forEach(b => b[2]?.(codex));
  builders.length = 0;
}



// TODO use?
type DeepMap<T, U> = T extends Record<string, unknown> ? { [K in keyof T]: DeepMap<T[K], U> } : U;
export type DiscoveryMap<Codex> = DeepMap<Codex, boolean>;
