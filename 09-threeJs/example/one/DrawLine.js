var Example = Example || {};

/**
 * @desc 画线
 */
Example.DrawLine = function () {
    //创建渲染器
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //创建摄像机
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight,
        1, 500);
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    //创建场景
    var scene = new THREE.Scene();

    //创建一个红色材质
    var material = new THREE.LineBasicMaterial({
        color: 0xff0000
    });

    //创建一个几何形状：从坐标(-20, 0, 0)经过(0,0,0)到达目标坐标(20,0,0)
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-20, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, 0, 0));
    geometry.vertices.push(new THREE.Vector3(20, 0, 0));

    //创建线条
    var line = new THREE.Line(geometry, material);

    //创建一个三角形
    var geometryTri = new THREE.Geometry();
    geometryTri.vertices.push(new THREE.Vector3(-20, 20, 0));
    geometryTri.vertices.push(new THREE.Vector3(0, 40, 0));
    geometryTri.vertices.push(new THREE.Vector3(20, 20, 0));
    geometryTri.vertices.push(new THREE.Vector3(-20, 20, 0));

    //创建线条
    var triangle = new THREE.Line(geometryTri, material);

    //将线条添加到场景中,并渲染
    scene.add(line);
    scene.add(triangle);
    renderer.render(scene, camera);
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}