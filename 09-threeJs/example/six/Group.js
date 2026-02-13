var Example = Example || {};

/**
 * @desc 组对象Group、层级模型
 */
Example.Group = function () {
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

    //创建两个网格模型mesh1、mesh2
    var geometry = new THREE.BoxGeometry(20, 20, 20);
    var material = new THREE.MeshLambertMaterial({
        color: 0x0000ff
    });
    //创建一个组
    var group = new THREE.Group();
    var mesh1 = new THREE.Mesh(geometry, material);
    var mesh2 = new THREE.Mesh(geometry, material);
    //mesh2沿x轴正方向平移25
    mesh2.translateX(25);
    //把mesh1、mesh2模型插入到组group中,作为group子对象
    group.add(mesh1);
    group.add(mesh2);
    //把group插入到场景中
    scene.add(group);

    //平移groupClone1
    var groupClone1 = group.clone();
    groupClone1.translateY(100);
    scene.add(groupClone1);

    //缩放groupClone2
    var groupClone2 = group.clone();
    groupClone2.scale.set(0.2, 0.2, 0.2);
    groupClone2.translateX(50);
    scene.add(groupClone2);

    //旋转groupClone3
    var groupClone3 = group.clone();
    groupClone3.rotateY(Math.PI / 6);
    groupClone3.translateZ(50);
    scene.add(groupClone3);

    //查看子对象children
    //mesh1、mesh2
    console.log('查看group的子对象', group.children);

    //查看并场景对象结构
    //group、groupClone1、groupClone2、groupClone3、PonitLight、AxesHelper
    console.log('查看Scene的子对象', scene.children);

    //remove() 移除该对象方法
    group.remove(mesh2);
    console.log('移除mesh2后,查看group的子对象', group.children);

    scene.remove(group);
    console.log('移除group后,查看scene的子对象', scene.children);

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

    //执行渲染操作   指定场景、相机作为参数
    renderer.render(scene, camera);
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}