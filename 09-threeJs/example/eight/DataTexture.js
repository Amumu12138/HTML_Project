var Example = Example || {};

/**
 * @desc 数据纹理对象DataTexture
 */
Example.DataTexture = function () {
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

    //生成一张RGBA图
    var geometry = new THREE.PlaneGeometry(128, 128); //矩形平面
    /**
     * 创建纹理对象的像素数据
     */
    var width = 32; //纹理宽度
    var height = 32; //纹理高度
    var size = width * height; //像素大小
    var data = new Uint8Array(size * 4); //size*4：像素在缓冲区占用空间
    for (let i = 0; i < size * 4; i += 4) {
        // 随机设置RGB分量的值
        data[i] = 255 * Math.random();
        data[i + 1] = 255 * Math.random();
        data[i + 2] = 255 * Math.random();
        // 设置透明度分量A
        data[i + 3] = 255 * 0.5;
    }
    // 创建数据文理对象   RGBA格式：THREE.RGBAFormat
    var texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat);
    texture.needsUpdate = true; //纹理更新
    //打印纹理对象的image属性
    console.log(texture.image);

    var material = new THREE.MeshPhongMaterial({
        map: texture, // 设置纹理贴图
        transparent: true, //允许透明设置
    });
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    //沿Y轴旋转45度
    mesh.rotateY(Math.PI / 4);

    //添加光源
    var light = new THREE.AmbientLight(0xffffff);
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
    };
    //执行循环渲染
    render();
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}