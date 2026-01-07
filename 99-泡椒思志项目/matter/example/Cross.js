var Example = Example || {};

/**
 * @desc 制造十字架
 */
Example.Cross = function() {
    var Engine = Matter.Engine;
    var Render = Matter.Render;
    var World = Matter.World;
    var Bodies = Matter.Bodies;
    var Body = Matter.Body;
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
            wireframes: false
        }
    });
    //物理引擎、渲染运行
    Engine.run(engine);
    Render.run(render);

    //创造鼠标约束
    var mouseConstraint = MouseConstraint.create(engine, {});

    //生成矩形物体A
    var boxA = Bodies.rectangle(300, 300, 250, 50);
    //生成矩形物体B
    var boxB = Bodies.rectangle(300, 300, 50, 250);

    var cross = Body.create({
        parts: [boxA,boxB]
    });

    var group = Bodies.rectangle(0, 600, 1800, 100, {
        isStatic: true
    });

    //将所有物体添加到世界中
    World.add(world, [group, cross, mouseConstraint]);
};

if (typeof module !== 'undefined') {
    module.exports = Example[Object.keys(Example)[0]];
}