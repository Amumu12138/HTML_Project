var Example = Example || {};

/**
 * @desc 正投影相机OrthographicCamera和透视投影相机PerspectiveCamera
 * 一、相机
 * 1,正投影相机:OrthographicCamera
 * 2,透视投影相机:PerspectiveCamera
 * 3,立方相机:CubeCamera
 * 4,基类Camera: 属性(a,视图矩阵(materixWorldInverse) b,投影矩阵(projectionMartix))
 * 
 * 二、正投影相机对象OrthographicCamera
 * 构造函数OrthographicCamera(left, right, top, bottom, near, far);
 * 参数                 含义
 * left             渲染空间的左边界
 * right            渲染空间的右边界
 * top              渲染空间的上边界
 * bottom           渲染空间的下边界
 * near             near属性表示的是从距离相机多远的位置开始渲染,一般情况下会设置一个很小的值,默认值0.1
 * far              far属性表示的是距离相机多远的位置截至渲染,如果设置的值偏小,会有部分场景看不到。默认值1000
 * 二、透视投影相机PerspectiveCamera
 * 构造函数PerspectiveCamera(fov, aspect, near, far);
 * 参数             含义                                默认值
 * fov      fov表示视场，所谓视场就是能够看到的角度范围，   45
 *          人的眼睛大约能够看到180度的视场，视角大小设
 *          置要根据具体应用，一般游戏会设置60~90度
 * aspect   aspect表示渲染窗口的长宽比，如果一个网页上只    windowinnerWidth / window.innerHeight
 *          有一个全屏的canvas画布且画布上只有一个窗口，
 *          那么aspect的值就是网页窗口客户区的宽高比
 * near     near属性表示的是从距离相机多远的位置开始渲染,   0.1
 *          一般情况会设置一个很小的值      
 * far      far属性表示的是距离相机多元远的位置截止渲染,    1000
 *          如果设置的值偏小,会有部分场景看不到
 */
Example.Camera = function () {
    /**
     * 创建场景对象Scene
     */
    var scene = new THREE.Scene();
    /**
     * 创建网格模型
     */
    //var geometry = new THREE.SphereGeometry(50, 100, 100); //创建一个球体几何对象
    var geometry = new THREE.BoxGeometry(50, 50, 50); //创建一个立方体几何对象Geometry
    var material = new THREE.MeshLambertMaterial({
        color: 0xff0000
    }); //材质对象Material
    var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    scene.add(mesh); //网格模型添加到场景中
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

    //正投影相机
    // var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    // camera.position.set(200, 300, 200); //设置相机位置
    // camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

    //透视投影相机
    var camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.set(400, 300, 200);
    camera.lookAt(scene.position);

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