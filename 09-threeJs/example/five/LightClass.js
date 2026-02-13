var Example = Example || {};

/**
 * @desc 光照原理和常见光源类型
 * 光源
 * 基类Light 
 * 属性：a.颜色(color) b.强度(intensity) 
 * 1.环境光 AmbientLight
 * 2.平行光 DirectionalLight
 * 3.点光源 PointLight
 * 4.聚光灯光源 SpotLight
 */
Example.LightClass = function () {
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

    //生成一个立方体,添加到场景中
    // var geometry = new THREE.BoxGeometry(50, 50, 50);
    // var material = new THREE.MeshLambertMaterial({
    //     color: 0xffffff
    // });

    // var cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    //环境光:环境光颜色RGB成分分别和物体材质颜色RGB成分分别相乘
    // var ambient = new THREE.AmbientLight(0xffffff);
    // scene.add(ambient); //环境光对象添加到scene场景中

    //点光源
    // var point = new THREE.PointLight(0xffffff);
    // //设置点光源位置，改变光源的位置
    // point.position.set(400, 200, 300);
    // scene.add(point);
    // var sphereSize = 1;
    // var pointLightHelper = new THREE.PointLightHelper(point, sphereSize);
    // scene.add(pointLightHelper);

    // 平行光
    // var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // 设置光源的方向： 通过光源position属性和目标指向对象的position属性计算
    // directionalLight.position.set(100, 100, 100);
    // 方向光指向对象网格模型， 可以不设置， 默认的位置是0, 0, 0
    // directionalLight.target = cube;
    // scene.add(directionalLight);
    // var light = new THREE.DirectionalLight(0xFFFFFF);
    // var helper = new THREE.DirectionalLightHelper(light, 5);
    // scene.add(helper);

    //聚光光源
    // var spotLight = new THREE.SpotLight(0xffffff);
    // 设置聚光光源位置
    // spotLight.position.set(200, 200, 200);
    // 聚光灯光源指向网格模型
    // spotLight.target = cube;
    // 设置聚光光源发散角度
    // spotLight.angle = Math.PI / 6
    // scene.add(spotLight); //光对象添加到scene场景中
    // 用于模拟聚光灯 SpotLight 的锥形辅助对象.
    // var spotLightHelper = new THREE.SpotLightHelper(spotLight);
    // scene.add(spotLightHelper);

    //光照计算算法 漫反射光的颜色 = 网格模型材质颜色值 x 光线颜色 x 光线入射角余弦值
    // 颜色相乘测试
    // 网格模型材质设置为白色
    var geometry = new THREE.BoxGeometry(100, 100, 100); //
    var material = new THREE.MeshLambertMaterial({
        color: 0xffffff
    });
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    //环境光   环境光颜色RGB成分分别和物体材质颜色RGB成分分别相乘
    var ambient = new THREE.AmbientLight(0x440000);
    scene.add(ambient); //环境光对象添加到scene场景中
    //点光源
    var point = new THREE.PointLight(0xff0000);
    //设置点光源位置  光源对象和模型对象的position属性一样是Vector3对象
    //PointLight的基类是Light  Light的基类是Object3D  点光源对象继承Object3D对象的位置属性position
    point.position.set(400, 200, 300);
    scene.add(point);
    //执行渲染操作   指定场景、相机作为参数
    renderer.render(scene, camera);
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}