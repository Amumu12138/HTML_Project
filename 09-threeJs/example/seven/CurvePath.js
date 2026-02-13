var Example = Example || {};

/**
 * @desc 多个线条组合曲线CurvePath
 * 一、基类Curve
 * getPoints(): 从曲线上批量返回顶点数据
 * 二、属性curve
 * 2D:LineCurve(直线)、ArcCurve(圆弧)、EllipseCurve(椭圆)、SplineCurve(样条曲线)等等
 * 3D:LineCurve(3D直线)、QuadraticBezierCurve3(二次贝塞尔曲线)等等
 */
Example.CurvePath = function () {
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

    //U型案例
    var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry
    // 绘制一个U型轮廓
    var R = 80; //圆弧半径
    var arc = new THREE.ArcCurve(0, 0, R, 0, Math.PI, true);
    // 半圆弧的一个端点作为直线的一个端点
    var line1 = new THREE.LineCurve(new THREE.Vector2(R, 50, 0), new THREE.Vector2(R, 0, 0));
    var line2 = new THREE.LineCurve(new THREE.Vector2(-R, 0, 0), new THREE.Vector2(-R, 50, 0));
    // 创建组合曲线对象CurvePath
    var CurvePath = new THREE.CurvePath();
    // 把多个线条插入到CurvePath中
    CurvePath.curves.push(line1, arc, line2);
    //分段数200
    var points = CurvePath.getPoints(200);
    // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
    geometry.setFromPoints(points);
    //材质对象
    var material = new THREE.LineBasicMaterial({
        color: 0xffffff
    });
    //线条模型对象
    var line = new THREE.Line(geometry, material);
    scene.add(line); //线条对象添加到场景中
    // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
    var axisHelper = new THREE.AxisHelper(250);
    scene.add(axisHelper);

    //渲染场景、摄像机
    renderer.render(scene, camera);

};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}