var Example = Example || {};

/**
 * @desc 模型对象旋转平移缩放变换
 * Object3D
 * 1,方法 
 * a,平移:改变position属性 
 * translateX(number): 沿x轴平移
 * translateY(number): 沿y轴平移
 * translateZ(number): 沿z轴平移
 * translateOnAxis(axis, distance): 沿axis轴平移
 * b,旋转:改变rotation和quaternion属性
 * rotateX(angle): 绕x轴旋转
 * rotateY(angle): 绕y轴旋转
 * rotateZ(angle): 绕z轴旋转
 * rotateOnAxis(axis, angle): 绕axis轴旋转
 * 2,属性
 * 缩放 scale: Vector3
 * 位置 position: Vector3
 * 角度 rotation: Euler
 * 四元数 quaternion: Quaternion
 */
Example.TranslateRotateScale = function () {
    /**
     * 创建场景对象Scene
     */
    var scene = new THREE.Scene();
    //创建一个球形网格模型
    var sphereGeometry = new THREE.SphereGeometry(25, 40, 40);
    var material = new THREE.MeshLambertMaterial({
        color: 0xff0000
    });
    var mesh = new THREE.Mesh(sphereGeometry, material);
    scene.add(mesh);

    //缩放
    mesh.scale.set(0.5, 0.5, 2.0);
    mesh.scale.x = 2.0;
    mesh.scale.y = 2.0;
    // mesh.scale.z = 0.5;

    //位置
    mesh.position.set(50, 50, 50);
    mesh.position.x = 0;
    mesh.position.y = 0;
    mesh.position.z = 0;

    //平移
    //mesh.translateX(50);

    //向量Vector3对象表示方向
    var axis = new THREE.Vector3(1, 1, 1);
    axis.normalize(); //向量归一化
    //沿着axis轴表示方向平移100
    mesh.translateOnAxis(axis, 100);

    //旋转
    var boxGeometry = new THREE.BoxGeometry(50, 50, 50);
    var boxMaterial = new THREE.MeshLambertMaterial({
        color: 0xff0000
    });
    var boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(boxMesh);
    //boxMesh沿y轴正方向平移
    boxMesh.translateY(50);

    //绕x轴旋转45度
    // boxMesh.rotateX(Math.PI / 4);
    //绕axis2轴旋转90度
    var axis2 = new THREE.Vector3(1, 1, 1);
    axis2.normalize();
    boxMesh.rotateOnAxis(axis2, Math.PI / 2);

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
    var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(200, 300, 200); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

    // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
    var axisHelper = new THREE.AxisHelper(250);
    scene.add(axisHelper);

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