export default class CodexBuilder<Codex> {
  private readonly builders: [Record<string, unknown>, (codex: Codex) => Record<string, unknown>][] = [];
  private readonly afterBuilds: ((codex: Codex) => void)[] = [];
  private built = false;

  public register<R extends Record<string, unknown>>(
    builder: (codex: Codex) => R,
    afterBuild?: (codex: Codex) => void
  ): R {
    if (this.built) throw new Error("Codex already built");

    const placeholder = {} as R;

    this.builders.push([placeholder, builder]);
    if (afterBuild) this.afterBuilds.push(afterBuild);

    return placeholder;
  }

  public build(codex: Codex) {
    if (this.built) throw new Error("Don't call CodexBuilder.build() twice");
    this.built = true;
    this.builders.map(b => Object.assign(b[0], b[1](codex)));
    this.afterBuilds.map(f => f(codex));
  }
}

// TODO use?
type DeepMap<T, U> = T extends Record<string, unknown> ? { [K in keyof T]: DeepMap<T[K], U> } : U;
export type DiscoveryMap<Codex> = DeepMap<Codex, boolean>;
