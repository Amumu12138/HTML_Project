var Example = Example || {};

/**
 * @desc 精灵模型Sprite模拟树林效果
 */
Example.SpriteTree = function () {
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
    var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(200, 300, 200); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

    /**
     * 创建渲染器对象
     */
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height); //设置渲染区域尺寸
    renderer.setClearColor(0x000000, 1); //设置背景颜色
    document.body.appendChild(renderer.domElement); //body元素中插入canvas对象

    /**
     * 精灵创建树林效果
     */
    // 加载树纹理贴图
    var textureTree = new THREE.TextureLoader().load("resources/panda.jpg");
    // 批量创建表示一个树的精灵模型
    for (let i = 0; i < 100; i++) {
        var spriteMaterial = new THREE.SpriteMaterial({
            map: textureTree, //设置精灵纹理贴图
        });
        // 创建精灵模型对象
        var sprite = new THREE.Sprite(spriteMaterial);
        scene.add(sprite);
        // 控制精灵大小,
        sprite.scale.set(10, 10, 1); //// 只需要设置x、y两个分量就可以
        var k1 = Math.random() - 0.5;
        var k2 = Math.random() - 0.5;

        // 设置精灵模型位置，在xoz平面上随机分布
        sprite.position.set(100 * k1, 50, 100 * k2);
    }

    /**
     * 创建一个草地地面
     */
    var geometry = new THREE.PlaneGeometry(1000, 1000); //矩形平面
    // 加载草地纹理贴图
    var texture = new THREE.TextureLoader().load("resources/g.png");
    // 设置纹理的重复模式
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    // uv两个方向纹理重复数量
    texture.repeat.set(10, 10);
    var material = new THREE.MeshLambertMaterial({
        color: 0x777700,
        // map:texture,
    });
    var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    scene.add(mesh); //网格模型添加到场景中
    mesh.rotateX(-Math.PI / 2);

    /**
     * 光源设置
     */
    //点光源
    var point = new THREE.AmbientLight(0xffffff);
    point.position.set(400, 200, 300); //点光源位置
    scene.add(point); //点光源添加到场景中

    //执行渲染操作 指定场景、相机作为参数
    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
    render();
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}