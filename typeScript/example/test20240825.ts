function* gen() {
    yield Promise.resolve('123');
}

const man = gen();
console.log(man.next());