import { Ability } from "../mod.ts";
import loader from "../loader.ts";

export const Adaptability: Ability = {
  name: "Adaptability",
  description: "Powers up moves of the same type as the Pokémon.",
  slot: "ability",

  apply: () => {
    return {
      name: Adaptability.name,
      activate: () => {},
      deactivate: () => {},
      expiry: () => {},
    };
  },
};
