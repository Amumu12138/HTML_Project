//ThreeJs第一个3D场景
var Example = Example || {};

/**
 * @desc 材质效果
 */
Example.Material = function () {
    /**
     * 创建场景对象Scene
     */
    var scene = new THREE.Scene();
    /**
     * 创建网格模型
     */
    //创建一个立方体几何对象Geometry
    var geometry = new THREE.BoxGeometry(50, 50, 50);
    //材质对象Material
    var material = new THREE.MeshLambertMaterial({
        color: 0xff0000,
        opacity: 0.7,
        transparent: true
    });
    //设置材质透明度
    material.opacity = 0.1;
    material.transparent = true;
    //高亮材质对象
    var sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        specular: 0x4488ee,
        shininess: 12
    });
    //基础网格材质,不受光照影响的材质
    var basicMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000
    });
    //PBR物理材质，相比较高光Phong材质可以更好的模拟金属、玻璃等效果
    var standardMaterial = new THREE.MeshStandardMaterial({
        color: 0xff0000
    });

    //网格模型对象Mesh
    var mesh = new THREE.Mesh(geometry, standardMaterial);
    //网格模型添加到场景中
    scene.add(mesh);
    /**
     * 光源设置
     */
    //点光源
    var point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300); //点光源位置
    scene.add(point); //点光源添加到场景中

    /**
     * 相机设置
     */
    var width = window.innerWidth; //窗口宽度
    var height = window.innerHeight; //窗口高度
    var k = width / height; //窗口宽高比
    var s = 100; //三维场景显示范围控制系数，系数越大，显示的范围越大
    //创建相机对象
    var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(200, 300, 200); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
    /**
     * 创建渲染器对象
     */
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height); //设置渲染区域尺寸
    renderer.setClearColor(0x000000, 1); //设置背景颜色
    document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
    //执行渲染操作   指定场景、相机作为参数
    renderer.render(scene, camera);
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}