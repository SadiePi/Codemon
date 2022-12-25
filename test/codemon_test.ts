import C, { spawn } from "../src/index.ts";
import { iKibble } from "./common.ts";

Deno.test("chompy", () => {
  const kibble = spawn(iKibble);
  console.log(JSON.stringify(kibble));
  kibble.stats.attack.stage.modify(6);
  console.log(kibble.toString());
  console.log(JSON.stringify(kibble.nature));
});

Deno.test("generic", () => {
  const bulby = spawn({ species: C.Species.Bulbasaur });
  console.log(bulby.toString());
});
