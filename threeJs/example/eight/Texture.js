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

    //创建平面贴图模型
    var geometry = new THREE.PlaneGeometry(100, 100);
    var material = new THREE.MeshBasicMaterial({
        map: texture
    });
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

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