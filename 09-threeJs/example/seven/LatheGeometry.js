var Example = Example || {};

/**
 * @desc 旋转造型
 * LatheGeometry(points, segments, phiStart, phiLength);
 * 参数             值
 * points       Vector2表示的坐标数据组成的数组
 * segments     圆周方向细分数,默认为12
 * phiStart     开始角度,默认为0
 * phiLength    旋转角度,默认为2PI
 */
Example.LatheGeometry = function () {
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
     * 创建旋转网格模型
     */
    var points = [
        new THREE.Vector2(50, 60),
        new THREE.Vector2(25, 0),
        new THREE.Vector2(50, -60)
    ];
    var geometry = new THREE.LatheGeometry(points, 30);
    var material = new THREE.MeshBasicMaterial({
        color: 0xffffff, //三角面颜色
        side: THREE.DoubleSide //两面可见
    }); //材质对象
    material.wireframe = true; //线条模式渲染(查看细分数)
    var mesh = new THREE.Mesh(geometry, material); //旋转网格模型对象
    scene.add(mesh); //旋转网格模型添加到场景中
    console.log("Amumu LatheGeometry mesh", mesh);

    //样条曲线插值计算
    var shape = new THREE.Shape(); //创建Shape对象
    var points1 = [ //定位定点
        new THREE.Vector2(50, 60),
        new THREE.Vector2(25, 0),
        new THREE.Vector2(50, -60)
    ];
    shape.splineThru(points1); //顶点带入样条插值计算函数
    var splinePoints = shape.getPoints(20); //插值计算细分数20
    var geometry1 = new THREE.LatheGeometry(splinePoints, 30); //旋转造型

    var material1 = new THREE.MeshBasicMaterial({
        color: 0xff0000, //三角面颜色
        side: THREE.DoubleSide //两面可见
    }); //材质对象
    var mesh1 = new THREE.Mesh(geometry1, material1); //旋转网格模型对象
    scene.add(mesh1); //旋转网格模型添加到场景中
    //沿x轴正方向平移50,且缩小0.5
    mesh1.translateX(100);
    mesh1.scale.set(0.5, 0.5, 0.5);

    //添加点光源
    var pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(400, 200, 300); //点光源位置
    scene.add(pointLight); //点光源添加到场景中

    // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
    var axisHelper = new THREE.AxisHelper(250);
    scene.add(axisHelper);

    //渲染场景、摄像机
    renderer.render(scene, camera);

};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}