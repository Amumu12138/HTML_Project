var Example = Example || {};

/**
 * @desc Face3对象定义Geometry的三角形面
 */
Example.GeometryFaces = function () {
    /**
     * 创建场景对象Scene
     */
    var scene = new THREE.Scene();
    /**
     * 创建网格模型
     */
    var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry

    var p1 = new THREE.Vector3(0, 0, 0); //顶点1坐标
    var p2 = new THREE.Vector3(0, 100, 0); //顶点2坐标
    var p3 = new THREE.Vector3(50, 0, 0); //顶点3坐标
    var p4 = new THREE.Vector3(0, 0, 100); //顶点4坐标
    //顶点坐标添加到geometry对象
    geometry.vertices.push(p1, p2, p3, p4);

    // Face3构造函数创建一个三角面
    var face1 = new THREE.Face3(0, 1, 2);
    //三角面每个顶点的法向量
    var n1 = new THREE.Vector3(0, 0, -1); //三角面Face1顶点1的法向量
    var n2 = new THREE.Vector3(0, 0, -1); //三角面Face1顶点2的法向量
    var n3 = new THREE.Vector3(0, 0, -1); //三角面Face1顶点3的法向量
    // 设置三角面Face3三个顶点的法向量
    face1.vertexNormals.push(n1, n2, n3);

    // 三角面2
    var face2 = new THREE.Face3(0, 2, 3);
    // 设置三角面法向量
    face2.normal = new THREE.Vector3(0, -1, 0);

    //Color对象表示顶点颜色数据
    var color1 = new THREE.Color(0xff0000); //顶点1颜色
    var color2 = new THREE.Color(0x00ff00); //顶点2颜色
    var color3 = new THREE.Color(0x0000ff); //顶点3颜色

    //三角面face1、face2添加到几何体中
    geometry.faces.push(face1, face2);
    //设置三角面顶点颜色还未解决,界面显示黑色,未正确显示渐变三角形
    //解决原因:将material的color属性替换为vertexColors
    face1.vertexColors = [color1, color2, color3];

    //创建材质对象
    var material = new THREE.MeshBasicMaterial({
        //使用顶点颜色数据的时候，注意设置材质的属性vertexColors属性值为THREE.VertexColors
        vertexColors: THREE.VertexColors,
        side: THREE.DoubleSide
    });
    //创建网格对象,并添加到场景中
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