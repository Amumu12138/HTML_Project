
let arr = ["a", "a", "b", "c", "d", "a", "a"];
// for (let i = 0; i < arr.length; i++) {
//     if (arr[i] === "a") {
//         arr.splice(i, 1);
//         i = -1;
//     }
// }

while (arr.indexOf("a") !== -1) {
    for (let item of arr) {
        if (item === "a") {
            arr.splice(arr.indexOf(item), 1);
        }
    }
}

console.log(arr);