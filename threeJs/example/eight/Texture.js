var Example = Example || {};

/**
 * @desc 纹理对象Texture队列、偏移、旋转
 * Texture对象
 * 1,属性:重复、偏移、旋转等属性
 * 纹理的matrix属性:
 * a,旋转、平移改变matrix
 * b,本质repeat(缩放矩阵)、rotation(旋转矩阵)、offset(平移矩阵)
 * c.offset、repeat、rotation 默认不会改变faceVertexUvs
 * 2,方法
 * transformUv(纹理方法)、uv.applyMatrix3(this.matrix);
 * 3,webgl封装
 * Texture.js —— Texture对象
 * WebGLTexture.js:a,渲染器解析Texture对象 b,WebGL纹理相关API封装(gl.bingTexture、gl.activeTexture)
 */
Example.Texture = function () {
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

    var textureLoader = new THREE.TextureLoader(); // 纹理加载器
    var texture = textureLoader.load('resources/o.png');
    // 设置阵列模式   默认ClampToEdgeWrapping  RepeatWrapping：阵列  镜像阵列：MirroredRepeatWrapping
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    // uv两个方向纹理重复数量
    texture.repeat.set(4, 2);
    // 偏移效果
    texture.offset = new THREE.Vector2(0.5, 0.5)

    //创建平面贴图模型
    var geometry = new THREE.PlaneGeometry(100, 100);
    var material = new THREE.MeshBasicMaterial({
        map: texture
    });
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    /**
     * 创建一个设置重复纹理的管道
     */
    var curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-80, -40, 0),
        new THREE.Vector3(-70, 40, 0),
        new THREE.Vector3(70, 40, 0),
        new THREE.Vector3(80, -40, 0)
    ]);
    var tubeGeometry = new THREE.TubeGeometry(curve, 100, 0.6, 50, false);
    var textureLoader = new THREE.TextureLoader();
    var texture = textureLoader.load('resources/o.png');
    // 设置阵列模式为 RepeatWrapping
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    // 设置x方向的偏移(沿着管道路径方向)，y方向默认1
    //等价texture.repeat= new THREE.Vector2(20,1)
    texture.repeat.x = 20;
    var tubeMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
    });

    var tubeMesh = new THREE.Mesh(tubeGeometry, tubeMaterial);
    scene.add(tubeMesh);

    /**
     * 草地效果
     */
    var grassGeometry = new THREE.PlaneGeometry(200, 200); //矩形平面
    // 加载树纹理贴图
    var grassTexture = new THREE.TextureLoader().load('resources/g.png');
    // 设置阵列
    grassTexture.wrapS = THREE.RepeatWrapping;
    grassTexture.wrapT = THREE.RepeatWrapping;
    // uv两个方向纹理重复数量
    grassTexture.repeat.set(10, 10);
    var grassMaterial = new THREE.MeshBasicMaterial({
        map: grassTexture,
    });
    var grassMesh = new THREE.Mesh(grassGeometry, grassMaterial); //网格模型对象Mesh
    scene.add(grassMesh); //网格模型添加到场景中
    grassMesh.rotateX(-Math.PI / 2);

    // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
    var axisHelper = new THREE.AxisHelper(250);
    scene.add(axisHelper);

    //循环渲染
    function render() {
        //渲染场景、 摄像机
        renderer.render(scene, camera);
        //请求再次执行渲染函数render
        requestAnimationFrame(render);
        // 使用加减法可以设置不同的运动方向
        // 设置纹理偏移
        texture.offset.x -= 0.06
    };
    //执行循环渲染
    render();
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}