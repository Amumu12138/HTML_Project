var Example = Example || {};

/**
 * @desc 旋转动画、requestAnimaionFrame周期性渲染
 */
Example.RequestAnimationFrame = function () {

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
    // function render() {
    //     renderer.render(scene, camera);
    //     cube.rotateY(0.01);
    //     //请求再次执行渲染函数render
    //     requestAnimationFrame(render);
    // };

    //均匀旋转
    let T0 = new Date(); //上次时间
    function render() {
        let T1 = new Date(); //本次时间
        let t = T1 - T0; //时间差
        console.log("Amumu T0 = " + T0 + " T1 = " + T1 + " t = " + t);
        T0 = T1; //把本次时间赋值给上次时间
        requestAnimationFrame(render);
        renderer.render(scene, camera); //执行渲染操作
        cube.rotateY(0.001 * t); //旋转角速度0.001弧度每毫秒
    }

    render();
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
};