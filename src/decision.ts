// TODO release this as a package

type Maybe<T> = T | undefined;
type Definite<T> = Exclude<T, undefined>;

/**
 * Represents a decision-making entity that can either be a value or a function generating a value.
 * The function can take a context of type `Context` as a parameter and return another Decider,
 * allowing for dynamic and context-based decisions.
 *
 * @template T The type of the value that this Decider will ultimately resolve to.
 * @template Context The type of the context object that can be passed to decision-making functions.
 *
 * @example
 * // Using a static value
 * const decider1: Decider<number> = 42;
 *
 * // Using a function to dynamically decide
 * const decider2: Decider<number, { isEven: boolean }> = (context) => context.isEven ? 2 : 1;
 *
 * // Nesting Deciders for more complex logic
 * const decider3: Decider<number, { value: number }> = (context) => {
 *   return (nestedContext) => nestedContext.value > 10 ? 100 : 0;
 * };
 */
export type Decider<T, Context = undefined> = T | ((context: Context) => Decider<T, Context>);

/**
 * Resolves a `Decider` to its final value, optionally using a context object.
 * If the `Decider` is a function, it will be called with the provided context until a non-function value is returned.
 *
 * @template T The type of the value that this Decider will ultimately resolve to.
 * @template Context The type of the context object that can be passed to decision-making functions.
 * @param {Decider<T, Context>} decider The Decider entity to resolve.
 * @param {Context} context The context object to be passed to the Decider if it's a function.
 * @returns {T} The final value that the Decider resolves to.
 *
 * @example
 * // Static value
 * const result1 = decide(42, {});  // result1 will be 42
 *
 * // Dynamic decision-making
 * const decider = (context: { isHigh: boolean }) => context.isHigh ? 100 : 1;
 * const result2 = decide(decider, { isHigh: true });  // result2 will be 100
 *
 * // Nested Deciders
 * const nestedDecider = (context: { value: number }) => context.value > 10 ? (ctx: { flag: boolean }) => ctx.flag ? 200 : 100 : 0;
 * const result3 = decide(nestedDecider, { value: 11, flag: true });  // result3 will be 200
 */
export function decide<T, Context>(decider: Decider<T, Context>, context: Context): T {
  while (decider instanceof Function) decider = decider(context);
  return decider;
}

/**
 * Represents a collection of decision-making entities, each associated with a specific key.
 * Each individual Decider can either be a static value or a function that takes a context of type `Context`
 * and returns another Decider, enabling complex, context-based decisions for each key.
 *
 * @template T A record type where each property represents a different decision to be made.
 * @template Context The type of the context object that can be passed to each decision-making function.
 *
 * @example
 * // A MultiDecider for a simple object with a number and a string
 * type MyType = { a: number, b: string };
 * const multiDecider: MultiDecider<MyType, {}> = {
 *   a: 42,
 *   b: "hello"
 * };
 *
 * // A more complex MultiDecider using context
 * type MyType = { x: number, y: string };
 * type MyContext = { isHigh: boolean };
 * const complexMultiDecider: MultiDecider<MyType, MyContext> = {
 *   x: context => context.isHigh ? 100 : 1,
 *   y: context => context.isHigh ? "high" : "low"
 * };
 */
export type MultiDecider<T extends Record<string, unknown>, Context> = {
  [K in keyof T]: Decider<T[K], Context>;
};

/**
 * The `multiDecide` function is not provided due to type safety concerns, but the following structure is recommended
 * for implementing a function that resolves a `MultiDecider`. This function takes a `MultiDecider` and a context object,
 * resolves each Decider within the `MultiDecider`, and returns an object where each key corresponds to the final
 * decision made for that key.
 *
 * It's recommended to create a specialized `multiDecide` function for each specific type `T` and context `Context`.
 *
 * @example
 * // Example implementation for a specific type T and context Context
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
 *
 * @note
 * It's important to remember that due to the limitations of TypeScript's type system, creating a universally
 * type-safe `multiDecide` function is not feasible. Therefore, a specialized function for each type and context is advised.
 */
export const multiDecide = undefined as never;

