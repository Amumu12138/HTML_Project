var Example = Example || {};

/**
 * @desc 几何体旋转、缩放、平移变换
 */
Example.Translate = function () {
    /**
     * 创建场景对象Scene
     */
    var scene = new THREE.Scene();
    //创建一个立方体几何对象Geometry
    var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
    // 几何体xyz三个方向都缩小0.2倍
    geometry.scale(0.2, 0.2, 0.2);
    // 几何体沿着x轴平移50 
    geometry.translate(50, 0, 0);
    // 几何体绕着x轴旋转45度
    geometry.rotateX(Math.PI / 4);
    // 居中：偏移的几何体居中
    geometry.center();
    console.log(geometry.vertices);

    //材质对象Material
    var material = new THREE.MeshLambertMaterial({
        color: 0xff0000,
        side: THREE.DoubleSide //两面可见
    });
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
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