import C, { power, PPScheme, Move } from "../index.ts";
import dexBuilder from "../core/codex.ts";

// TODO this suddenly feels cumbersome...
class StrugglePPScheme extends PPScheme {
  constructor() {
    super(1);
  }
  public get current(): number {
    return 1;
  }
  public get max(): number {
    return 1;
  }
  public get boosts(): number {
    return 0;
  }
  public use(): boolean {
    return true;
  }
  public restore(): number {
    return 0;
  }
  public canBoost(): boolean {
    return false;
  }
  public boost(): number {
    return 0;
  }
}

export const Struggle: Move = dexBuilder.register<Move>(() => ({
  name: "Struggle",
  description: "This attack is used in desperation only if the user has no PP. It also damages the user a little.",
  type: C.Types.Normal,
  category: "Physical",
  target: "Any Adjacent",
  pp: StrugglePPScheme,
  attack: power(50),
  makesContact: true,
  // recoil: {  },
}));
// TODO struggle (pp scheme and recoil)
