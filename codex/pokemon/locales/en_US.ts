import { fmt } from "../../../src/external.ts"; // TODO ugh
import { Locale, config } from "../mod.ts";

export const en_US: Locale = {
  name: "en_US",

  battle: {
    traditional: {
      plan: {
        failed: "But it failed!",
      },
      join: ({ combatant }) => `${combatant.name} joined the battle!`,
      weather: ({ weather }) => `Applied weather: ${weather.name}`,
      terrain: ({ terrain }) => `Applied terrain: ${terrain.name}`,
      end: "The battle should end here, but WIP",
    },
  },

  codemon: {
    traditional: {
      attack: {
        effectiveness: ({ typeEffectiveness }) => {
          if (typeEffectiveness === 0) return `It's ${fmt.red("ineffective!")}`;
          if (typeEffectiveness < 1) return `It's ${fmt.yellow("not very effective...")}`;
          if (typeEffectiveness === 1) return [];
          return `It's ${fmt.green("super effective!")}`;
        },
        damage: ({ context: { target }, total }) => {
          const messages = [`${target.name} took ${fmt.red(total + "")} damage!`];

          if (target.stats.hp.fainted) {
            messages.push(fmt.red(`${target.name} fainted!`));
          } else {
            const hpPercent = target.stats.hp.percent;
            let color = fmt.blue;
            if (hpPercent < 0.9) color = fmt.green;
            else if (hpPercent < 0.5) color = fmt.yellow;
            else if (hpPercent < 0.2) color = fmt.red;

            messages.push(`${target.name} has ${color(target.stats.hp.current + "")}/${target.stats.hp.max} HP left!`);
          }

          return messages;
        },
      },
      status: {
        apply: ({ entry, context: { target } }) => `Applied Status ${entry.status.name} to ${target.name}`,
      },

      hp: ({ context: { target }, difference }) => {
        const messages = [];
        if (difference > 0) messages.push(`${target.name} healed ${fmt.green(difference + "")} HP!`);
        else if (difference < 0) messages.push(`${target.name} took ${fmt.red(-difference + "")} direct damage!`);
        else messages.push(`${target.name} didn't feel any different!`);

        const faint = target.stats.hp.current <= 0;
        if (faint) messages.push(fmt.red(`${target.name} fainted!`));

        return messages;
      },

      stages: ({ context: { target }, stages }) => `${target.name} recieved stages ${JSON.stringify(stages)}!`, // TODO better output

      faint: ({ context: { target } }) => fmt.red(`${target.name} fainted!`),

      ball: {
        miss: "(miss)",
        blocked: "(blocked)",
        immediate: ({ context: { target } }) => `Gotcha! ${target.name} was caught immediately!`,
        caught: ({ context: { target } }) => `Gotcha! ${target.name} was caught!`,
        escape: ({ check }) => {
          const leftover = config.battle.traditional.shakeChecks - check;
          if (leftover > 3) return `Oh no! The ${config.branding.mon} broke free!`;
          if (leftover === 3) return "Aww! It appeared to be caught!";
          if (leftover === 2) return "Aargh! Almost had it!";
          if (leftover === 1) return "Gah! It was so close, too!";
          return `Wait, what? How did that happen!? ${bug_notif}`;
        },
      },
      reward: ({ context: { target }, reward }) => {
        if (reward.money) {
          if (reward.money > 0) return `Money was scattered on the ground near ${target.name}!`;
          if (reward.money < 0) return `Money was taken from ${target.name}!`;
        }
        if (reward.EVs) return `${target.name} got more powerful!`;
        return [];
      },
      eject: ({ context: { target } }) => `${target.name} was ejected from the battle!`,
      disable: ({ context: { target }, move }) => `${target.name} can no longer use ${move.effects.name}!`,
    },
  },

  move: {
    use: ({ move }) => `${move.user.name} used ${move.effects.name}!`,
  },
};

const bug_notif = "(This is a bug! Tell me about it at https://github.com/SadiePi/Codemon)";
