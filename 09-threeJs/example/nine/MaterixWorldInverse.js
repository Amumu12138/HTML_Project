var Example = Example || {};

/**
 * @desc 浏览器窗口尺寸变化(自适应渲染)
 */
Example.MaterixWorldInverse = function () {
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
    // var orthographicCamera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    // orthographicCamera.position.set(200, 300, 200); //设置相机位置
    // orthographicCamera.lookAt(scene.position); //设置相机方向(指向的场景对象)



    //透视投影相机
    var perspectiveCamera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    perspectiveCamera.position.set(400, 300, 200);
    perspectiveCamera.lookAt(scene.position);
    /**
     * 创建渲染器对象
     */
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height); //设置渲染区域尺寸
    renderer.setClearColor(0x000000, 1); //设置背景颜色
    document.body.appendChild(renderer.domElement); //body元素中插入canvas对象

    //执行渲染操作   指定场景、相机作为参数
    renderer.render(scene, perspectiveCamera);

    // onresize 事件会在窗口被调整大小时发生
    window.onresize = function () {
        //正投影:重置渲染器输出画布canvas尺寸
        // renderer.setSize(window.innerWidth, window.innerHeight);
        // // 重置相机投影的相关参数
        // k = window.innerWidth / window.innerHeight; //窗口宽高比
        // orthographicCamera.left = -s * k;
        // orthographicCamera.right = s * k;
        // orthographicCamera.top = s;
        // orthographicCamera.bottom = -s;

        //透视投影: 重置渲染器输出画布canvas尺寸
        renderer.setSize(window.innerWidth, window.innerHeight);
        // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
        perspectiveCamera.aspect = window.innerWidth / window.innerHeight;
        // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
        // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
        // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
        perspectiveCamera.updateProjectionMatrix();
    };
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}