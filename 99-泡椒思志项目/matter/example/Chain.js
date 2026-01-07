var Example = Example || {};

/**
 * @desc 铁索桥
 */
Example.Chain = function () {
    var Engine = Matter.Engine;
    var Render = Matter.Render;
    var World = Matter.World;
    var Constraint = Matter.Constraint;
    var Composites = Matter.Composites;
    var Bodies = Matter.Bodies;

    var engine = Engine.create();
    var world = engine.world;

    var render = Render.create({
        engine: engine,
        element: document.body,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            wireframes: false
        }
    });

    Engine.run(engine);
    Render.run(render);

    //桥墩
    var wallA = Bodies.rectangle(0, 50, 50, 400, {
        isStatic: true
    });
    var wallB = Bodies.rectangle(500, 50, 50, 400, {
        isStatic: true
    });

    //桥上的木板
    var chains = Composites.stack(0, 50, 5, 1, 9, 0, function (x, y) {
        return Bodies.rectangle(x, y, 80, 30, {
            chamfer: 5
        });
    });

    //三条链接铁索
    Composites.chain(chains, 0.4, 0, -0.4, 0, {});
    Composites.chain(chains, 0.4, 0.3, -0.4, 0.3, {});
    Composites.chain(chains, 0.4, -0.3, -0.4, -0.3, {});

    //左侧固定在桥墩上
    var fixLeft = Constraint.create({
        bodyA: wallA,
        ponitA: {
            x: 0,
            y: 0
        },
        bodyB: chains.bodies[0],
        pointB: {
            x: -25,
            y: 0
        }
    });

    //右侧固定在桥墩上
    var fixRight = Constraint.create({
        bodyA: chains.bodies[chains.bodies.length - 1],
        ponitA: {
            x: 0,
            y: 0
        },
        bodyB: wallB,
        pointB: {
            x: 0,
            y: 0
        }
    });

    //桥墩、铁索固定的木板加入到世界中
    World.add(world, [wallA, wallB, chains, fixLeft, fixRight]);
};

if (typeof module !== 'undefined') {
    module.exports = Example[Object.keys(Example)[0]];
}