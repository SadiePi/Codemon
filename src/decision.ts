// The structure of this file came to me all at once. I have no idea if it's
// unique or good, but I'm going to use it for now.

type Maybe<T> = T | undefined;
type Definite<T> = Exclude<T, undefined>;

export type Decider<T, Context = undefined> = T | ((context: Context) => Decider<T, Context>);
export function decide<T, Context>(decider: Decider<T, Context>, context: Context): T {
  while (decider instanceof Function) decider = decider(context);
  return decider;
}

export type MultiDecider<T extends Record<string, unknown>, Context> = {
  [K in keyof T]: Decider<T[K], Context>;
};
/**
 * For obscure technical reasons, a universal multiDecide function is not possible with full type safety.
 * However, the following is the recommended structure for implementing such a function:
 *
 * ```
 * interface T { a: number; b: string; }
 * interface Context { c: boolean; }
 *
 * function multiDecideT(
 *   deciders: MultiDecider<T, Context>,
 *   context: Context
 * ): T {
 *   const result: Partial<T> = {};
 *   const a = decide(deciders.a, context);
 *   if (a !== undefined) result.a = a;
 *   const b = decide(deciders.b, context);
 *   if (b !== undefined) result.b = b;
 *   return result as T;
 * }
 * ```
 */
export const multiDecide = undefined as never;

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

export function choose<T, Context>(...choices: Decider<T, Context>[]): Decider<T, Context> {
  return _ => choices[Math.floor(Math.random() * choices.length)];
}

interface WeightedRandomEntry<T, Context> {
  effect: Decider<T, Context>;
  weight: number;
}
export function weighted<T, Context>(...entries: WeightedRandomEntry<T, Context>[]): Decider<T, Context> {
  return _ => {
    const total = entries.reduce((a, b) => a + b.weight, 0);
    const rand = Math.random() * total;
    let current = 0;
    for (const { effect, weight } of entries) {
      current += weight;
      if (rand < current) return effect;
    }
    throw new Error("Weighted random failed!");
  };
}

export function cycle<T, Context>(...choices: Decider<T, Context>[]): Decider<T, Context> {
  let index = 0;
  return _ => {
    const choice = choices[index];
    index = (index + 1) % choices.length;
    return choice;
  };
}

export function multiple<T, Context>(effect: Decider<T, Context>[], filterMaybe: true): Decider<T[], Context>;
export function multiple<T, Context>(effect: Decider<T, Context>[], filterMaybe: false): Decider<Maybe<T>[], Context>;
export function multiple<T, Context>(
  effect: Decider<T, Context>[],
  filterUndefined = true
): Decider<T[] | Maybe<T>[], Context> {
  return context => {
    const result = effect.map(e => decide(e, context));
    if (filterUndefined) return result.filter((x): x is Definite<T> => x !== undefined);
    return result;
  };
}

export function range(min: number, max: number, distribution: Decider<number> = Math.random): Decider<number> {
  return _ => decide(distribution, undefined) * (max - min) + min;
}

export function fallback<T>(decider: Decider<Maybe<T>>, fallback: T): Decider<T> {
  return context => decide(decider, context) ?? fallback;
}

export function timeout<T, Context>(
  decider: Decider<Promise<T>, Context>,
  duration: number,
  fallback: T
): Decider<Promise<T>, Context> {
  return context => {
    const timer = new Promise<T>(resolve => setTimeout(() => resolve(fallback), duration));
    return Promise.race([decide(decider, context), timer]);
  };
}

export function proxy<T, Context>(decider: Decider<T, Context>, proxy: (result: T) => void): Decider<T, Context> {
  return context => {
    const result = decide(decider, context);
    proxy(result);
    return result;
  };
}
