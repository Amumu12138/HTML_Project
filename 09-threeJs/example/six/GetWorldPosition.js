var Example = Example || {};

/**
 * @desc 获取世界坐标
 */
Example.GetWorldPosition = function () {
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

    //创建一个立方体
    var geometry = new THREE.BoxGeometry(50, 50, 50);
    var material = new THREE.MeshLambertMaterial({
        color: 0xffffff
    });

    var mesh = new THREE.Mesh(geometry, material);
    // mesh的本地坐标设置为(50, 0, 0)
    mesh.position.set(50, 0, 0);
    var group = new THREE.Group();
    // group本地坐标设置和mesh一样设置为(50, 0, 0)
    // mesh父对象设置position会影响得到mesh的世界坐标
    group.position.set(50, 0, 0);
    group.add(mesh);
    scene.add(group);

    // .position属性获得本地坐标
    console.log('本地坐标', mesh.position);

    // getWorldPosition()方法获得世界坐标
    //该语句默认在threejs渲染的过程中执行,如果渲染之前想获得世界矩阵属性、世界位置属性等属性，需要通过代码更新
    scene.updateMatrixWorld(true);
    var worldPosition = new THREE.Vector3();
    mesh.getWorldPosition(worldPosition);
    console.log('世界坐标', worldPosition);
    /**
     * 光源设置
     */
    //点光源
    var point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300); //点光源位置
    scene.add(point); //点光源添加到场景中

    // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
    var axisHelper = new THREE.AxisHelper(250);
    scene.add(axisHelper);

    //执行渲染操作   指定场景、相机作为参数
    renderer.render(scene, camera);
    // 渲染后获取世界坐标
    // var worldPositio2 = new THREE.Vector3();
    // mesh.getWorldPosition(worldPositio2);
    // console.log('世界坐标2 = ', worldPositio2);

};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}