var Example = Example || {};

/**
 * @desc 牛顿摆
 */
Example.NewtonsCradle = function () {
    //初始化
    var Engine = Matter.Engine,
        Render = Matter.Render,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Composites = Matter.Composites,
        MouseConstraint = Matter.MouseConstraint;

    var engine = Engine.create(),
        world = engine.world,
        render = Render.create({
            engine: engine,
            element: document.body,
            options: {
                width: 800,
                height: 600,
                wireframes: false
            }
        });

    //运行引擎、渲染器
    Engine.run(engine);
    Render.run(render);

    //生成牛顿摆
    var newtonC = Composites.newtonsCradle(280, 100, 5, 30, 200);
    //创建鼠标
    var mouseConstraint = MouseConstraint.create(engine, {});
    //将牛顿摆、鼠标加入世界
    World.add(world, [newtonC, mouseConstraint]);
};

if (typeof module !== 'undefined') {
    module.exports = Example[Object.keys(Example)[0]];
}