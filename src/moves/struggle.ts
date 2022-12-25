import C, { PPScheme } from "../index.ts";
import { moves } from "../core/codex.ts";

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
  public Use(pp = 1): boolean {
    return true;
  }
  public Restore(pp: number): number {
    return 0;
  }
  public CanBoost(): boolean {
    return false;
  }
  public Boost(): number {
    return 0;
  }
}

export const Struggle = moves.register(() => ({
  name: "Struggle",
  description: "This attack is used in desperation only if the user has no PP. It also damages the user a little.",
  type: C.Types.Normal,
  category: "Physical",
  target: "Any Adjacent",
  pp: StrugglePPScheme,
  power: 50,
  makesContact: true,
  // recoil: {  },
}));
// TODO struggle (pp scheme and recoil)
