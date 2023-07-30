// 父亲类
class Father {
    constructor(uname) {
        this.name = uname;
    }

    say(content) {
        console.log("Father say content -->", content);
    }
}

class Son extends Father {
    constructor(uname) {
        super(uname);
    }
    say(content2) {
        console.log("Son say content2  -->", content2);
        console.log(super.say(content2));
    }
}

let a = new Father("Amumu121380");
let b = new Son("Amumu12139");
console.log(a.name, b.name);
a.say("a 欢迎来到德莱联盟");
b.say("b 均衡, 存乎万物之间");