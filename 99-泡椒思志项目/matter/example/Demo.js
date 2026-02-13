var Example = Example || {};

/**
 * @desc demo
 */
Example.Demo = function () {
    //创建引擎、渲染器、添加世界、生成身体模型
    var Engine = Matter.Engine,
        Render = Matter.Render,
        World = Matter.World,
        Bodies = Matter.Bodies;

    //创建引擎实例与引擎世界
    var engine = Engine.create(),
        world = engine.world;

    //创建渲染器实例
    var render = Render.create({
        engine: engine,
        element: document.body
    });

    //运行渲染器、运行引擎
    Engine.run(engine);
    Render.run(render);

    //添加一个矩形物体
    var boxA = Bodies.rectangle(500, 170, 40, 260);
    //生成静止地面
    var ground = Bodies.rectangle(400, 600, 600, 100, {
        isStatic: true
    });
    //将矩形物体和静止地面添加到World世界之中
    World.add(world, [boxA, ground]);
};

if (typeof module !== 'undefined') {
    module.exports = Example[Object.keys(Example)[0]];
}