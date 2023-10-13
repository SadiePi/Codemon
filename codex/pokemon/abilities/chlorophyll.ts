import { Ability, permanent } from "../mod.ts";
import loader from "../loader.ts";

export const Chlorophyll: Ability = loader.register(_P => ({
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
}));
