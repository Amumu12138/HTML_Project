var Example = Example || {};

/**
 * @desc 拉伸扫描成型ExtrudeGeometry
 * 构造函数ExtrudeGeometry()拉伸参数
 * 参数                 含义
 * amount           拉伸长度,默认100
 * bevelEnabled     是否使用倒角
 * bevelSegments    倒角细分数,默认3
 * bevelThickness   倒角尺寸
 * curveSegments    拉伸轮廓细分数
 * steps            拉伸方向细分数
 * extrudePath      扫描路径THREE.CurvePath,默认为z轴方向
 * material         前后面材质索引号
 * extrudeMaterial  拉伸面、倒角面材质索引号
 * bevelSize        倒角尺寸(拉伸方向)
 */
Example.ExtrudeGeometry = function () {
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

    //创建shape形状
    var shape = new THREE.Shape();
    /**四条直线绘制一个矩形轮廓*/
    shape.moveTo(0, 0); //起点
    shape.lineTo(0, 10); //第2点
    shape.lineTo(10, 10); //第3点
    shape.lineTo(10, 0); //第4点
    shape.lineTo(0, 0); //第5点
    /**创建轮廓的扫描轨迹(3D样条曲线)*/
    var curve = new THREE.SplineCurve3([
        new THREE.Vector3(-10, -50, -50),
        new THREE.Vector3(10, 0, 0),
        new THREE.Vector3(8, 50, 50),
        new THREE.Vector3(-5, 0, 100)
    ]);
    var geometry = new THREE.ExtrudeGeometry( //拉伸造型
        shape, //二维轮廓
        //拉伸参数
        {
            bevelEnabled: false, //无倒角
            extrudePath: curve, //选择扫描轨迹
            steps: 50 //扫描方向细分数
        }
    );
    //材质对象
    var material = new THREE.MeshBasicMaterial({
        color: 0x0000ff,
    });
    var mesh = new THREE.Mesh(geometry, material); //点模型对象
    scene.add(mesh); //点模型添加到场景中

    //坐标轨迹点
    var materialPoint = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 5.0 //点对象像素尺寸
    });
    var meshPoint = new THREE.Points(geometry, materialPoint);
    scene.add(meshPoint);
    //沿x轴正方向平移50
    meshPoint.translateX(50);

    // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
    var axisHelper = new THREE.AxisHelper(250);
    scene.add(axisHelper);

    //渲染场景、摄像机
    renderer.render(scene, camera);
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}