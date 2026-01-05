var Example = Example || {};

/**
 * @desc 环境贴图envMap
 */
Example.EnvMap = function () {
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

    var geometry = new THREE.BoxGeometry(100, 100, 100); //立方体

    var loader = new THREE.CubeTextureLoader();
    // 所有贴图在同一目录下，可以使用该方法设置共用路径
    loader.setPath('环境贴图/');
    // 立方体纹理加载器返回立方体纹理对象CubeTexture
    var CubeTexture = loader.load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);
    //材质对象Material
    var material = new THREE.MeshPhongMaterial({
        //网格模型设置颜色，网格模型颜色和环境贴图会进行融合计算
        // color:0xff0000,
        envMap: CubeTexture, //设置环境贴图
        // 环境贴图反射率   控制环境贴图对被渲染三维模型影响程度
        // reflectivity: 0.1,
    });
    console.log(CubeTexture.image);
    var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    scene.add(mesh); //网格模型添加到场景中

    //添加光源
    var light = new THREE.PointLight(0xffffff);
    //var light = new THREE.AmbientLight(0xffffff);
    light.position.set(400, 400, 400);
    scene.add(light);

    // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
    var axisHelper = new THREE.AxisHelper(250);
    scene.add(axisHelper);
    //循环渲染
    function render() {
        //渲染场景、 摄像机
        renderer.render(scene, camera);
        //请求再次执行渲染函数render
        requestAnimationFrame(render);
        //boxMesh绕z轴旋转
        //boxMesh.rotateZ(0.01);
    };
    //执行循环渲染
    render();
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}