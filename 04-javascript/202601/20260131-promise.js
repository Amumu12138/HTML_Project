const STATUS = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
}

class MyPromise {
    constructor(executor) {
        this.status = STATUS.PENDING
        this.value = undefined
        this.reason = undefined

        const resolve = (value) => {
            if (this.status === STATUS.PENDING) {
                this.status = STATUS.FULFILLED
                this.value = value
            }
        }

        const reject = (reason) => {
            if (this.status === STATUS.PENDING) {
                this.status = STATUS.REJECTED
                this.reason = reason
            }
        }

        return executor(resolve, reject)
    }

    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, rejected) => {
            if (this.status === STATUS.FULFILLED) {
                onFulfilled(this.value)
            }

            if (this.status === STATUS.REJECTED) {
                onRejected(this.reason)
            }
        })
    }
}

const p = new MyPromise((resolve, reject) => {
    // resolve(1)
    reject('error')
});

p.then(res => {
    console.log(res, 'res');
}, err => {
    console.log(err, 'err');
})