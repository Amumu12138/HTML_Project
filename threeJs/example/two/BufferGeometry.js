var Example = Example || {};

/**
 * @desc 顶点位置数据解析渲染
 */
Example.BufferGeometry = function () {
    /**
     * 创建场景对象Scene
     */
    var scene = new THREE.Scene();
    /**
     * 创建网格模型
     */
    //创建一个Buffer类型几何体对象
    var geometry = new THREE.BufferGeometry();
    var vertices = new Float32Array([
        0, 0, 0, //顶点1坐标
        50, 0, 0, //顶点2坐标
        0, 100, 0, //顶点3坐标
        0, 0, 10, //顶点4坐标
        0, 0, 100, //顶点5坐标
        50, 0, 10 //顶点6坐标
    ]);
    //创建属性缓冲区对象,3个位一组,表示一个顶点的xyz坐标
    var attribute = new THREE.BufferAttribute(vertices, 3);
    //设置几何体attributes属性的位置属性
    geometry.attributes.position = attribute;

    //面渲染模式
    // var material = new THREE.MeshBasicMaterial({
    //     color: 0xff0000,
    //     side: THREE.DoubleSide
    // }); //材质对象Material
    // var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    // scene.add(mesh); //网格模型添加到场景中

    //点渲染模式
    // var pointsMaterial = new THREE.PointsMaterial({
    //     color: 0xff0000,
    //     //点对象像素尺寸
    //     size: 10
    // });
    // //点模型对象
    // var points = new THREE.Points(geometry, pointsMaterial);
    // //点对象添加到场景中
    // scene.add(points);

    //线条渲染模式
    var lineMaterial = new THREE.LineBasicMaterial({
        color: 0xff0000
    });
    //线条模型对象
    var line = new THREE.Line(geometry, lineMaterial);
    //线条对象添加到场景中
    scene.add(line);

    /**
     * 光源设置
     */
    //点光源
    var point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300); //点光源位置
    scene.add(point); //点光源添加到场景中

    /**
     * 相机设置
     */
    var width = window.innerWidth; //窗口宽度
    var height = window.innerHeight; //窗口高度
    var k = width / height; //窗口宽高比
    var s = 100; //三维场景显示范围控制系数，系数越大，显示的范围越大
    //创建相机对象
    var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(200, 300, 200); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

    // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
    var axisHelper = new THREE.AxisHelper(250);
    scene.add(axisHelper);

    /**
     * 创建渲染器对象
     */
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height); //设置渲染区域尺寸
    renderer.setClearColor(0x000000, 1); //设置背景颜色
    document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
    //执行渲染操作   指定场景、相机作为参数
    renderer.render(scene, camera);
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}