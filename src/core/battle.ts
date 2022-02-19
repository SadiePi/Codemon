// a battle directly between two codemon
import Input from "https://deno.land/x/input/index.ts";
import Codemon from "./codemon.ts";
import C from "../base/index.ts";

async function sleep(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export class WildBattle {
  constructor(public left: Codemon, public right: Codemon) {}
  public async play() {
    console.log("Playing battle:", this);
    await sleep(5000);
  }
}
