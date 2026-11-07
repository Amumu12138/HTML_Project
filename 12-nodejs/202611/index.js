// 引入loadsh 依赖
const _ = require('lodash');

// 使用lodash的chunk方法将数组分割成指定大小的块
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const chunkedArray = _.chunk(array, 3);
console.log('Chunked Array:', chunkedArray);

// 使用lodash的uniq方法去重数组
const duplicateArray = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = _.uniq(duplicateArray);
console.log('Unique Array:', uniqueArray);

// 使用lodash的merge方法合并对象
const object1 = { a: 1, b: { c: 2 } };
const object2 = { b: { d: 3 }, e: 4 };
const mergedObject = _.merge(object1, object2);
console.log('Merged Object:', mergedObject);

// 使用lodash的debounce方法防抖函数
const debounceFunction = _.debounce(() => {
    console.log('Debounced function called');
}, 2000);

// 模拟频繁调用防抖函数
debounceFunction();
debounceFunction();
debounceFunction(); // 只有最后一次调用会在2秒后执行

// 使用lodash的throttle方法节流函数
const throttleFunction = _.throttle(() => {
    console.log('Throttled function called ');
}, 2000);

// 模拟频繁调用节流函数
setInterval(throttleFunction, 500); // 每500ms调用一次，但实际只会每2秒执行一次