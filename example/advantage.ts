import P, { Type } from "../codex/pokemon/mod.ts";
import { rgb24 } from "https://deno.land/std@0.182.0/fmt/colors.ts";

Deno.test("Find Best Type Advantages", () => {
  const cartesianProduct = <T, U>(array1: T[], array2: U[]): [T, U][] =>
    array1.flatMap(a1 => array2.map(a2 => [a1, a2] as [T, U]));

  function getTypeAdvantage(attacking: Type, defending: Type): number {
    if (defending.immunities.includes(attacking)) return 0;
    if (defending.resistances.includes(attacking)) return 0.5;
    if (defending.weaknesses.includes(attacking)) return 2;
    return 1;
  }

  const getPairAdvantage = (attackingPair: [Type, Type], defendingPair: [Type, Type]) =>
    cartesianProduct(attackingPair, defendingPair)
      .map(([attackingType, defendingType]) => getTypeAdvantage(attackingType, defendingType))
      .reduce((p, c) => p * c);

  const getTotalPairAdvantage = (pair: [Type, Type], against: [Type, Type][]) =>
    against
      .map(defendingPair => getPairAdvantage(pair, defendingPair) - getPairAdvantage(defendingPair, pair))
      .reduce((p, c) => p + c);

  const NoneType: Type = { name: "None", immunities: [], resistances: [], weaknesses: [], color: 0x000000 };

  const types = [...Object.values(P.Types), NoneType];
  const typePairings = cartesianProduct(types, types).filter(([t1, t2]) => t1.name < t2.name);

  const effectivenesses = typePairings.map(attackingPair => ({
    pair: attackingPair,
    effectiveness: getTotalPairAdvantage(attackingPair, typePairings),
  }));

  effectivenesses.sort((a, b) => b.effectiveness - a.effectiveness);

  effectivenesses.forEach(({ pair: [type1, type2], effectiveness }) =>
    console.log(`${rgb24(type1.name, type1.color)}/${rgb24(type2.name, type2.color)}: ${effectiveness}`)
  );
});
