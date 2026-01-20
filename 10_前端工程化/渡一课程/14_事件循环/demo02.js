function a() {
    console.log(1);
    Promise.resolve().then(function () {
        console.log(2);
    })
}

setTimeout(function () {
    console.log(3);
}, 0)

Promise.resolve().then(a)

console.log(5);

// 5 1 2 3
// 渲染主线程: 5
// 微队列: fa{1, promise(2)}
// 延时队列 fn3 
// 交互队列
