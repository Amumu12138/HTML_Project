var Example = Example || {};

/**
 * @desc 3D场景中插入新的几何体
 */
Example.SphereGeometry = function () {
    /**
     * 创建场景对象Scene
     */
    var scene = new THREE.Scene();
    /**
     * 创建网格模型
     */
    //创建一个球体几何对象
    var geometrySphere = new THREE.SphereGeometry(50, 100, 100);
    //材质对象
    var materialSphere = new THREE.MeshLambertMaterial({
        color: 0xff0000
    });
    //网格模型对象
    var meshSphere = new THREE.Mesh(geometrySphere, materialSphere);
    //网格模型添加到场景中
    scene.add(meshSphere);
    //创建一个长几何对象
    var geometryRect = new THREE.BoxGeometry(100, 50, 20);
    //材质对象
    var materialRect = new THREE.MeshLambertMaterial({
        color: 0x00ff00
    });
    //网格模型对象
    var meshRect = new THREE.Mesh(geometryRect, materialRect);
    meshRect.translateY(-120);
    //网格模型添加到场景中
    scene.add(meshRect);
    //长方体 参数：长，宽，高
    var geometryBox = new THREE.BoxGeometry(50, 50, 50);
    //材质对象
    var materialBox = new THREE.MeshLambertMaterial({
        color: 0x0000ff
    });
    //网格模型对象
    var meshBox = new THREE.Mesh(geometryBox, materialBox);
    //沿Y轴正方向平移120
    meshBox.translateY(120);
    //网格模型添加到场景中
    scene.add(meshBox);
    // // 圆柱  参数：圆柱面顶部、底部直径50,50   高度100  圆周分段数
    var geometryCylinder = new THREE.CylinderGeometry(20, 20, 100, 25);
    //材质对象
    var materialCylinder = new THREE.MeshLambertMaterial({
        color: 0xff00ff
    });
    //网格模型对象
    var meshCylinder = new THREE.Mesh(geometryCylinder, materialCylinder);
    meshCylinder.translateX(75);
    //网格模型添加到场景中
    scene.add(meshCylinder);
    // // 正八面体
    var geometryOctahedron = new THREE.OctahedronGeometry(20);
    //材质对象
    var materialOctahedron = new THREE.MeshLambertMaterial({
        color: 0x00ffff
    });
    //网格模型对象
    var meshOctahedron = new THREE.Mesh(geometryOctahedron, materialOctahedron);
    meshOctahedron.translateX(-100);
    //网格模型添加到场景中
    scene.add(meshOctahedron);
    // // 正十二面体
    //var geometry = new THREE.DodecahedronGeometry(50);
    // // 正二十面体
    //var geometry = new THREE.IcosahedronGeometry(50);

    /**
     * 光源设置
     */
    //点光源
    var point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300); //点光源位置
    scene.add(point); //点光源添加到场景中
    //环境光
    // var ambient = new THREE.AmbientLight(0x444444);
    // scene.add(ambient);
    // console.log(scene)
    // console.log(scene.children)
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