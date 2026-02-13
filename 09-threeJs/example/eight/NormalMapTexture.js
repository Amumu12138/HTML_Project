var Example = Example || {};

/**
 * @desc 凹凸贴图bumpMap和法线贴图normalMap
 * 一、法线贴图
 * 1,法线贴图通过RGB三个分量分别表示法向量的xyz三个方向
 * 2,通过图片保留几何体表面的几何体
 * 3,协作:
 * a,3D美术:绘制精模,简模;通过精模烘培出法线贴图;导出简模和法线贴图
 * b,程序员:解析导出的模型和法线贴图
 * 4,好处:
 * a,低模+法线贴图 = 高模
 * b,降低模型大小,减少顶点的计算
 * c,节约顶点数量：(精模)3D美术烘培使用、(简模)导出给程序员使用
 * 二、凹凸贴图
 * 1,图片像素的灰度值表示几何体表面的高低深度
 * 2,如果定义了法线贴图,则将忽略该贴图
 * 三、材质对象
 * 1,没有凹凸、法线贴图属性:MeshLambertMaterial、MeshBasicMaterial
 * 2,高亮属性:MeshPhongMaterial
 * a,颜色纹理贴图:map
 * b,凹凸贴图:{bumpMap: Texture, bumpScale: Float//表示深浅程度,默认值为1}
 * c,法线贴图:{nolmalMap: Texture,normalScale: Vector2 //表示深浅程度,默认值是Vecrtor2设置为(1.1)}
 */
Example.NormalMapTexture = function () {
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

    //创建一个立方体 (测试无效:法线贴图有问题，没有法线光照信息
    var boxGeometry = new THREE.BoxGeometry(50, 50, 50);
    //Texture创建一个纹理加载器对象,可以加载图片作为几何体纹理
    var textureLoader = new THREE.TextureLoader();
    //加载法线贴图
    var textureNormal = textureLoader.load("resources/threejs54normal3_256.jpg");
    var boxMaterial = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        //法线贴图
        normalMap: textureNormal,
        //设置深浅程度
        normalScale: new THREE.Vector2(3, 3)
    });
    var boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(boxMesh);

    //凹凸贴图测试 (测试无效:凹凸贴图有问题，没有凹凸数据点信息
    var wallGeometry = new THREE.PlaneGeometry(100, 100);
    //  var textureLoader = new THREE.TextureLoader();
    // 加载颜色纹理贴图
    var texture = textureLoader.load('resources/threejs54_wall_1.jpg');
    // 加载凹凸贴图
    var textureBump = textureLoader.load('resources/threejs54_wall_0.jpg');
    //材质对象Material
    var wallMaterial = new THREE.MeshPhongMaterial({
        map: texture, // 普通纹理贴图
        bumpMap: textureBump, //凹凸贴图
        bumpScale: 3, //设置凹凸高度，默认值1。
    });
    var wallMesh = new THREE.Mesh(wallGeometry, wallMaterial);
    scene.add(wallMesh);
    wallMesh.translateZ(-100);

    //添加光源
    // var pointLight = new THREE.PointLight(0xffffff);
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
        //boxMesh绕z轴旋转
        //boxMesh.rotateZ(0.01);
    };
    //执行循环渲染
    render();
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}