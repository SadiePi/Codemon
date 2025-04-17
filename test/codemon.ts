import { assert, AssertionError, iBulby } from "./_common.ts";
import P, { spawn } from "../codex/pokemon/mod.ts";

Deno.test("Basics", () => {
  const bulby = spawn(iBulby);

  assert(bulby.getSpecies(false) === P.Species.Bulbasaur);
  assert(bulby.name, "Bulby");
  assert(bulby.gender === P.Genders.Male);
  assert(bulby.nature === P.Natures.Quiet);
  assert(bulby.stats.level === 15);
  // TODO compare stats to expected values
  assert(bulby.moves.entries.length === 4);
  assert(bulby.moves.knows(P.Moves.Tackle));
  assert(bulby.moves.knows(P.Moves.RazorLeaf));
  assert(bulby.moves.knows(P.Moves.StunSpore));
  assert(bulby.moves.knows(P.Moves.SolarBeam));
  assert(bulby.ability === P.Abilities.Overgrow);
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

  bulby.mutate({ types: [P.Types.Ghost, P.Types.Fire] });
  species = bulby.getSpecies();
  assert(species.types[0] === P.Types.Ghost);
  assert(species.types[1] === P.Types.Fire);
  assert(species.name === "Mutated Bulbasaur");

  bulby.mutate({ name: "Mutation Test Bulbasaur" });
  species = bulby.getSpecies();
  assert(species.name === "Mutation Test Bulbasaur");
  assert(species.description === "Mutation test");

  const originalSpecies = bulby.getSpecies(false);
  assert(originalSpecies.name === "Bulbasaur");
  assert(originalSpecies.description !== "Mutation test");
  assert(originalSpecies.types[0] === P.Types.Grass);
  assert(originalSpecies.types[1] === P.Types.Poison);

  bulby.setSpecies(P.Species.Ivysaur); // should retain mutations
  species = bulby.getSpecies();
  assert(species.name === "Mutation Test Bulbasaur");
  assert(species.description === "Mutation test");
  assert(species.types[0] === P.Types.Ghost);
  assert(species.types[1] === P.Types.Fire);

  bulby.setSpecies(P.Species.Bulbasaur, false); // should reset mutations
  species = bulby.getSpecies();
  assert(species.name === "Bulbasaur");
  assert(species.description !== "Mutation test");
  assert(species.types[0] === P.Types.Grass);
  assert(species.types[1] === P.Types.Poison);
});

Deno.test("Moves", () => {
  throw new AssertionError("Test not implemented");
});

Deno.test("Abilities", () => {
  const bulby = spawn(iBulby);
  assert(bulby.ability === P.Abilities.Overgrow);
  assert(bulby.originalAbility === P.Abilities.Overgrow);

  // TODO use a species with multiple abilities

  bulby.ability = "hidden";
  assert(bulby.ability === P.Abilities.Chlorophyll);
  assert(bulby.originalAbility === P.Abilities.Overgrow);

  bulby.ability = P.Abilities.Adaptability;
  assert(bulby.ability === P.Abilities.Adaptability);
  assert(bulby.originalAbility === P.Abilities.Overgrow);

  bulby.originalAbility = P.Abilities.Aerilate;
  assert(bulby.ability === P.Abilities.Adaptability);
  assert(bulby.originalAbility === P.Abilities.Aerilate);

  bulby.resetAbility();
  assert(bulby.ability === P.Abilities.Aerilate);

  bulby.ability = 0;
  assert(bulby.ability === P.Abilities.Overgrow);
  assert(bulby.originalAbility === P.Abilities.Aerilate);
});

Deno.test("Natures", () => {
  throw new AssertionError("Test not implemented");
});

Deno.test("Names", () => {
  throw new AssertionError("Test not implemented");
});

Deno.test("Gender", () => {
  throw new AssertionError("Test not implemented");
});

Deno.test("Evolutions", () => {
  throw new AssertionError("Test not implemented");
});
