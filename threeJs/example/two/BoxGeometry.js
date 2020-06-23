var Example = Example || {};

/**
 * @desc 访问几何体对象的数据
 */
Example.BoxGeometry = function () {
    /**
     * 创建场景对象Scene
     */
    var scene = new THREE.Scene();
    //创建一个立方体几何对象Geometry
    var geometry = new THREE.BoxGeometry(100, 100, 100);
    console.log(geometry);
    console.log('Box 几何体顶点位置数据', geometry.vertices);
    console.log('Box 三角行面数据', geometry.faces);

    // 遍历几何体的face属性
    // geometry.faces.forEach(face => {
    //     // 设置三角面face三个顶点的颜色
    //     face.vertexColors = [
    //         new THREE.Color(0xffff00),
    //         new THREE.Color(0xff00ff),
    //         new THREE.Color(0x00ffff),
    //     ]
    // });
    // var material = new THREE.MeshBasicMaterial({
    //     // color: 0x0000ff,
    //     vertexColors: THREE.FaceColors,
    //     // wireframe:true,//线框模式渲染
    // });

    // pop()：删除数组的最后一个元素   shift：删除数组的第一个元素
    geometry.faces.pop();
    geometry.faces.pop();
    geometry.faces.shift();
    geometry.faces.shift();
    //材质对象Material
    var material = new THREE.MeshLambertMaterial({
        color: 0x0000ff,
        side: THREE.DoubleSide, //两面可见
    });
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    //创建一个矩形平面几何体
    var geometryPlane = new THREE.PlaneBufferGeometry(100, 100);
    console.log(geometryPlane);
    console.log('Plane 几何体顶点位置数据', geometryPlane.attributes.position);
    console.log('Plane 几何体索引数据', geometryPlane.index);

    var materialPlane = new THREE.MeshLambertMaterial({
        color: 0x0000ff
    });
    var meshPlane = new THREE.Mesh(geometryPlane, materialPlane);
    //沿Y轴正方向移动50
    meshPlane.translateY(50);
    //将矩形平面几何体meshPlane添加到场景中
    //scene.add(meshPlane);

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