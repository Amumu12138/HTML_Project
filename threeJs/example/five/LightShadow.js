var Example = Example || {};

/**
 * @desc 阴影投影计算
 */
Example.LightShadow = function () {
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
    var geometry = new THREE.BoxGeometry(40, 40, 40);
    var material = new THREE.MeshLambertMaterial({
        color: 0x0000ff
    });
    var mesh = new THREE.Mesh(geometry, material);
    // mesh.position.set(0,0,0)
    scene.add(mesh);

    // 设置产生投影的网格模型
    mesh.castShadow = true;


    //创建一个平面几何体作为投影面
    var planeGeometry = new THREE.PlaneGeometry(300, 200);
    var planeMaterial = new THREE.MeshLambertMaterial({
        color: 0x999999
    });
    // 平面网格模型作为投影面
    var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(planeMesh); //网格模型添加到场景中
    planeMesh.rotateX(-Math.PI / 2); //旋转网格模型
    planeMesh.position.y = -20; //设置网格模型y坐标
    // 设置接收阴影的投影面
    planeMesh.receiveShadow = true;

    // 方向光
    // var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // // 设置光源位置
    // directionalLight.position.set(100, 100, 100);
    // scene.add(directionalLight);
    // // 设置用于计算阴影的光源对象
    // directionalLight.castShadow = true;
    // // 设置计算阴影的区域，最好刚好紧密包围在对象周围
    // // 计算阴影的区域过大：模糊  过小：看不到或显示不完整
    // directionalLight.shadow.camera.near = 0.5;
    // directionalLight.shadow.camera.far = 300;
    // directionalLight.shadow.camera.left = -50;
    // directionalLight.shadow.camera.right = 50;
    // directionalLight.shadow.camera.top = 200;
    // directionalLight.shadow.camera.bottom = -100;
    // // 设置mapSize属性可以使阴影更清晰，不那么模糊
    // directionalLight.shadow.mapSize.set(1024, 1024)
    // console.log(directionalLight.shadow.camera);
    // 聚光光源
    var spotLight = new THREE.SpotLight(0xffffff);
    // 设置聚光光源位置
    spotLight.position.set(100, 100, 100);
    // 设置聚光光源发散角度
    spotLight.angle = Math.PI / 6;
    scene.add(spotLight); //光对象添加到scene场景中
    // 设置用于计算阴影的光源对象
    spotLight.castShadow = true;
    // 设置计算阴影的区域，注意包裹对象的周围
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 300;
    spotLight.shadow.camera.fov = 20;

    setInterval(function () {
        var y = spotLight.position.y + 0.1;
        spotLight.position.set(spotLight.position.x, y, spotLight.position.z);
        console.log("Amumu soptLight position =", spotLight.position);

        //执行渲染操作   指定场景、相机作为参数
        renderer.render(scene, camera);
    }, 20);

};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}