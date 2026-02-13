var Example = Example || {};

/**
 * @desc 顶点索引复用顶点数据
 */
Example.BufferAttributeIndex = function () {
    /**
     * 创建场景对象Scene
     */
    var scene = new THREE.Scene();
    /**
     * 创建网格模型
     */
    //创建一个Buffer类型几何体对象
    var geometry = new THREE.BufferGeometry();
    // var vertices = new Float32Array([
    //     0, 0, 0, //顶点1坐标
    //     80, 0, 0, //顶点2坐标
    //     80, 80, 0, //顶点3坐标
    //     0, 80, 0 //顶点4坐标
    // ]);

    var vertices = new Float32Array([
        0, 0, 0, //顶点1坐标
        0, 50, 0, //顶点2坐标
        25 * 1.7, 75, 0, //顶点3坐标
        50 * 1.7, 50, 0, //顶点4坐标
        50 * 1.7, 0, 0, //顶点5坐标
        25 * 1.7, -25, 0 //顶点6坐标
    ]);

    //创建属性缓冲区对象,3个位一组,表示一个顶点的xyz坐标
    var attribute = new THREE.BufferAttribute(vertices, 3);
    //设置几何体attributes属性的位置属性
    geometry.attributes.position = attribute;

    //类型数组创建顶点法向量数据
    var normals = new Float32Array([
        0, 0, 1, //顶点1法向量
        0, 0, 1, //顶点2法向量
        0, 0, 1, //顶点3法向量
        0, 0, 1 //顶点4法向量
    ]);
    //设置几何体attributes属性位置normal属性,3个为一组,表示一个顶点的法向量数据
    geometry.attributes.normal = new THREE.BufferAttribute(normals, 3);
    //console.log("Amumu normals", geometry.attributes.normal);
    //Uint16Array类型数组创建顶点索引数组
    //// 0对应第1个顶点位置数据、第1个顶点法向量数据
    // 1对应第2个顶点位置数据、第2个顶点法向量数据
    // 索引值3个为一组，表示一个三角形的3个顶点
    // var indexes = new Uint16Array([
    //     //正方形
    //     0, 1, 2,
    //     0, 2, 3
    // ]);

    // var indexes = new Uint16Array([
    //     //正六边形中挖出一个正六边形
    //     0, 1, 2,
    //     1, 2, 3,
    //     2, 3, 4,
    //     3, 4, 5,
    //     4, 5, 0,
    //     5, 1, 0
    // ]);

    var indexes = new Uint16Array([
        //正六边形
        0, 1, 4,
        1, 3, 4,
        1, 2, 3,
        0, 4, 5
    ]);
    //// 索引数据赋值给几何体的index属性,一个为一组
    geometry.index = new THREE.BufferAttribute(indexes, 1);


    //面渲染模式
    var material = new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        //使用顶点颜色数据渲染模型,不需要再定义color属性
        //vertexColors: THREE.VertexColors,
        side: THREE.DoubleSide
    }); //材质对象Material
    var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    scene.add(mesh); //网格模型添加到场景中

    /**
     * 光源设置
     */
    //点光源
    // var point = new THREE.PointLight(0xffffff);
    // point.position.set(400, 200, 300); //点光源位置
    // scene.add(point); //点光源添加到场景中

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