function getValue(num) {
    return num * 2
}

// function foo(a, b = getValue(a)) {
//     console.log(a, b);

// }

// foo(1) // 1 2
// foo(2) // 2 4

function bar(a = getValue(b), b) {
    console.log(a, b);

}

bar(undefined, 1) // error Cannot access 'b' before initialization
bar(undefined, 2) // error Cannot access 'b' before initialization