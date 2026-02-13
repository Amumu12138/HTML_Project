var Example = Example || {};

/**
 * @desc 基类Light和Object3D
 * Object3D(3D物体父类) -> Light(灯光基类) -> AmbientLight(环境光)、DirectionalLight(平行光)、PointLight(点光源)、SpotLight(聚光灯光源)
 * 1.光源位置属性
 * 光源对象继承父类Object3D的位置属性position
 * 以点光源PointLight为例,PointLight的基类是Light,Light的基类是Object3D,点光源自然继承对象Object3D的位置属性position
 * var point = new THREE.PointLight(0xffffff);
 * point.position(400, 200, 300);
 * 光源对象的add方法同样继承于基类Object3D
 * 2.光源颜色属性color和强度属性intensity
 * 对于点光源、聚光源和环境光一样继承基类Light强度系数属性.intensity
 * var ambient = new THREE.AmbientLight(0xffffff, 0.5); //创建一个颜色属性为0xffffff,强度系数为0.5的环境光
 * scene.add(ambient); //将环境光添加到场景中
 */
Example.LightObject3D = function () {
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
    scene.add(mesh);

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

    // 方向光
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // 设置光源位置
    directionalLight.position.set(100, 100, 100);
    scene.add(directionalLight);

    //执行渲染操作   指定场景、相机作为参数
    renderer.render(scene, camera);
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}