var Example = Example || {};

/**
 * @desc 层级模型节点命名、查找、遍历
 */
Example.GroupPlayer = function () {
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

    // 头部网格模型和组
    var headMesh = sphereMesh(10, 0, 0, 0);
    headMesh.name = "脑壳";
    var leftEyeMesh = sphereMesh(1, 8, 5, 4);
    leftEyeMesh.name = "左眼";
    var rightEyeMesh = sphereMesh(1, 8, 5, -4);
    rightEyeMesh.name = "右眼";
    var headGroup = new THREE.Group();
    headGroup.name = "头部";
    headGroup.add(headMesh, leftEyeMesh, rightEyeMesh);
    // 身体网格模型和组
    var neckMesh = cylinderMesh(3, 10, 0, -15, 0);
    neckMesh.name = "脖子";
    var bodyMesh = cylinderMesh(14, 30, 0, -35, 0);
    bodyMesh.name = "腹部";
    var leftHandMesh = cylinderMesh(4, 60, 0, -25, -7);
    leftHandMesh.name = "左手";
    leftHandMesh.rotateX(Math.PI / 2);

    var rightHandMesh = cylinderMesh(4, 60, 0, -25, 14);
    rightHandMesh.name = "右手";
    rightHandMesh.rotateX(-Math.PI / 2);

    var handGroup = new THREE.Group();
    handGroup.name = "手";
    handGroup.add(leftHandMesh, rightHandMesh);
    var leftLegMesh = cylinderMesh(4, 60, 0, -80, -7);
    leftLegMesh.name = "左腿";
    var rightLegMesh = cylinderMesh(4, 60, 0, -80, 7);
    rightLegMesh.name = "右腿";
    var legGroup = new THREE.Group();
    legGroup.name = "腿";
    legGroup.add(leftLegMesh, rightLegMesh);
    var bodyGroup = new THREE.Group();
    bodyGroup.name = "身体";
    bodyGroup.add(neckMesh, bodyMesh, legGroup, handGroup);
    // 人Group
    var personGroup = new THREE.Group();
    personGroup.name = "人";
    personGroup.add(headGroup, bodyGroup);
    personGroup.translateY(50);
    scene.add(personGroup);

    // 球体网格模型创建函数
    function sphereMesh(R, x, y, z) {
        var geometry = new THREE.SphereGeometry(R, 25, 25); //球体几何体
        var material = new THREE.MeshPhongMaterial({
            color: 0x0000ff
        }); //材质对象Material
        var mesh = new THREE.Mesh(geometry, material); // 创建网格模型对象
        mesh.position.set(x, y, z);
        return mesh;
    }
    // 圆柱体网格模型创建函数
    function cylinderMesh(R, h, x, y, z) {
        var geometry = new THREE.CylinderGeometry(R, R, h, 25, 25); //圆柱形几何体
        var material = new THREE.MeshPhongMaterial({
            color: 0x0000ff
        }); //材质对象Material
        var mesh = new THREE.Mesh(geometry, material); // 创建网格模型对象
        mesh.position.set(x, y, z);
        return mesh;
    }

    //递归遍历方法
    scene.traverse(function (obj) {
        if (obj.type === "Group") {
            console.log(obj.name);
        }
        if (obj.type === "Mesh") {
            console.log('  ' + obj.name);
            obj.material.color.set(0xffff00);
        }
        if (obj.name === "左眼" | obj.name === "右眼") {
            obj.material.color.set(0x000000);
        }
        // 打印id属性
        console.log(obj.id);
        // 打印该对象的父对象
        console.log(obj.parent);
        // 打印该对象的子对象
        console.log(obj.children);
    });

    //查找某个具体的模型
    // 遍历查找scene中复合条件的子对象，并返回id对应的对象
    var idNode = scene.getObjectById(4);
    console.log('GroupPlayer isNode = ', idNode);
    // 遍历查找对象的子对象，返回name对应的对象（name是可以重名的，返回第一个）
    var nameNode = scene.getObjectByName("左腿");
    nameNode.material.color.set(0xff0000);

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