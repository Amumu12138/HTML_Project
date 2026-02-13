// Promise Aplus 测试
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
// 定义异步函数
const runAsyncTask = (callback) => {
    if (typeof queueMicrotask === 'function') {
        queueMicrotask(() => {
            callback()
        });
    } else {
        setTimeout(callback, 0)
    }
}

// 抽取处理返回值函数
const resolvePromise = (retData, newPromise, { resolve, reject }) => {
    // 处理重复引用
    if (retData === newPromise) {
        throw new TypeError('Chaining cycle detected for promise #<HMPromise>')
    }
    // 处理Promise返回
    if (retData instanceof HMPromise) {
        retData.then(res => resolve(res), err => reject(err))
    } else {
        resolve(retData)
    }

}
// 定义HMPromise类
class HMPromise {
    // 添加状态
    state = PENDING
    // 添加原因
    result = undefined
    // 定义私有实例属性
    #handlres = []
    // 添加构造函数
    constructor(func) {
        // 定义resolve/reject
        const resolve = (result) => {
            // 实现状态不可逆
            if (this.state !== PENDING) {
                return
            }
            // 修改状态、原因
            this.state = FULFILLED
            this.result = result
            // 调用成功回调方法
            this.#handlres.forEach(({ successBack }) => {
                successBack(this.result)
            })
        }


        const reject = (result) => {
            if (this.state !== PENDING) {
                return
            }

            this.state = REJECTED
            this.result = result

            this.#handlres.forEach(({ failedBack }) => {
                failedBack(this.result)
            })
        }

        try {
            // 传入resolve、reject函数
            func(resolve, reject)
        } catch (err) {
            reject(err)
        }

    }

    // 执行成功/失败回调
    then(onFulfilled, onRejected) {
        const funStr = 'function';
        onFulfilled = typeof onFulfilled === funStr ? onFulfilled : x => x;
        onRejected = typeof onRejected === funStr ? onRejected : x => { throw x };

        // 返回新的Promise实例
        const newPromise = new HMPromise((resolve, reject) => {
            // 参数判断 
            if (this.state === FULFILLED) {
                // 执行成功回调方法
                runAsyncTask(() => {

                    try {
                        const fulfilledData = onFulfilled(this.result);
                        resolvePromise(fulfilledData, newPromise, { resolve, reject })

                    } catch (err) {
                        reject(err)
                    }
                });
            } else if (this.state === REJECTED) {
                // 执行失败回调方法
                runAsyncTask(() => {
                    try {
                        const rejectData = onRejected(this.result)

                        resolvePromise(rejectData, newPromise, { resolve, reject })

                    } catch (err) {
                        reject(err)
                    }

                })
            } else {
                // 保存回调函数
                const handlerObj = {
                    successBack: () => {
                        runAsyncTask(() => {
                            try {
                                const rejectData = onFulfilled(this.result)
                                resolvePromise(rejectData, newPromise, { resolve, reject })
                            } catch (err) {
                                reject(err)
                            }
                        })
                    },
                    failedBack: () => {
                        runAsyncTask(() => {
                            try {
                                const rejectData = onRejected(this.result)
                                resolvePromise(rejectData, newPromise, { resolve, reject })

                            } catch (err) {
                                reject(err)
                            }
                        })
                    }
                }
                this.#handlres.push(handlerObj)
            }
        })

        return newPromise;
    }


    // 捕获异常
    catch(onRejected) {
        // 内部调用then方法
        this.then(undefined, onRejected)
    }

    // 最终兜底
    finally(onFinally) {

        return this.then(onFinally, onFinally)
    }

    // 静态方法-resolve
    static resolve(value) {
        // 1、判断传入值 如果是Promise直接返回,若不是则转为Promise并返回
        if (value instanceof HMPromise) {
            return value
        }

        return new HMPromise((resolve) => {
            resolve(value);
        })
    }

    // 静态方法-reject
    static reject(value) {
        // 1、判断传入值 如果是Promise直接返回,若不是则转为Promise并返回
        if (value instanceof HMPromise) {
            return value
        }

        return new HMPromise((undefined, reject) => {
            reject(value);
        })
    }

    // race 返回最先完成（无论成功或失败）的 Promise 的结果
    static race(promises) {
        return new HMPromise((resolve, reject) => {
            if (!Array.isArray(promises)) {
                return reject(new TypeError('promises not is array'))
            }

            promises.forEach(p => {
                HMPromise.resolve(p).then(res => resolve(res), err => reject(err))
            })
        })
    }

    // 等待所有 Promise 完成，或任意一个 Promise 失败
    static all(promises) {
        return new HMPromise((resolve, reject) => {
            if (!Array.isArray(promises)) {
                return reject(new TypeError('promises not is array'))
            }

            // 空数组直接兑现
            promises.length === 0 && resolve(promises)

            const results = [];
            let count = 0;
            promises.forEach((p, index) => {

                HMPromise.resolve(p).then(res => {

                    // 记录结果,判断全部兑现,抛出结果,通过索引来记录,保证结果的顺序和Promise数组顺序一致
                    results[index] = res;
                    count++
                    // 通过兑现的次数进行判断,保证可以获取到所有的结果
                    count === promises.length && resolve(results)
                }, err => {
                    // 处理第一个拒绝
                    reject(err)
                })
            })
        })
    }


    //将一个 Promise 可迭代对象作为输入，并返回一个单独的 Promise。当所有输入的 Promise 都已敲定时（包括传入空的可迭代对象时），返回的 Promise 将被兑现，并带有描述每个 Promise 结果的对象数组。
    static allSettled(promises) {
        return new HMPromise((resolve, reject) => {
            if (!Array.isArray(promises)) {
                return reject(new TypeError('promises not is array'))
            }

            // 空数组直接兑现
            promises.length === 0 && resolve(promises)

            const results = [];
            let count = 0;
            promises.forEach((p, index) => {
                HMPromise.resolve(p).then(res => {

                    // 保证结果的顺序和Promise数组顺序一致 处理兑现{status: 'fulfilled', value: ''}
                    results[index] = { status: FULFILLED, value: res };
                    count++
                    // 通过兑现的次数进行判断,保证可以获取到所有的结果
                    count === promises.length && resolve(results)
                }, err => {
                    // 处理拒绝 {status: 'rejected', reason: ''}
                    results[index] = { status: REJECTED, reason: err };
                    count++
                    count === promises.length && resolve(results)
                })
            })
        })
    }

    //将一个 Promise 可迭代对象作为输入，并返回一个 Promise。当输入的任何一个 Promise 兑现时，这个返回的 Promise 将会兑现，并返回第一个兑现的值。当所有输入 Promise 都被拒绝（包括传递了空的可迭代对象）时，它会以一个包含拒绝原因数组的 AggregateError 拒绝
    static any(promises) {
        const ERROR_MESSAGE = 'ALL promises were rejected'
        return new HMPromise((resolve, reject) => {
            if (!Array.isArray(promises)) {
                return reject(new TypeError('promises not is array'))
            }

            // 空数组直接拒绝
            promises.length === 0 && reject(new AggregateError(promises, ERROR_MESSAGE))

            const errors = [];
            let count = 0;
            promises.forEach((p, index) => {

                HMPromise.resolve(p).then(res => {

                    // 第一个兑现
                    resolve(res)
                }, err => {
                    // 处理全部拒绝
                    errors[index] = err;
                    count++
                    count === promises.length && reject(new AggregateError(errors, ERROR_MESSAGE))

                })
            })
        })
    }
}


// 使用CommonJS模块化语法暴露
module.exports = {
    deferred() {
        const res = {};
        res.promise = new HMPromise((resolve, reject) => {
            res.resolve = resolve;
            res.reject = reject;
        })

        return res;
    }
}

console.log('deferred', module.exports.deferred())
// 
//   resolve: [Function: resolve],
//   reject: [Function: reject],
//   promise: HMPromise { state: 'pending', result: undefined }
// }