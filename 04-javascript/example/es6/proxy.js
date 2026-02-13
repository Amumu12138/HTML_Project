const origin = {};
const obj = new Proxy(origin, {
    get: function (target, propkey, receiver) {
        return '10'
    },
    set: function (value) {

    }
})

obj.a
console.log('a -->', obj.a)
console.log('b -->', obj.b)
