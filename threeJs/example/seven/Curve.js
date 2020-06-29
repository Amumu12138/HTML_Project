var Example = Example || {};

/**
 * @desc 直线、椭圆、圆弧、基类Curve
 * 一、圆弧线ArcCurve
 * ArcCurve(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise);
 * 参数                 含义
 * aX,aY            圆弧圆心坐标
 * aRadius          圆弧半径
 * aStartAngle,aEndAngle 起始角度,结束角度
 * aClosewise       是否顺时针绘制,默认为false
 */
Example.Curve = function () {
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
    //绘制一个圆弧曲线
    var geometry = new THREE.Geometry();
    //创建圆弧线
    var arc = new THREE.ArcCurve(0, 0, 100, 0, 2 * Math.PI);
    //getPoints是基类Curve的方法，返回一个vector2对象作为元素组成的数组
    var points = arc.getPoints(50);
    // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
    geometry.setFromPoints(points);
    //材质对象
    var material = new THREE.LineBasicMaterial({
        color: 0xff0000
    });
    var line = new THREE.Line(geometry, material);
    scene.add(line);

    //根据批量生成的顶点数据生成圆弧线
    var geometry1 = new THREE.Geometry();
    var R = 50; //圆弧半径
    var N = 50; //分段数量
    //批量生成圆弧上的顶点数据
    for (var i = 0; i < N; i++) {
        var angle = 2 * Math.PI / N * i;
        var x = R * Math.sin(angle);
        var y = R * Math.cos(angle);
        geometry1.vertices.push(new THREE.Vector3(x, y, 0));
    }
    // 插入最后一个点，line渲染模式下，产生闭合效果
    geometry1.vertices.push(geometry1.vertices[0])
    //新建材质对象
    var material1 = new THREE.LineBasicMaterial({
        color: 0x0000ff
    });
    //线条模型
    var line1 = new THREE.Line(geometry1, material1);
    scene.add(line1);

    //绘制直线效果
    var geometryLine = new THREE.Geometry();
    var p1 = new THREE.Vector3(50, 0, 0);
    var p2 = new THREE.Vector3(0, 70, 0);
    //顶点坐标添加到geometry对象
    geometryLine.vertices.push(p1, p2);
    //直线材质对象
    var materialLine = new THREE.LineBasicMaterial({
        color: 0xffffff
    });
    var line2 = new THREE.Line(geometryLine, materialLine);
    scene.add(line2);

    //通过LineCurve3绘制一条三维直线
    var geometry3 = new THREE.Geometry(); //声明一个几何体对象Geometry
    var p3 = new THREE.Vector3(10, 0, 0); //顶点1坐标
    var p4 = new THREE.Vector3(0, 70, 0); //顶点2坐标
    // 三维直线LineCurve3
    var LineCurve = new THREE.LineCurve3(p3, p4);
    var pointArr = LineCurve.getPoints(10);
    geometry3.setFromPoints(pointArr);
    var material3 = new THREE.LineBasicMaterial({
        color: 0xff00ff
    });
    var line3 = new THREE.Line(geometry3, material3);
    scene.add(line3);

    //通过LineCurve绘制一条二维直线
    var geometry4 = new THREE.Geometry(); //声明一个几何体对象Geometry
    var p5 = new THREE.Vector2(50, 0); //顶点1坐标
    var p6 = new THREE.Vector2(0, 50); //顶点2坐标
    // 二维直线LineCurve
    var LineCurve2 = new THREE.LineCurve(p5, p6);
    var pointArr2 = LineCurve2.getPoints(10);
    geometry4.setFromPoints(pointArr2);
    var material4 = new THREE.LineBasicMaterial({
        color: 0xffff00
    });
    var line4 = new THREE.Line(geometry4, material4);
    scene.add(line4);

    // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
    var axisHelper = new THREE.AxisHelper(250);
    scene.add(axisHelper);

    //渲染场景、摄像机
    renderer.render(scene, camera);

};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}