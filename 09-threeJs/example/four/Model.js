var Example = Example || {};

/**
 * @desc 点、线、网格模型介绍
 * 点线面模型
 * 1,点模型
 * Points 点渲染模式
 * PointsMaterial 点材质
 * 2,线条类型模型
 * Line 线渲染模式
 * LineLoop 闭线渲染模式
 * LineSegments 简断线渲染模式
 * LineBasicMaterial 基础线材质
 * LineDashedMaterial 虚线材质
 * 3,网格材质
 * Mesh 三角形渲染模式
 * MeshBasicMaterial、MeshLambertMaterial、MeshPhongMaterial、MeshStandardMaterial、MeshPhysicalMaterial 网格材质
 * 4,模型基类
 * Object3D
 */
Example.Model = function () {
    /**
     * 创建场景对象Scene
     */
    var scene = new THREE.Scene();
    var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
    // 点渲染模式
    var material = new THREE.PointsMaterial({
        color: 0xff0000,
        size: 20.0 //点对象像素尺寸
    }); //材质对象
    var points = new THREE.Points(geometry, material); //点模型对象
    //scene.add(points);

    // 线条渲染模式
    var LineBasicMaterial = new THREE.LineBasicMaterial({
        color: 0xff0000 //线条颜色
    }); //材质对象
    // 创建线模型对象   构造函数：Line、LineLoop、LineSegments
    var line = new THREE.Line(geometry, LineBasicMaterial); //线条模型对象
    //scene.add(line);

    // 三角形面渲染模式  
    var meshLambertMaterial = new THREE.MeshLambertMaterial({
        color: 0xff0000, //三角面颜色
    }); //材质对象
    // 通过访问属性的形式设置
    //访问color报错,方法有问题
    //meshLambertMaterial.color = "0xff0000";
    meshLambertMaterial.wireframe = true;

    var mesh = new THREE.Mesh(geometry, meshLambertMaterial); //网格模型对象Mesh
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