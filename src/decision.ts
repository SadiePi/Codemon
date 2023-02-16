// The structure of this file came to me all at once. I have no idea if it's
// unique or good, but I'm going to use it for now.

import { NonEmptyArray, weightedRandom } from "./util.ts";

type Maybe<T> = T | undefined;
type Definite<T> = T extends undefined ? never : T;

export type Decider<T, Context = void> = T | ((context: Context) => Decider<T, Context>);
export function decide<T, Context>(decider: Decider<T, Context>, context: Context): T {
  while (decider instanceof Function) decider = decider(context);
  return decider;
}

export type MultiDecider<T extends Record<string, unknown>, Context> = {
  [K in keyof T]: Decider<T[K], Context>;
};
// For technical reasons, a universal multiDecide function seems to be impossible.
// You'll have to define your own.

export function condition<T, Context>(
  predicate: (context: Context) => boolean,
  effect: Decider<T, Context>
): Decider<Maybe<T>, Context>;
export function condition<T, Context>(
  predicate: (context: Context) => boolean,
  effect: Decider<T, Context>,
  otherwise: Decider<T, Context>
): Decider<T, Context>;
export function condition<T, Context>(
  predicate: (context: Context) => boolean,
  effect: Decider<T, Context>,
  otherwise?: Decider<T, Context>
): Decider<Maybe<T>, Context> {
  return (context: Context) => {
    if (predicate(context)) return effect;
    if (otherwise) return otherwise;
  };
}

export function chance<T, Context>(chance: number, effect: Decider<T, Context>): Decider<Maybe<T>, Context>;
export function chance<T, Context>(
  chance: number,
  effect: Decider<T, Context>,
  otherwise: Decider<T, Context>
): Decider<T, Context>;
export function chance<T, Context>(
  chance: number,
  effect: Decider<T, Context>,
  otherwise?: Decider<T, Context>
): Decider<T | Maybe<T>, Context> {
  return condition(_ => Math.random() < chance, effect, otherwise);
}

export function oneOf<T, Context>(...choices: NonEmptyArray<Decider<T, Context>>): Decider<T, Context> {
  return _ => {
    return choices[Math.floor(Math.random() * choices.length)];
  };
}

export function weighted<T, Context>(...entries: NonEmptyArray<[Decider<T, Context>, number]>): Decider<T, Context> {
  return _ => {
    return weightedRandom(entries);
  };
}

export function cycle<T, Context>(...choices: NonEmptyArray<Decider<T, Context>>): Decider<T, Context> {
  let index = 0;
  return _ => {
    const choice = choices[index];
    index = (index + 1) % choices.length;
    return choice;
  };
}


export function multiple<T, Context>(
  effect: NonEmptyArray<Decider<T, Context>>,
  filterMaybe: true
): Decider<Definite<T>[], Context>;
export function multiple<T, Context>(
  effect: NonEmptyArray<Decider<T, Context>>,
  filterMaybe: false
): Decider<T[], Context>;
export function multiple<T, Context>(
  effect: NonEmptyArray<Decider<T, Context>>,
  filterMaybe = true
): Decider<(T | Definite<T>)[], Context> {
  return context => {
    const result = effect.map(e => decide(e, context));
    if (filterMaybe) return result.filter((x): x is Definite<T> => x !== undefined);
    return result;
  };
}
