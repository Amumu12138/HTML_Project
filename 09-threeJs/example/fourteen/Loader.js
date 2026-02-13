var Example = Example || {};

/**
 * @desc 模型文件加载
 * 一、加载器 (需要从引擎外部导入js文件,作为插件使用)
 * a, stl: STLLoader
 * b, obj: OBJLoader
 * c, mtl: MTLLoader
 * d, FBX: FBXLoader
 * e, Collada: ColladaLoader2
 * f, PLY: PLYLoader
 * g, GLTF: GLTFLoader
 * 二、外部模型文件
 * 在实际开发过程中,大多数项目,通常是3D美术设计师或建筑、机械等行业提供的由3dmx、
 * blender、substence、Solidworks等软件创建好的三维模型文件
 * 
 */
Example.Loader = function () {
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

    //网格模型
    var geometry = new THREE.BoxGeometry(50, 50, 50);
    //查看立方体数据
    console.log("Loader geometry = ", geometry);
    //查看toJSON结果
    console.log("Loader geometry toJSON = ", geometry.toJSON());
    //JSON对象转化为字符串
    console.log("Laoder geometry stringify = ", JSON.stringify(geometry.toJSON()));
    // JSON.stringify()方法内部会自动调用参数的toJSON()方法
    console.log("Loader geometry JSON.stringify = ", JSON.stringify(geometry));

    //材质对象
    var material = new THREE.MeshLambertMaterial({
        color: 0x0000ff,
    });

    console.log('Loader material = ', material);
    console.log('Laoder material toJSON = ', material.toJSON());
    console.log('Loader material JSON.stringify = ', JSON.stringify(material));

    var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    scene.add(mesh); //网格模型添加到场景中
    console.log("Loader scene = ", scene);
    console.log("Loader scene toJSON = ", scene.toJSON());
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

    //执行渲染操作   指定场景、相机作为参数
    renderer.render(scene, camera);
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}