// a battle directly between two codemon
import Input from "https://deno.land/x/input/index.ts";
import Codemon from "./codemon.ts";
import C from "../base/index.ts";

async function sleep(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export function wildBattle(left: Codemon, right: Codemon) {
  console.log(`Playing battle between ${left.name} and ${right.name}`);
  console.log(left.toString());
  console.log(right.toString());

  // TODO: consider move priority
  while (left.stats.hp.current > 0 && right.stats.hp.current > 0) {
    // determine the faster mon
    const leftSpeed = left.stats.speed.value(true);
    const rightSpeed = right.stats.speed.value(true);
    let first = left,
      second = right;
    if (leftSpeed < rightSpeed) {
      first = right;
      second = left;
    }

    console.log(`${first.name} will go first, then ${second.name}`);

    // have both use moves (for now just the first move in the array)
    console.log(first.toString());
    attack(first, second);
    console.log(second.toString());
    attack(second, first);
  }

  let winner = left;
  if (right.stats.hp.current > 0) winner = right;

  console.log(`${winner.name} won!`);
}

export function attack(attacker: Codemon, target: Codemon) {
  if (attacker.stats.hp.current <= 0) return;

  const usage = attacker.moves[0].Use(target, false);
  console.log(`${attacker.name} used ${usage.info.name}!`);
  const hit = target.RecieveMove(usage);
  console.log(`It did ${hit.damage} damage!`);
}
