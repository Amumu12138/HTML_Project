var Example = Example || {};

/**
 * @desc 鼠标操作三维场景旋转缩放
 */
Example.OrbitControl = function () {
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

    //执行渲染,r绕y轴旋转
    function render() {
        renderer.render(scene, camera);
        // cube.rotateY(0.01);
        // //请求再次执行渲染函数render
        requestAnimationFrame(render);
    };

    render();

    //创建控件对象 缩放： 滚动— 鼠标中键 旋转： 拖动— 鼠标左键
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    //监听鼠标、键盘事件
    //注意开发中不要同时使用requestAnimationFrame()或controls.addEventListener('change', render)调用同一个函数，这样会冲突。
    //controls.addEventListener('change', render);
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
};