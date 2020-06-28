var Example = Example || {};

/**
 * @desc 常见几何体和曲线API介绍
 * 一，几何体基类Geometry 
 * 1,常见类型 
 * BoxGeometry(长方体)、CylinderGeometry(圆柱体)、SphereGeometry(球体)、ConeGeotry(圆锥、棱锥)
 * 2,正多面体
 * TetrahedronGeometry(正四面体)、OctahedronGeometry(正八面体)、DodecahedronGeometry(正十二面体)、IcosahedronGeometry(正二十面体)
 * 3,平面
 * RingGeometry(环平面)、PlaneGeometry(矩形平面)、CirlceGeometry(圆平面)
 * 4,2D转3D
 * 拉伸、扫描(ExtrudeGeometry)、LatheGeometry(旋转)、Tubegeometry(管道)
 * 5,轮廓填充(ShapeGeometry)
 * 6,文字（TextGeometry）
 * 7,参数化曲面(ParametricGeometry)
 * 二，曲线
 * Extras/Core
 * 继承关系(Curve -> CurvePath -> Path、ShapePath -> Shape)
 * Extras/Curves
 * 基类Curve
 * 2D:LineCurve(直线)、ArcCurve(圆弧)、EllipseCurve(椭圆)、SpilneCurve(样条曲线)、QuadraticBezierCurve(二次贝塞尔曲线)、CubicBezierCurve(三次贝塞尔曲线)
 * 3D:LineCurve3(直线)、CatmullRomCurve3(三维样条曲线)、QuadraticBezierCurve3(二次三维贝塞尔曲线)、CubicBezierCurve3(三次三维贝塞尔曲线)
 */
Example.Introduction = function () {
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

    //渲染场景、摄像机
    renderer.render(scene, camera);

};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}