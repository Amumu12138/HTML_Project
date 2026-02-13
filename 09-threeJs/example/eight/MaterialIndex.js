var Example = Example || {};

/**
 * @desc 数组材质、材质索引materialIndex
 * 一、Geometry
 * 1,三角面Face3 
 * 材质materialIndex属性、材质索引materialIndex、
 * 一个几何体对象的不同三角面Face3可以通过材质索引设置不同的材质
 * threeJs立方体、球体等几何体API都有默认的材质索引设置materialIndex
 * 2,BoxGeometry
 * 默认每一个面的包含的Face3对应一个材质对象
 * 纹理贴图:默认每一个面都采集整张纹理贴图
 * 3,默认数组材质需要材质对象元素数量:球体、平面(1) 圆柱体(3) 立方体(6)
 * 4,所谓数组材质:就是threeJs几何体API算法自动设置系列Face3的材质索引属性materialIndex
 * 二、BufferGeometry
 * groups属性：Array
 * 元素:{start: Integer, count: Integer, materialIndex: Integer}
 * 材质索引materialIndex
 * 材质count对应顶点数量
 * start对应第几个顶点的下标
 * 三、材质索引的作用
 * a,一个几何体对象不同三角形可以对应不同材质,或者说一个网格模型可以具有多个材质对象
 */
Example.MaterialIndex = function () {
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
    //var geometry = new THREE.PlaneGeometry(204, 102, 4, 4); //矩形平面
    //var geometry = new THREE.SphereGeometry(60, 25, 25); //球体
    //var geometry = new THREE.CylinderGeometry(60, 60, 25, 25); //圆柱
    //
    // 材质对象1
    var material_1 = new THREE.MeshBasicMaterial({
        color: 0xffffff
    })
    var textureLoader = new THREE.TextureLoader(); // 纹理加载器
    var texture = textureLoader.load('resources/w.png'); // 加载图片，返回Texture对象
    // 材质对象2
    var material_2 = new THREE.MeshBasicMaterial({
        map: texture, // 设置纹理贴图
        // wireframe: true,
    });
    // 设置材质数组
    var materialArr = [material_2, material_1, material_2, material_1, material_2, material_1];

    // 设置数组材质对象作为网格模型材质参数
    var mesh = new THREE.Mesh(geometry, materialArr); //网格模型对象Mesh
    scene.add(mesh); //网格模型添加到场景中

    //var geometry1 = new THREE.BoxGeometry(100, 100, 100); //立方体
    var geometry1 = new THREE.SphereGeometry(40, 25, 25); //球体
    // 你可以测试BoxGeometry、PlaneGeometry、CylinderGeometry三角形面的材质索引
    // 查看face3对象的materialIndex属性
    console.log(geometry1.faces);
    geometry1.faces.forEach(element => {
        console.log("MaterialIndex element = ", element.materialIndex);
    });

    //矩形平面
    var geometr2 = new THREE.PlaneGeometry(204, 102, 4, 4);
    // 材质对象1
    var material2_1 = new THREE.MeshBasicMaterial({
        color: 0xffff3f,
        // wireframe:true,
    })
    // 材质对象2
    var material2_2 = new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        // wireframe:true,
    }); //材质对象Material
    // 数组材质
    var materialArr2 = [material2_1, material2_2];
    // 设置几何体的材质索引(对于PlaneGeometry而言所有Face3的材质索引默认0)
    geometr2.faces[4].materialIndex = 1;
    geometr2.faces[5].materialIndex = 1;
    var mesh2 = new THREE.Mesh(geometr2, materialArr2); //网格模型对象Mesh
    scene.add(mesh2);
    //沿z轴正方向平移
    mesh2.translateZ(-100);

    // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
    var axisHelper = new THREE.AxisHelper(250);
    scene.add(axisHelper);

    //循环渲染
    function render() {
        //渲染场景、 摄像机
        renderer.render(scene, camera);
        //mesh绕y轴旋转
        mesh.rotateY(0.01);
        //请求再次执行渲染函数render
        requestAnimationFrame(render);
    };
    //执行循环渲染
    render();
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}