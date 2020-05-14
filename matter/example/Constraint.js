var Example = Example || {};

/**
 * @desc 跷跷板
 */
Example.Constraint = function () {
    //初始化
    var Engine = Matter.Engine;
    var World = Matter.World;
    var Render = Matter.Render;
    var Bodies = Matter.Bodies;
    var Vector = Matter.Vector;
    var Constraint = Matter.Constraint;
    var MouseConstraint = Matter.MouseConstraint;
    var Composites = Matter.Composites;

    //创建物理时间
    var engine = Engine.create();
    var world = engine.world;

    //创建渲染器
    var render = Render.create({
        engine: engine,
        element: document.body,
        options: {
            width: innerWidth,
            height: innerHeight,
            wireframes: false
        }
    });

    //运行物理引擎、渲染器
    Engine.run(engine);
    Render.run(render);

    //生成矩形A
    var rectA = Bodies.rectangle(666, innerHeight - 100, 40, 200, {
        isStatic: true,
        render: {
            fillStyle: "#f00"
        },
        collsionFilter: {
            group: -1
        }
    });

    //生成矩形B
    var rectB = Bodies.rectangle(666, innerHeight - 180, 400, 40, {
        render: {
            fillStyle: "#001"
        },
        collsionFilter: {
            group: -1
        }
    });

    var rotate = Constraint.create({
        bodyA: rectA,
        pointA: {
            x: 0,
            y: -80
        },
        bodyB: rectB,
        length: 0,
        stiffness: 0.9
    });

    //生成矩形地面
    var ground = Bodies.rectangle(innerWidth / 2, innerHeight - 10, innerWidth, 20, {
        isStatic: true,
        render: {
            fillStyle: "#9fa"
        }
    });

    //生成矩形堆
    var stack_rect = Composites.stack(300, 100, 4, 3, 0, 0, function (x, y) {
        return Bodies.rectangle(x, y, 150, 40);
    });

    //生成圆形堆
    var stack_circle = Composites.stack(300, 100, 1, 5, 2, 3, function (x, y) {
        return Bodies.rectangle(x, y, 30);
    });

    //生成鼠标控制
    var mouseConstraint = MouseConstraint.create(engine, {
        element: document.body
    });

    //将物体添加到物理世界之中
    World.add(world, [rectA, rectB, ground, stack_rect, stack_circle, mouseConstraint, rotate]);
};

if (typeof module !== 'undefined') {
    module.exports = Example[Object.keys(Example)[0]];
}