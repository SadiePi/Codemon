import { assert, iBulby } from "./common.ts";
import { spawn } from "../src/mod.ts";
import C from "../codex/pokemon/mod.ts";

Deno.test("Basics", () => {
  const bulby = spawn(iBulby);
  console.log("Spawned Bulby");

  assert(bulby.getSpecies(false) === C.Species.Bulbasaur);
  console.log("Species is Bulbasaur");
  assert(bulby.name, "Bulby");
  console.log("Name is Bulby");
  assert(bulby.gender === C.Genders.Male);
  console.log("Gender is Male");
  assert(bulby.nature === C.Natures.Quiet);
  console.log("Nature is Quiet");
  assert(bulby.stats.level === 15);
  console.log("Level is 15");
  // TODO compare stats to expected values
  assert(bulby.moves.length === 4);
  console.log("Moves length is 4");
  assert(bulby.moves[0].effects === C.Moves.Tackle);
  console.log("Move 1 is Tackle");
  assert(bulby.moves[1].effects === C.Moves.RazorLeaf);
  console.log("Move 2 is Razor Leaf");
  assert(bulby.moves[2].effects === C.Moves.StunSpore);
  console.log("Move 3 is Stun Spore");
  assert(bulby.moves[3].effects === C.Moves.SolarBeam);
  console.log("Move 4 is Solar Beam");
  assert(bulby.ability === C.Abilities.Overgrow);
  console.log("Ability is Overgrow");
});

// Vaguely in the same order as the class's code
Deno.test("Species", () => {});
Deno.test("Moves", () => {});
Deno.test("Stats", () => {});
Deno.test("Abilities", () => {});
Deno.test("Natures", () => {});
Deno.test("Names", () => {});
Deno.test("Gender", () => {});
Deno.test("Evolutions", () => {});
