import { assert, iBulby } from "./common.ts";
import { spawn } from "../src/mod.ts";
import C from "../codex/pokemon/mod.ts";

Deno.test("Basics", () => {
  const bulby = spawn(iBulby);

  assert(bulby.getSpecies(false) === C.Species.Bulbasaur);
  assert(bulby.name, "Bulby");
  assert(bulby.gender === C.Genders.Male);
  assert(bulby.nature === C.Natures.Quiet);
  assert(bulby.stats.level === 15);
  // TODO compare stats to expected values
  assert(bulby.moves.length === 4);
  assert(bulby.moves[0].effects === C.Moves.Tackle);
  assert(bulby.moves[1].effects === C.Moves.RazorLeaf);
  assert(bulby.moves[2].effects === C.Moves.StunSpore);
  assert(bulby.moves[3].effects === C.Moves.SolarBeam);
  assert(bulby.ability === C.Abilities.Overgrow);
});

// Vaguely in the same order as the class's code
Deno.test("Species", () => {
  const bulby = spawn(iBulby);
  let species = bulby.getSpecies();
  assert(species.name === "Bulbasaur");

  bulby.mutate({ description: "Mutation test" });
  species = bulby.getSpecies();
  assert(species.description === "Mutation test");
  assert(species.name === "Mutated Bulbasaur");

  bulby.mutate({ types: [C.Types.Ghost, C.Types.Fire] });
  species = bulby.getSpecies();
  assert(species.types[0] === C.Types.Ghost);
  assert(species.types[1] === C.Types.Fire);
  assert(species.name === "Mutated Bulbasaur");

  bulby.mutate({ name: "Mutation Test Bulbasaur" });
  species = bulby.getSpecies();
  assert(species.name === "Mutation Test Bulbasaur");
  assert(species.description === "Mutation test");

  const originalSpecies = bulby.getSpecies(false);
  assert(originalSpecies.name === "Bulbasaur");
  assert(originalSpecies.description !== "Mutation test");
  assert(originalSpecies.types[0] === C.Types.Grass);
  assert(originalSpecies.types[1] === C.Types.Poison);

  bulby.setSpecies(C.Species.Ivysaur); // should retain mutations
  species = bulby.getSpecies();
  assert(species.name === "Mutation Test Bulbasaur");
  assert(species.description === "Mutation test");
  assert(species.types[0] === C.Types.Ghost);
  assert(species.types[1] === C.Types.Fire);

  bulby.setSpecies(C.Species.Bulbasaur, false); // should reset mutations
  species = bulby.getSpecies();
  assert(species.name === "Bulbasaur");
  assert(species.description !== "Mutation test");
  assert(species.types[0] === C.Types.Grass);
  assert(species.types[1] === C.Types.Poison);
});
Deno.test("Moves", () => {});
Deno.test("Stats", () => {});
Deno.test("Abilities", () => {
  const bulby = spawn(iBulby);
  assert(bulby.ability === C.Abilities.Overgrow);
  assert(bulby.originalAbility === C.Abilities.Overgrow);

  // TODO use a species with multiple abilities

  bulby.ability = "hidden";
  assert(bulby.ability === C.Abilities.Chlorophyll);
  assert(bulby.originalAbility === C.Abilities.Overgrow);

  bulby.ability = C.Abilities.Adaptability;
  assert(bulby.ability === C.Abilities.Adaptability);
  assert(bulby.originalAbility === C.Abilities.Overgrow);

  bulby.originalAbility = C.Abilities.Aerilate;
  assert(bulby.ability === C.Abilities.Adaptability);
  assert(bulby.originalAbility === C.Abilities.Aerilate);

  bulby.resetAbility();
  assert(bulby.ability === C.Abilities.Aerilate);

  bulby.ability = 0;
  assert(bulby.ability === C.Abilities.Overgrow);
  assert(bulby.originalAbility === C.Abilities.Aerilate);
});
Deno.test("Natures", () => {});
Deno.test("Names", () => {});
Deno.test("Gender", () => {});
Deno.test("Evolutions", () => {});
