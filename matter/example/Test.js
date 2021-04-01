var Example = Example || {};

/**
 * @desc 物理引擎测试
 */
Example.Test = function () {
    var Engine = Matter.Engine; //引擎.引擎模块包含创建和操作引擎的方法
    var Render = Matter.Render; //基于HTML5画布的渲染器
    var World = Matter.World; //演出舞台. Matter.js 中任何的物体都需要一个舞台/容器，而存放这些物体的地方，则称之为World(世界)
    var Bodies = Matter.Bodies; //用于创建各种形状的物体，物体必须添加到Wolrd中，然后由引擎运行世界
    var Events = Matter.Events;
    var Body = Matter.Body;
    var canvasWidth = window.innerWidth;
    var canvasHeight = window.innerHeight;

    //
    var fruitDatas = [];
    var ground = [];
    var fruits = [];
    var gamemode = true;
    var hasClick = false;
    var elasticity = 0.2;

    var engine = Engine.create();
    var world = engine.world;
    var render = Render.create({
        engine: engine,
        element: document.body,
        options: {
            width: canvasWidth,
            height: canvasHeight,
            wireframes: false,
            background: 'transparent'
        }
    });

    engine.world.gravity.y = 1.0;

    //墙体组
    ground.push(Bodies.rectangle(0, 0, 0.001, canvasHeight * 2, {
        isStatic: true,
        render: {
            opacity: 1
        }
     }));

    ground.push(Bodies.rectangle(canvasWidth, 0, 0.001, canvasHeight * 2, {
        isStatic: true,
        render: {
            opacity: 1
        }
    }));

    ground.push(Bodies.rectangle(0, canvasHeight, canvasWidth * 2, 0.001, {
        isStatic: true,
        render: {
            opacity: 1
        }
    }));

    //水果组
    document.body.onmousedown = function(ev) {
        // if(hasClick) return;
        const timer = setTimeout(() => {
            var radomFriutNum = randomFruit();
            // var radomFriutNum  = 0;
            var circle = Bodies.circle(window.innerWidth / 2, 80, fruitDatas[radomFriutNum].circleRadius, {
                isStatic: false,
                fruitTag: radomFriutNum,
                restitution: elasticity,
                render:
                {
                    sprite:
                    {
                        texture: 'res/images/fruit'+ radomFriutNum + '.png',
                    }
                }
            });
    
            // fruits.push(circle);
            World.add(world, circle);
            clearTimeout(timer);
        }, 500);
    }

    getFruit();
  

    //检测碰撞接触开始
    Events.on(engine, "collisionStart", (event) => {
        const pairs = event.pairs;
        var bodyA, bodyB;
        var fruitData, fruit;
        for(var i = 0; i < pairs.length; i++) {
            bodyA = pairs[i].bodyA;
            bodyB = pairs[i].bodyB;
            if(bodyA.fruitTag === bodyB.fruitTag) {
                // console.log("amumu fruitTag = ", bodyA.fruitTag);
                if(bodyA.fruitTag >= 10) continue;

                fruitData = fruitDatas[bodyA.fruitTag + 1];
                if (bodyA.position.y > bodyB.position.y) {
                    fruit = Bodies.circle(bodyA.position.x, bodyA.position.y, fruitData.circleRadius, {
                        restitution:elasticity,
                        render:
                        {
                            sprite: {
                                texture: fruitData.render.sprite.texture
                            }
                        }
                      });
                }
                else {
                    fruit = Bodies.circle(bodyB.position.x, bodyB.position.y, fruitData.circleRadius, {
                        restitution: elasticity,
                        render:
                        {
                            sprite: {
                                texture: fruitData.render.sprite.texture
                            }
                        }
                      });
                }

                fruit.fruitTag = fruitData.fruitTag;
                World.add(world, fruit);
                World.remove(world, bodyA);
                World.remove(world, bodyB);
                
                scaleFruit(fruit);
            }  else if (bodyA.id === ground[2].id || bodyB.id === ground[2].id) {
                // console.log("amumu ground[2].id = ", bodyA.id);
            }
        }
    });
   
    //获取水果信息
    function getFruit() {
        var circleSize = [52, 80, 108, 119, 152, 183, 193, 258, 308, 309, 408];
        var scaleSize = 1.5;
        for (var i = 0; i < 11; ++i) {
            fruitDatas.push({
                fruitTag: i,
                // circleRadius: circleSize[(gamemode ? i : 10 - i)] / 2 / scaleSize,
                circleRadius: circleSize[(gamemode ? i : 10 - i)] / 2 ,
                render: {
                    sprite: {
                        texture: 'res/images/fruit' + (gamemode ? i : 10 - i) + '.png',
                        xScale: 1 / scaleSize,
                        yScale: 1 / scaleSize
                    }
                }
            });
        }
        console.log("Amumu MatterJs Test fruitDatas= ", fruitDatas);
    }

    //随机水果(0-3编号)
    function randomFruit() {
      return parseInt(Math.random() * 100) % 4;
    }

    //水果缩放
    function scaleFruit(body, scaleSize = 1.1, count = 5, timeout = 20) {
        var allSize = Math.pow(scaleSize, 5);
        const allScale = 1 / allSize;
        const signleScale = 1 / scaleSize;
        Body.scale(body, allScale, allScale);
        body.render.sprite.xScale *= allScale;
        body.render.sprite.yScale *= allScale;
        var cnt = 0;
        var timer = setInterval(() => {
          Body.scale(body, scaleSize, scaleSize);
          body.render.sprite.xScale *= scaleSize;
          body.render.sprite.yScale *= scaleSize;
          if (cnt === count) {
            clearInterval(timer);
            timer = setTimeout(() => {
              Body.scale(body, signleScale, signleScale);
              body.render.sprite.xScale *= signleScale;
              body.render.sprite.yScale *= signleScale;
              clearTimeout(timer);
            }, timeout);
          }
          allSize /= scaleSize;
          ++cnt;
        }, timeout);
      }

    //物理引擎、渲染运行
    Engine.run(engine);
    Render.run(render)
    World.add(world, [...ground, ...fruits]);
};

if (typeof module !== 'undefined') {
    module.exports = Example[Object.keys(Example)[0]];
}