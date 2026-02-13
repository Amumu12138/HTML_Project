var Example = Example || {};

/**
 * @desc stl格式模型加载
 * stl格式的三维模型不包含材质Material信息,只包含几何体顶点数据
 * 的信息,可以简单理解为几何体对象Geometry。可以直接用记事本或代码编辑器
 * 打开stl文件查看stl数据结构
 */
Example.STLLoader = function () {
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
    /**
     * stl数据加载
     */
    var loader = new THREE.STLLoader();
    loader.load("resources/stl/binary/colored.stl", function (geometry) {
        var material = new THREE.MeshLambertMaterial({
            color: 0xffffff
        });
        var mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        mesh.position.set(0, 0, 0);
        mesh.scale.set(10, 10, 10);
    });

    // var geometryA = new THREE.BoxGeometry(20, 20, 20);
    // var materialA = new THREE.MeshLambertMaterial({
    //     color: 0xff0000
    // });
    // var meshA = new THREE.Mesh(geometryA, materialA);
    // scene.add(meshA);

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

    //执行渲染,r绕y轴旋转
    function render() {
        renderer.render(scene, camera);
        // //请求再次执行渲染函数render
        requestAnimationFrame(render);
    };

    render();
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}