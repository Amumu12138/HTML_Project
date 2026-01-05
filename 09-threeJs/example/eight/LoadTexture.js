var Example = Example || {};

/**
 * @desc 纹理贴图
 * 一、基础类型介绍
 * map(颜色贴图)、normalMap(法线贴图)、bumpMap(凹凸贴图)、envMap(环境贴图)
 * specularMap(高光贴图)、lightMap(光照贴图)、metaInessMap(金属度贴图)、
 * roughnessMap(粗糙度贴图)、emissiveMap(发光贴图)
 * 二、创建纹理贴图
 * 1,TextureLoader纹理加载对象
 * load()方法加载纹理图片成功后返回一个纹理对象Texture,回调函数参数：纹理对象Texture
 * 异步加载:加载后调用render方法,或者一直循环渲染
 * 2,网格模型Mesh
 * 几何体Geometry:顶点uv坐标数据
 * 材质Material:材质的纹理贴图属性map,值为纹理对象texture
 * 3,纹理对象Texture
 * image属性;image对象;html的img元素
 * 4,图片加载器ImageLoader
 * 加载一张图片,返回一个image对象,可以用来生成纹理
 * 内部使用,文件加载器FileLoader
 * 5,纹理贴图
 * 图片宽高最好是2的次方(比如512*512、64*64)
 * 支持常见的jpg、png等格式
 * 6,协作:如何映射
 * 3D美术:创建模型和纹理贴图,纹理贴图如何映射在几何体上
 * 程序员:解析3D美术导出的资源
 * 纹理贴图如何映射在几何体上,一般美术导出的模型会设置好,程序员只需要解析显示即可
 */
Example.LoadTexture = function () {
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

    // 纹理贴图映射到一个矩形平面上
    var geometry = new THREE.PlaneGeometry(100, 100); //矩形平面
    // TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
    var textureLoader = new THREE.TextureLoader();
    // 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
    textureLoader.load('resources/g.png', function (texture) {
        var material = new THREE.MeshBasicMaterial({
            // color: 0x0000ff,
            // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
            map: texture, //设置颜色贴图属性值
        }); //材质对象Material
        var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        scene.add(mesh); //网格模型添加到场景中
    });

    //绘制正方体贴图
    var geometry1 = new THREE.BoxGeometry(50, 50, 50);
    var material1 = null;
    textureLoader.load('resources/panda.jpg', function (texture) {
        material1 = new THREE.MeshBasicMaterial({
            map: texture
        });
        var mesh1 = new THREE.Mesh(geometry1, material1);
        scene.add(mesh1);
        //沿x轴正方向平移
        mesh1.translateX(100);
    });

    //绘制球形贴图
    var geometry2 = new THREE.SphereGeometry(30, 100, 100);
    var material2 = null;
    textureLoader.load('resources/o.png', function (texture) {
        material2 = new THREE.MeshBasicMaterial({
            map: texture
        });
        var mesh2 = new THREE.Mesh(geometry2, material2);
        scene.add(mesh2);
        //沿z轴正方向平移
        mesh2.translateZ(50);
    });

    var geometry3 = new THREE.PlaneGeometry(100, 100); //矩形平面
    // 图片加载器
    var ImageLoader = new THREE.ImageLoader();
    // load方法回调函数，按照路径加载图片，返回一个html的元素img对象
    ImageLoader.load('resources/w.png', function (img) {
        // image对象作为参数，创建一个纹理对象Texture
        var texture = new THREE.Texture(img);
        // 下次使用纹理时触发更新
        texture.needsUpdate = true;
        var material3 = new THREE.MeshBasicMaterial({
            map: texture, //设置纹理贴图
        });
        var mesh3 = new THREE.Mesh(geometry3, material3); //网格模型对象Mesh
        scene.add(mesh3); //网格模型添加到场景中
        mesh3.translateZ(-50);
    });

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