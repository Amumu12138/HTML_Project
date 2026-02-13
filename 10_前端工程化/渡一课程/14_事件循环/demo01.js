function a() {
    console.log(1);
    Promise.resolve().then(function () {
        console.log(2);

    })
}

setTimeout(function () {
    console.log(3);
    Promise.resolve().then(a)
})

Promise.resolve().then(function () {
    console.log(4);
})

console.log(5);
// 5 4 3 1 2
// 渲染主线程: 5
// 微队列: fn4 Promise(a){1 ,Promise(2)}
// 延时队列 fn3 
// 交互队列
