var Example = Example || {};

/**
 * @desc 精灵模型Sprite模拟下雨效果
 */
Example.SpriteRain = function () {
    /**
     * 创建场景对象Scene
     */
    var scene = new THREE.Scene();
    /**
     * 相机设置
     */
    var width = window.innerWidth; //窗口宽度
    var height = window.innerHeight; //窗口高度
    var k = width / height; //窗口宽高比
    var s = 100; //三维场景显示范围控制系数，系数越大，显示的范围越大

    //创建相机对象正投影相机
    var camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.set(300, 100, 268); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

    /**
     * 创建渲染器对象
     */
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height); //设置渲染区域尺寸
    renderer.setClearColor(0x000000, 1); //设置背景颜色
    document.body.appendChild(renderer.domElement); //body元素中插入canvas对象


    /**
     * 精灵创建下雨效果
     */
    //创建椅子雨滴组
    var group = new THREE.Group();
    // 加载雨滴理贴图
    var textureTree = new THREE.TextureLoader().load("resources/threejs66rain.png");
    // 批量创建表示雨滴的精灵模型
    for (let i = 0; i < 400; i++) {
        var spriteMaterial = new THREE.SpriteMaterial({
            map: textureTree, //设置精灵纹理贴图
        });
        // 创建精灵模型对象
        var sprite = new THREE.Sprite(spriteMaterial);

        // 控制精灵大小,
        sprite.scale.set(8, 10, 1); //// 只需要设置x、y两个分量就可以
        var k1 = Math.random() - 0.5;
        var k2 = Math.random() - 0.5;
        var k3 = Math.random() - 0.5;
        // 设置精灵模型位置，在整个空间上上随机分布
        sprite.position.set(1000 * k1, 300 + Math.random(), 1000 * k2);
        group.add(sprite);
    }
    ///雨滴群组插入到场景中
    scene.add(group);

    //添加草地
    var grassGeometry = new THREE.BoxGeometry(500, 1, 500);
    var grassTexture = new THREE.TextureLoader().load("resources/g.png");
    //材质对象
    var grassMaterial = new THREE.MeshBasicMaterial({
        map: grassTexture, //设置精灵纹理贴图
    });
    var grassMesh = new THREE.Mesh(grassGeometry, grassMaterial);
    scene.add(grassMesh);
    //grassMesh.translateY(-100);
    grassMesh.rotateY(Math.PI / 4);
    //grassMesh.rotateZ(Math.PI / 2);

    /**
     * 光源设置
     */
    //点光源
    var point = new THREE.AmbientLight(0xffffff);
    point.position.set(400, 200, 300); //点光源位置
    scene.add(point); //点光源添加到场景中

    // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
    var axisHelper = new THREE.AxisHelper(250);
    scene.add(axisHelper);

    //执行渲染操作 指定场景、相机作为参数
    function render() {
        // 每次渲染遍历雨滴群组，刷新频率30~60FPS，两帧时间间隔16.67ms~33.33ms
        // 每次渲染都会更新雨滴的位置，进而产生动画效果
        group.children.forEach(sprite => {
            // 雨滴的y坐标每次减1
            sprite.position.y -= 1;
            if (sprite.position.y < 0) {
                // 如果雨滴落到地面，重置y，从新下落
                sprite.position.y = 200;
            }
        });

        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
    render();
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}