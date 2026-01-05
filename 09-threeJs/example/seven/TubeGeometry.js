var Example = Example || {};

/**
 * @desc 曲线路径管道成型 
 * TubeGemotry(path, tubelarSegments, radius, radiusSegments, closed);
 * 参数                 值
 * path              扫描路径,基本类型是Curve的路径构造函数
 * tubelarSegments   路径方向细分数,默认64
 * radius            管道半径,默认为1 
 * radiusSegments    管道圆弧细分数,默认为8
 * closed            Boolean值,管道是否闭合
 */
Example.TubeGeometry = function () {
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

    //创建管道成型的路径(3D样条曲线)
    var path = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-10, -50, -50),
        new THREE.Vector3(10, 0, 0),
        new THREE.Vector3(8, 50, 50),
        new THREE.Vector3(-5, 0, 100)
    ]);
    // path:路径   40：沿着轨迹细分数  2：管道半径   25：管道截面圆细分数
    var geometry = new THREE.TubeGeometry(path, 40, 2, 25);

    var material = new THREE.MeshBasicMaterial({
        color: 0xffffff
    });
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // LineCurve3创建直线段路径
    var pathLine = new THREE.LineCurve3(new THREE.Vector3(0, 100, 0), new THREE.Vector3(0, 0, 0));
    var geometryLine = new THREE.TubeGeometry(pathLine, 50, 10, 40);

    var meshLine = new THREE.Mesh(geometryLine, material);
    scene.add(meshLine);
    //沿y轴正方向平移25
    meshLine.translateY(25);

    //CurvePath多段路径生成管道案例
    // 创建多段线条的顶点数据
    var p1 = new THREE.Vector3(-85.35, -35.36)
    var p2 = new THREE.Vector3(-50, 0, 0);
    var p3 = new THREE.Vector3(0, 50, 0);
    var p4 = new THREE.Vector3(50, 0, 0);
    var p5 = new THREE.Vector3(85.35, -35.36);
    // 创建线条一：直线
    let line1 = new THREE.LineCurve3(p1, p2);
    // 重建线条2：三维样条曲线
    var curve = new THREE.CatmullRomCurve3([p2, p3, p4]);
    // 创建线条3：直线
    let line2 = new THREE.LineCurve3(p4, p5);
    var CurvePath = new THREE.CurvePath(); // 创建CurvePath对象
    CurvePath.curves.push(line1, curve, line2); // 插入多段线条
    //通过多段曲线路径创建生成管道
    //通过多段曲线路径创建生成管道，CCurvePath：管道路径
    var geometry2 = new THREE.TubeGeometry(CurvePath, 100, 5, 25, false);
    var mesh2 = new THREE.Mesh(geometry2, material);
    scene.add(mesh2);
    //沿z轴正方向平移25
    mesh2.translateZ(25);

    // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
    var axisHelper = new THREE.AxisHelper(250);
    scene.add(axisHelper);

    //渲染场景、摄像机
    renderer.render(scene, camera);

};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}