The following are easy to add, change, and remove:
- Abilities
- Experience Groups
- Genders
- Items
- Locales
- Moves
- Natures
- Species
- Statuses
- Trainers
- Types
- Weathers

To add or remove any of these, open the `arceus` file in the corresponding folder in this directory, and add or remove entries. When satisfied, run `src/core/arceus.ts` to create placeholder files where necessary with the appropriate names, types, exports and boilerplate code, and also update the corresponding `index.ts` files to export new entries and ignore (but not delete) removed ones.



The following are supported but require more work:
- Battle Types
- Stats
  - Open `src/core/stats.ts` and add or remove entries to either the `PermanentStats` or `BattleStats` arrays. Strict typing used throughout this project will then create type errors that point you to other places you need to change. Those changes are straightforward, so I won't go into detail here.