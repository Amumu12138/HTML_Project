// 观察某个对象的所有属性
function observe(obj) {
    for (const key in obj) {
        console.log(key, 'key');
        let intervalValue = obj[key]
        const funcs = new Set()
        Object.defineProperty(obj, key, {
            get() {
                console.log(obj, 'get called');
                // 依赖收集 记录:是哪个函数在用我
                if (window.__func) {
                    funcs.add(window.__func)
                }
                console.log(funcs, 'get funcs');

                return intervalValue
            },
            set(val) {
                console.log(obj, val, 'set called');
                intervalValue = val;
                // 派发更新 运行: 执行用我的函数
                console.log(funcs, 'set funcs');
                for (const func of funcs) {
                    func?.()
                }
            }
        })
    }
}