/**
 * Creates a conditional Decider that returns the `effect` if the `predicate` function returns true.
 * Optionally, an `otherwise` effect can be specified that will be returned if the predicate is false.
 *
 * @param {Function} predicate Function to evaluate the condition.
 * @param {Decider} effect Effect to execute if predicate is true.
 * @param {Decider} [otherwise] Optional effect to execute if predicate is false.
 * @returns {Decider} A new Decider based on the condition.
 */
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

/**
 * Creates a probabilistic Decider that has a `chance` of returning the `effect`.
 * An optional `otherwise` effect can be specified to be returned when the condition is not met.
 *
 * @param {number} chance Probability (0-1) for the effect to be executed.
 * @param {Decider} effect Effect to execute based on the chance.
 * @param {Decider} [otherwise] Optional effect to execute if chance condition is not met.
 * @returns {Decider} A new probabilistic Decider.
 */
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

/**
 * Randomly selects one Decider from an array of choices.
 *
 * @param {...Decider[]} choices Array of Deciders to choose from.
 * @returns {Decider} A Decider that randomly selects from the provided choices.
 */
export function choose<T, Context>(...choices: Decider<T, Context>[]): Decider<T, Context> {
  return _ => choices[Math.floor(Math.random() * choices.length)];
}

interface WeightedRandomEntry<T, Context> {
  effect: Decider<T, Context>;
  weight: number;
}
/**
 * Chooses a Decider from an array of weighted options.
 * Each option is an object with an `effect` and a `weight`.
 *
 * @param {...WeightedRandomEntry} entries Array of entries containing an effect and its weight.
 * @returns {Decider} A Decider that chooses based on the weights provided.
 */
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

/**
 * Creates a Decider that cycles through an array of choices sequentially.
 *
 * @param {...Decider[]} choices Array of Deciders to cycle through.
 * @returns {Decider} A new cyclic Decider.
 */
export function cycle<T, Context>(...choices: Decider<T, Context>[]): Decider<T, Context> {
  let index = 0;
  return _ => {
    const choice = choices[index];
    index = (index + 1) % choices.length;
    return choice;
  };
}

/**
 * Creates a Decider that resolves multiple Deciders and returns their results as an array.
 * Optionally filters out `undefined` results.
 *
 * @param {Decider[]} effect Array of Deciders to resolve.
 * @param {boolean} filterUndefined Whether to filter out undefined values.
 * @returns {Decider} A new Decider that returns an array of resolved values.
 */
export function multiple<T, Context>(effect: Decider<T, Context>[], filterUndefined: true): Decider<T[], Context>;
export function multiple<T, Context>(
  effect: Decider<T, Context>[],
  filterUndefined: false
): Decider<Maybe<T>[], Context>;
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

/**
 * Creates a Decider that returns a random number within a given range.
 * Optionally, a distribution function can be provided.
 *
 * @param {number} min Minimum value of the range.
 * @param {number} max Maximum value of the range.
 * @param {Decider} [distribution] Optional distribution function.
 * @returns {Decider} A new Decider that returns a number within the range.
 */
export function range(min: number, max: number, distribution: Decider<number> = Math.random): Decider<number> {
  return _ => decide(distribution, undefined) * (max - min) + min;
}

/**
 * Creates a Decider that returns a fallback value if the original Decider resolves to `undefined`.
 *
 * @param {Decider} decider The original Decider.
 * @param {T} fallback The fallback value.
 * @returns {Decider} A new Decider with a fallback.
 */
export function fallback<T>(decider: Decider<Maybe<T>>, fallback: T): Decider<T> {
  return context => decide(decider, context) ?? fallback;
}

/**
 * Creates a Decider that resolves a Promise within a specified duration or returns a fallback value.
 *
 * @param {Decider} decider The original Promise-based Decider.
 * @param {number} duration The duration to wait before timing out.
 * @param {T} fallback The fallback value.
 * @returns {Decider} A new Decider that times out.
 */
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

/**
 * Creates a Decider that proxies its result through a function.
 *
 * @param {Decider} decider The original Decider.
 * @param {Function} proxy The function to proxy the result through.
 * @returns {Decider} A new Decider that proxies its result.
 */
export function proxy<T, Context>(decider: Decider<T, Context>, proxy: (result: T) => void): Decider<T, Context> {
  return context => {
    const result = decide(decider, context);
    proxy(result);
    return result;
  };
}
