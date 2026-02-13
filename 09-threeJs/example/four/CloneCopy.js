var Example = Example || {};

/**
 * @desc 对象克隆clone()和复制copy()
 * 复制、克隆
 * 1.A.copy(B) 把B对象的属性值复制给A对象
 * 2.N = M.clone() 返回一个和M相同的对象赋值给N
 * 3.copy和clone通用对象
 * Vector3、Material、Geometry、Object3D
 */
Example.CloneCopy = function () {
    /**
     * 创建场景对象Scene
     */
    var scene = new THREE.Scene();
    //复制方法copy()
    var p1 = new THREE.Vector3(1.2, 2.6, 3.2);
    var p2 = new THREE.Vector3(0.0, 0.0, 0.0);
    p2.copy(p1);
    // p2向量的xyz变为p1的xyz值
    console.log("Amumu CloneCopy copy = ", p2);
    //克隆方法
    var p3 = new THREE.Vector3(2.0, 3.0, 4.0);
    var p4 = p3.clone();
    // p4对象和p3对象xyz属性相同
    console.log("Amumu CloneCopy clone = ", p4);

    //网格模型复制和克隆
    var box = new THREE.BoxGeometry(10, 10, 10); //创建一个立方体几何对象
    var material = new THREE.MeshLambertMaterial({
        color: 0x0000ff
    }); //材质对象

    var mesh = new THREE.Mesh(box, material); //网格模型对象
    var mesh2 = mesh.clone(); //克隆网格模型
    mesh.translateX(20); //网格模型mesh平移

    scene.add(mesh, mesh2); //网格模型添加到场景中

    box.scale(1.5, 1.5, 1.5); //几何体缩放
    mesh.scale.set(2.0, 2.0, 2.0); //网格模型缩放

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