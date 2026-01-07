var Example = Example || {};

/**
 * @desc 鼠标控制
 */
Example.MouseConstraint = function () {
    //初始化
    var Engine = Matter.Engine,
        Render = Matter.Render,
        World = Matter.World,
        MouseConstraint = Matter.MouseConstraint,
        Composites = Matter.Composites,
        Bodies = Matter.Bodies;

    var engine = Engine.create(),
        world = engine.world;

    var render = Render.create({
        engine: engine,
        element: document.body,
        options: {
            width: innerWidth,
            height: innerHeight,
            wireframes: false
        }
    });

    Engine.run(engine);
    Render.run(render);

    //生成矩形A rectangle(x坐标, y坐标, 矩形长度, 矩形宽度)
    var rectA = Bodies.rectangle(100, 20, 200, 40, {
        //渲染
        render: {
            //填充类型:白色
            fillStyle: "#ffffff"
        }
    });

    //生成圆形B
    var circleB = Bodies.circle(100, 100, 30, {
        render: {
            fillStyle: "#ffffff"
        }
    });

    //生成矩形地面
    var ground = Bodies.rectangle(800 / 2, 600 - 10, 800, 20, {
        isStatic: true,
        render: {
            fillStyle: "#9fa"
        }
    });

    //创建矩形堆
    var stack_rect = Composites.stack(300, 100, 4, 3, 0, 0, function (x, y) {
        return Bodies.rectangle(x, y, 150, 40);
    });

    //创建圆形堆
    var stack_circle = Composites.stack(300, 100, 5, 5, 2, 3, function (x, y) {
        return Bodies.circle(x, y, 30);
    });

    var mouseConstraint = MouseConstraint.create(engine, {});

    //将矩形A、ground、矩形堆、圆形堆、鼠标控制添加到世界中
    World.add(world, [rectA, circleB, ground, stack_circle, stack_rect, mouseConstraint]);
};

if (typeof module !== 'undefined') {
    module.exports = Example[Object.keys(Example)[0]];
}