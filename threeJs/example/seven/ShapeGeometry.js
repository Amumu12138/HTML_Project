var Example = Example || {};

/**
 * @desc Shape对象和轮廓填充ShapeGeometry
 * 轮廓生成
 * 1,轮廓填充ShapeGeometry
 * 算法:根据轮廓的顶点使用三角面Face3自动填充中间区域
 * 参数:Shape对象:Shape对象作为元素构成的数组;curveSegments:每一个形状的分段数,默认值为12
 * 2,Shape
 * 绘制二维形状
 * a,外轮廓:shape继承基类Path的轮廓绘制方法
 * b,内部轮廓:holes属性(数组:元素是Path对象)
 * 外部导入顶点:可视化解析地图数据
 * 3,基类-子类
 * 从前到后,依次前面是后面基类
 * Curve -> CurvePath -> Path -> Shape
 * Curve -> CurvePath -> ShapePath
 */
Example.ShapeGeometry = function () {
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

    //绘制五边形
    var points = [
        new THREE.Vector2(-50, -50),
        new THREE.Vector2(-60, 0),
        new THREE.Vector2(0, 50),
        new THREE.Vector2(60, 0),
        new THREE.Vector2(50, -50),
        new THREE.Vector2(-50, -50),
    ];
    // 通过顶点定义轮廓
    var shape = new THREE.Shape(points);
    // shape可以理解为一个需要填充轮廓
    // 所谓填充：ShapeGeometry算法利用顶点计算出三角面face3数据填充轮廓
    var geometry = new THREE.ShapeGeometry(shape, 25);
    var material = new THREE.MeshBasicMaterial({
        color: 0xffffff
    });
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    //绘制圆弧形状
    var shape2 = new THREE.Shape();
    //圆弧轮廓
    shape2.absarc(0, 0, 20, 0, 2 * Math.PI);
    //查看shape顶点数据
    console.log("ShapeGeometry shapePoint", shape2.getPoints(15));
    var geometry2 = new THREE.ShapeGeometry(shape2, 25);
    var material2 = new THREE.MeshBasicMaterial({
        color: 0xff0000
    });
    var mesh2 = new THREE.Mesh(geometry2, material2);
    scene.add(mesh2);
    //沿z轴负方向平移50
    mesh2.translateZ(-50);

    //绘制矩形区域
    // 通过shpae基类path的方法绘制轮廓（本质也是生成顶点）
    var shape3 = new THREE.Shape();
    // 四条直线绘制一个矩形轮廓
    shape3.moveTo(0, 0); //起点
    shape3.lineTo(0, 100); //第2点
    shape3.lineTo(100, 100); //第3点
    shape3.lineTo(100, 0); //第4点
    shape3.lineTo(0, 0); //第5点
    var geometry3 = new THREE.ShapeGeometry(shape3, 40);
    var material3 = new THREE.MeshBasicMaterial({
        color: 0x0000ff
    });
    var mesh3 = new THREE.Mesh(geometry3, material3);
    scene.add(mesh3);
    //沿z轴负方向平移60
    mesh3.translateZ(-60);

    //shape外轮廓和内轮廓
    // 圆弧与直线连接
    var shape4 = new THREE.Shape(); //Shape对象
    var R = 25;
    // 绘制一个半径为R、圆心坐标(0, 0)的半圆弧
    shape4.absarc(0, 0, R, 0, Math.PI);
    //从圆弧的一个端点(-R, 0)到(-R, -200)绘制一条直线
    shape4.lineTo(-R, -50);
    // 绘制一个半径为R、圆心坐标(0, -200)的半圆弧
    shape4.absarc(0, -50, R, Math.PI, 2 * Math.PI);
    //从圆弧的一个端点(R, -200)到(-R, -200)绘制一条直线
    shape4.lineTo(R, 0);
    var geometry4 = new THREE.ShapeGeometry(shape4, 30);
    var material4 = new THREE.MeshBasicMaterial({
        color: 0xffff00
    });
    var mesh4 = new THREE.Mesh(geometry4, material4);
    scene.add(mesh4);
    //沿z轴负方向平移70
    mesh4.translateZ(-70);
    //沿x轴负方向平移100
    mesh4.translateX(-100);

    // 一个外轮廓圆弧嵌套三个内圆弧轮廓
    var shape5 = new THREE.Shape(); //Shape对象
    //外轮廓
    shape5.arc(0, 0, 50, 0, 2 * Math.PI);
    // 内轮廓1
    var path1 = new THREE.Path();
    path1.arc(0, 0, 20, 0, 2 * Math.PI);
    // 内轮廓2
    var path2 = new THREE.Path();
    path2.arc(40, 0, 5, 0, 2 * Math.PI);
    // 内轮廓3
    var path3 = new THREE.Path();
    path3.arc(-40, 0, 5, 0, 2 * Math.PI);
    //三个内轮廓分别插入到holes属性中 hoels挖孔
    shape5.holes.push(path1, path2, path3);
    var geometry5 = new THREE.ShapeGeometry(shape5, 30);
    var material5 = new THREE.MeshBasicMaterial({
        color: 0x00ff00
    });
    var mesh5 = new THREE.Mesh(geometry5, material5);
    scene.add(mesh5);
    //沿z轴正方向平移50
    mesh5.translateZ(50);

    // 矩形嵌套矩形或圆弧
    var shape6 = new THREE.Shape(); //Shape对象
    //外轮廓
    shape6.moveTo(0, 0); //起点
    shape6.lineTo(0, 50); //第2点
    shape6.lineTo(50, 50); //第3点
    shape6.lineTo(50, 0); //第4点
    shape6.lineTo(0, 0); //第5点

    //内轮廓
    var path4 = new THREE.Path(); //path对象
    // path.arc(50,50,40,0,2*Math.PI);//圆弧
    path4.moveTo(10, 10); //起点
    path4.lineTo(10, 40); //第2点
    path4.lineTo(40, 40); //第3点
    path4.lineTo(40, 10); //第4点
    path4.lineTo(10, 10); //第5点
    shape6.holes.push(path4); //设置内轮廓
    var geometry6 = new THREE.ShapeGeometry(shape6, 30);
    var material6 = new THREE.MeshBasicMaterial({
        color: 0xff00ff
    });
    var mesh6 = new THREE.Mesh(geometry6, material6);
    scene.add(mesh6);
    //沿z轴和x轴正方向各平移50
    mesh6.translateX(50);
    mesh6.translateZ(50);

    // 轮廓对象1
    var shape7 = new THREE.Shape();
    shape7.arc(-50, 0, 30, 0, 2 * Math.PI);
    // 轮廓对象2
    var shape8 = new THREE.Shape();
    shape8.arc(50, 0, 30, 0, 2 * Math.PI);
    // 轮廓对象3
    var shape9 = new THREE.Shape();
    shape9.arc(0, 50, 30, 0, 2 * Math.PI);
    // 多个shape作为元素组成数组,每一个shpae可以理解为一个要填充的轮廓
    var geometry7 = new THREE.ShapeGeometry([shape7, shape8, shape9], 30);
    var material7 = new THREE.MeshBasicMaterial({
        color: 0x00fffff
    });
    var mesh7 = new THREE.Mesh(geometry7, material7);
    scene.add(mesh7);
    mesh7.translateZ(-100);
    mesh7.translateY(-100);

    //移除场景中mesh
    scene.remove(mesh, mesh2, mesh3, mesh4, mesh5, mesh6, mesh7);
    // 河南边界轮廓坐标 //数据不完整
    let arr = [
        [110.3906, 34.585],
        [110.8301, 34.6289],
        [110.6543, 34.1455],
        [110.4785, 34.2334],
        [110.3906, 34.585]
    ]
    var points = [];
    // 转化为Vector2构成的顶点数组
    arr.forEach(elem => {
        points.push(new THREE.Vector2(elem[0], elem[1]))
    });
    // 样条曲线生成更多的点
    var SplineCurve = new THREE.SplineCurve(points)
    var shape10 = new THREE.Shape(SplineCurve.getPoints(300));
    // var shape = new THREE.Shape(points);
    var geometry10 = new THREE.ShapeGeometry(shape10);
    geometry10.center(); //几何体居中
    geometry10.scale(30, 30, 30); //几何体缩放
    var material10 = new THREE.MeshPhongMaterial({
        color: 0x0000ff,
        side: THREE.DoubleSide //两面可见
    }); //材质对象
    var mesh10 = new THREE.Mesh(geometry10, material10); //网格模型对象
    scene.add(mesh10);

    //添加点光源
    var pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(400, 200, 300); //点光源位置
    scene.add(pointLight); //点光源添加到场景中

    // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
    var axisHelper = new THREE.AxisHelper(250);
    scene.add(axisHelper);

    //渲染场景、摄像机
    renderer.render(scene, camera);
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}