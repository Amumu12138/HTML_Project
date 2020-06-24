var Example = Example || {};

/**
 * @desc 材质共有属性、私有属性
 */
Example.MaterialAttribute = function () {
    /**
     * 创建场景对象Scene
     */
    var scene = new THREE.Scene();
    //创建一个几何对象Geometry
    var geometry = new THREE.PlaneGeometry(100, 100);
    //geometry绕Z轴旋转45度
    // geometry.rotateZ(Math.PI / 4);

    var material = new THREE.MeshBasicMaterial({
        color: 0xdd00ff,
        // 前面FrontSide  背面：BackSide 双面：DoubleSide
        side: THREE.DoubleSide,
        // transparent设置为true，开启透明，否则opacity不起作用
        transparent: true,
        // 设置材质透明度
        opacity: 0.4,
    });
    //设置material透明度为0.1
    material.opacity = 0.1;

    var mesh = new THREE.Mesh(geometry, material);
    //mesh网格绕Y轴旋转45度
    // mesh.rotateY(Math.PI / 4);

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