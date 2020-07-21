var Example = Example || {};

/**
 * @desc 手镯在线预览案例
 */
var jadeObj = null;
Example.JadeBraceletLoader = function () {
    //创建3D场景、相机和渲染器
    var scene = new THREE.Scene();
    //相机设置
    var width = window.innerWidth; //窗口宽度
    var height = window.innerHeight; //窗口高度
    var k = width / height; //窗口宽高比
    var s = 100; //三维场景显示范围控制系数，系数越大，显示的范围越大
    //创建相机对象
    var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(200, 300, 200); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    /**
     * obj文件加载,只加载obj文件中的几何信息,不加载材质文件.mtl
     */
    var loader = new THREE.OBJLoader();
    loader.load('resources/model.obj', function (obj) {
        var texture = new THREE.TextureLoader().load("resources/g.png");
        obj.children[0].material = new THREE.MeshBasicMaterial({
            map: texture
        });
        //将obj模型添加到场景中
        scene.add(obj);
        obj.children[0].scale.set(2, 2, 2);
        // obj.children[0].rotateY(Math.PI / 4);

        jadeObj = obj;
    });


    /**
     * 光源设置
     */
    //点光源
    var point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300); //点光源位置
    scene.add(point); //点光源添加到场景中

    // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
    var axisHelper = new THREE.AxisHelper(250);
    scene.add(axisHelper);

    //执行渲染,r绕y轴旋转
    function render() {
        renderer.render(scene, camera);
        // //请求再次执行渲染函数render
        requestAnimationFrame(render);
    };

    render();
};

whiteClick = function () {
    var whiteTextrue = new THREE.TextureLoader().load("resources/w.png");
    jadeObj.children[0].material.map = whiteTextrue;
}

yellowClick = function () {
    var yellowTextrue = new THREE.TextureLoader().load("resources/o.png");
    jadeObj.children[0].material.map = yellowTextrue;
}

greenClick = function () {
    var greenTextrue = new THREE.TextureLoader().load("resources/g.png");
    jadeObj.children[0].material.map = greenTextrue;
}

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}