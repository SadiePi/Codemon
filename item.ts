interface Item {
    name: string;
    description: string;
    //graphics: Graphics
}

//deno-lint-ignore no-empty-interface
interface Ball extends Item {
    //catchRate: (battle, target, source) => number;
}