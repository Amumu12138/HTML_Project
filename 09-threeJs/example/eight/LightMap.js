var Example = Example || {};

/**
 * @desc 光照贴图天啊及阴影lightMap
 */
Example.LightMap = function () {
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

    //创建一个立方体 (测试无效:法线贴图有问题，没有法线光照信息
    var boxGeometry = new THREE.BoxGeometry(50, 50, 50);

    var boxMaterial = new THREE.MeshPhongMaterial({
        color: 0xff0000
    });
    var boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(boxMesh);

    //创建一个平面几何体作为投影面 (测试有问题：光照贴图没有数据)
    var planeGeometry = new THREE.PlaneGeometry(300, 300);
    planeGeometry.faceVertexUvs[1] = planeGeometry.faceVertexUvs[0];
    //Texture创建一个纹理加载器对象,可以加载图片作为几何体纹理
    var textureLoader = new THREE.TextureLoader();
    //加载光照贴图
    var textureLight = textureLoader.load("resources/o.png");
    var planeMaterial = new THREE.MeshLambertMaterial({
        color: 0x999999,
        //设置光照贴图
        lightMap: textureLight,
        //烘培光照的强度,默认为1
        lightMapIntensity: 0.5
    });
    var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial); //网格模型对象Mesh
    scene.add(planeMesh);

    //添加光源
    var light = new THREE.PointLight(0xffffff);
    //var light = new THREE.AmbientLight(0xffffff);
    light.position.set(400, 400, 400);
    scene.add(light);

    // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
    var axisHelper = new THREE.AxisHelper(250);
    scene.add(axisHelper);
    //循环渲染
    function render() {
        //渲染场景、 摄像机
        renderer.render(scene, camera);
        //请求再次执行渲染函数render
        requestAnimationFrame(render);
        //boxMesh绕z轴旋转
        //boxMesh.rotateZ(0.01);
    };
    //执行循环渲染
    render();
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}