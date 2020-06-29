var Example = Example || {};

/**
 * @desc Shape对象和轮廓填充ShapeGeometry
 * 轮廓生成
 * 1,轮廓填充ShapeGeometry
 * 算法:根据轮廓的顶点使用三角面Face3自动填充中间区域
 * 参数:Shape对象,Shape对象作为元素构成的数组
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
    //沿x轴负方向平移50
    mesh3.translateZ(-60);

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