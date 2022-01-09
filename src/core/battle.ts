// a battle directly between two codemon
import Input from "https://deno.land/x/input/index.ts";
import Codemon from "./codemon.ts";
import C from "../base/index.ts";

async function sleep(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

class WildBattle {
  constructor(public left: Codemon, public right: Codemon) {}
  public async play() {
    console.log("Playing battle:", this);
    await sleep(5000);
  }
}

Deno.test({
  name: "WildBattle",
  fn: async () => {
    const bulby = new Codemon({ species: C.Species.Bulbasaur });
    const chompy = new Codemon({ species: C.Species.Garchomp });
    await new WildBattle(bulby, chompy).play();
  },
});
