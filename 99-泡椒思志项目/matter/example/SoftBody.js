var Example = Example || {};

/**
 * @desc 制造布料或球网
 */
Example.SoftBody = function() {
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
            wireframes: false
        }
    });
    //物理引擎、渲染运行
    Engine.run(engine);
    Render.run(render);
    //创建鼠标约束
    var mouseConstraint = MouseConstraint.create(engine, {});
    /*制作布料
    第一个物体中心在（100,0）坐标处，创造出的球形共6列6行，行间隙和列间隙都为2，
    球半径为22，为了隐藏这些球，将particleOptions参数的render属性的visible属性设为false。
    将collisionFilter属性的group属性设为-1，可以避免这些球之间相互碰撞。
    constraintOptions属性传入空对象，设为默认。
    */
    var cloth = Composites.softBody(100, 0, 6, 6, 4, 4, false, 40, {
        render: {
            visible: false
        },
        collisionFilter: {
            group: -1
        }
    }, {});

    //将最上方的6个球固定
    for(var i = 0; i < 6; i++) {
        cloth.bodies[i].isStatic = true;
    }

    var group = Bodies.rectangle(600, 700, 1800, 100, {
        isStatic: true
    });

    //将所有物体添加到世界中
    World.add(world, [group, cloth, mouseConstraint]);
};

if (typeof module !== 'undefined') {
    module.exports = Example[Object.keys(Example)[0]];
}