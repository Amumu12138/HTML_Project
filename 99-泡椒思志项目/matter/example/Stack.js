var Example = Example || {};

/**
 * @desc 创建物体堆
 */
Example.Stack = function () {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        World = Matter.World,
        Composites = Matter.Composites,
        Bodies = Matter.Bodies;

    var engine = Engine.create();
    world = engine.world;

    var render = Render.create({
        engine: engine,
        element: document.body
    });

    Render.run(render);
    Engine.run(engine);

    //添加矩形堆
    var stack = Composites.stack(250, 100, 6, 3, 0, 0, function (x, y) {
        return Bodies.rectangle(x, y, 80, 20);
    });

    //生成静止矩形地面
    var ground = Bodies.rectangle(500, 600, 1000, 100, {
        isStatic: true
    });
    //将矩形堆、静止地面添加到世界中
    World.add(world, [stack, ground]);
};

if (typeof module !== 'undefined') {
    module.exports = Example[Object.keys(Example)[0]];
}