import { Ability } from "../mod.ts";
import loader from "../loader.ts";

export const Aerilate: Ability = loader.register(P => ({
  name: "Aerilate",
  description: "Normal-type moves become Flying-type moves.",
  slot: "ability",

  apply: () => {
    return {
      name: Aerilate.name,
      activate: () => {},
      deactivate: () => {},
      expiry: () => {},
    };
  },
}));
