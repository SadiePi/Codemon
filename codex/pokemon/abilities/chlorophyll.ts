import P, { Ability, permanent } from "../mod.ts";
import loader from "../loader.ts";

export const Chlorophyll: Ability = {
  name: "Chlorophyll",
  description: "Boosts the Pokémon's Speed stat in harsh sunlight.",
  slot: "ability",

  apply: () => {
    return {
      name: Chlorophyll.name,
      activate: () => {},
      deactivate: () => {},
      expiry: permanent,
    };
  },
};
