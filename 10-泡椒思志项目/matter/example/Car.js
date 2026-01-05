var Example = Example || {};

/**
 * @desc 制造汽车
 */
Example.Car = function() {
    var Engine = Matter.Engine;
    var Render = Matter.Render;
    var World = Matter.World;
    var Bodies = Matter.Bodies;
    var Composites = Matter.Composites;
    var MouseConstraint = Matter.MouseConstraint;

    var engine = Engine.create();
    var world = engine.world;

    var render = Render.create({
        engine: engine,
        element: document.body,
        options: {
            width: window.innerWidth,
            height:window.innerHeight,
            //线框
            wireframes: false,
            showAngleIndicator: true
        }
    });
    //物理引擎、渲染运行
    Engine.run(engine);
    Render.run(render);

    //创造鼠标约束
    var mouseConstraint = MouseConstraint.create(engine, {});

    //创造汽车:前两个参数为小车中心的x坐标和y坐标。第三个和第四个参数为矩形车身的长和宽。最后的参数为轮子的半径。
    var car = Composites.car(400, 0, 100, 25, 20);

    //创造地面
    var group = Bodies.rectangle(800, 900, 1800, 100, {
        isStatic: true
    });
    //倾斜面A
    var stickA = Bodies.rectangle(400, 200, 50, 400, {
        isStatic: true,
        angle: Math.PI * 0.4
    });
    //倾斜面B
    var stickB = Bodies.rectangle(200, 400, 50, 400, {
        isStatic: true,
        angle: -Math.PI * 0.4
    });

    //将所有物体添加到世界中
    World.add(world, [group, stickA, stickB, car, mouseConstraint]);
};

if (typeof module !== 'undefined') {
    module.exports = Example[Object.keys(Example)[0]];
}