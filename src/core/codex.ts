class CodexBuilder {
  private readonly builders: [Record<string, unknown>, () => Record<string, unknown>][] = [];
  private readonly afterBuilds: (() => void)[] = [];
  private built = false;

  public register<R extends Record<string, unknown>>(builder: () => R, afterBuild?: () => void): R {
    if (this.built) throw new Error("Codex already built");

    const placeholder = {} as R;

    this.builders.push([placeholder, builder]);
    if (afterBuild) this.afterBuilds.push(afterBuild);

    return placeholder;
  }

  public build() {
    if (this.built) throw new Error("Codex already built");
    this.built = true;
    this.builders.map(b => Object.assign(b[0], b[1]()));
    this.afterBuilds.map(f => f());
  }
}

export default new CodexBuilder();
