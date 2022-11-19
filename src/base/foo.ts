function foo<T>(x: T): T {
    return x;
}

function bar<T>(...args: Parameters<typeof foo<T>>): T {
    return foo(...args);
}

bar<string>("hello"); //?