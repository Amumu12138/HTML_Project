var i = 128;
console.log(~i + 1); // 取补码

var j = i & (~i + 1); // 取i最右边的1
console.log(j);

var arr = [1, 2, 3, 4, 12, 8, 6, 7];
arr.sort((a, b) => b - a);  // 系统默认排序
console.log('arr ->', arr);