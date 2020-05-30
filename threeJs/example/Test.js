var Example = Example || {};

/**
 * @decs threeJs 测试案例
 */
Example.Test = function () {
    //创建3D场景、相机和渲染器
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //生成一个立方体,添加到场景中
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({
        color: 0x00ff00
    });

    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    //将相机拉远
    camera.position.z = 5;

    //渲染场景
    // var animate = function () {
    //     //渲染循环
    //     requestAnimationFrame(animate);
    //     //立方体旋转
    //     cube.rotation.x += 0.01;
    //     cube.rotation.y += 0.01;

    //     renderer.render(scene, camera);
    // };

    //animate();

    //执行渲染,r绕y轴旋转
    function render() {
        renderer.render(scene, camera);
        cube.rotateY(0.01);
    }

    setInterval(render, 20);
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}