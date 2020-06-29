var Example = Example || {};

/**
 * @desc 样条曲线、贝塞尔曲线
 * 一、样条曲线:经过一系列点创建平滑的样条曲线
 * 2D:SplineCurve
 * 3D:CatmullRomCurve3 —— Catmull-Rom算法
 * 二、贝塞尔曲线
 * 1,二次贝塞尔曲线:起点、终点和1个控制点定义
 * 2D:QuadraticBezierCurve
 * 3D:QuadraticBezierCurve3
 * 2,三次贝塞尔曲线:起点、终点和2个控制点定义
 * 2D:CubicBezierCurve
 * 3D:CubicBezierCurve3
 */
Example.SplineBezier = function () {
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
    //绘制样条曲线
    var geometryCatmullRom = new THREE.Geometry(); //声明一个几何体对象Geometry
    // 三维样条曲线  Catmull-Rom算法
    var curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-50, 20, 90),
        new THREE.Vector3(-10, 40, 40),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(60, -60, 0),
        new THREE.Vector3(70, 0, 80)
    ]);
    //getPoints是基类Curve的方法，返回一个vector3对象作为元素组成的数组
    var points = curve.getPoints(100); //分段数100，返回101个顶点
    // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
    geometryCatmullRom.setFromPoints(points);
    //材质对象
    var materialCatmullRom = new THREE.LineBasicMaterial({
        color: 0xffffff
    });
    //线条模型对象
    var lineCatmullRom = new THREE.Line(geometryCatmullRom, materialCatmullRom);
    scene.add(lineCatmullRom); //线条对象添加到场景中

    //绘制二维二次贝塞尔曲线
    var geometryBezier1 = new THREE.Geometry(); //声明一个几何体对象Geometry
    var p1 = new THREE.Vector3(-80, 0, 0);
    var p2 = new THREE.Vector3(20, 100, 0);
    var p3 = new THREE.Vector3(80, 0, 0);
    // 三维二次贝赛尔曲线
    var curveBezier1 = new THREE.QuadraticBezierCurve3(p1, p2, p3);
    var points1 = curveBezier1.getPoints(100); //分段数100，返回101个顶点
    // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
    geometryBezier1.setFromPoints(points1);
    //材质对象
    var materialBezier1 = new THREE.LineBasicMaterial({
        color: 0xff0000
    });
    //线条模型对象
    var lineBezier1 = new THREE.Line(geometryBezier1, materialBezier1);
    scene.add(lineBezier1); //线条对象添加到场景中

    //绘制三维二次贝塞尔曲线
    var geometryBezier2 = new THREE.Geometry(); //声明一个几何体对象Geometry

    var p4 = new THREE.Vector3(-80, 0, 0);
    var p5 = new THREE.Vector3(-40, 100, 0);
    var p6 = new THREE.Vector3(40, 100, 0);
    var p7 = new THREE.Vector3(80, 0, 0);
    // 三维三次贝赛尔曲线
    var curveBezier2 = new THREE.CubicBezierCurve3(p4, p5, p6, p7);
    var points2 = curveBezier2.getPoints(100); //分段数100，返回101个顶点
    // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
    geometryBezier2.setFromPoints(points2);
    //材质对象
    var materialBezier2 = new THREE.LineBasicMaterial({
        color: 0x0000ff
    });
    //线条模型对象
    var lineBezier2 = new THREE.Line(geometryBezier2, materialBezier2);
    scene.add(lineBezier2); //线条对象添加到场景中

    // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
    var axisHelper = new THREE.AxisHelper(250);
    scene.add(axisHelper);

    //渲染场景、摄像机
    renderer.render(scene, camera);

};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}