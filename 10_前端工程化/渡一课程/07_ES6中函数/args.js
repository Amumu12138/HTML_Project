function printSum(...args) {
    return args.reduce((pre, next) => pre + next, 0)
}

console.log(printSum(1, 2, 4)); // 7
