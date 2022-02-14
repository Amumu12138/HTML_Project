var i = 128;
console.log(~i + 1); // 取补码

var j = i & (~i + 1); // 取i最右边的1
console.log(j);