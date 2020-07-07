var Example = Example || {};

/**
 * @desc 变形动画geometry.morphTargets
 */
Example.MorphTargets = function () {
    /**
     * 创建场景对象Scene
     */
    var scene = new THREE.Scene();
    /**
     * 相机设置
     */
    var width = window.innerWidth; //窗口宽度
    var height = window.innerHeight; //窗口高度
    var k = width / height; //窗口宽高比
    var s = 100; //三维场景显示范围控制系数，系数越大，显示的范围越大

    //创建相机对象正投影相机
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

    //创建网格模型,并给模型的几何体设置多个变形目标
    var boxGeometry = new THREE.BoxGeometry(50, 50, 50);
    // var boxGeometry = new THREE.BufferGeometry();
    // var vertices = new Float32Array([
    //     0, 0, 0, //顶点1坐标
    //     50, 0, 0, //顶点2坐标
    //     0, 120, 0, //顶点3坐标
    //     0, 0, 10, //顶点4坐标
    //     0, 0, 120, //顶点5坐标
    //     50, 0, 10 //顶点6坐标
    // ]);
    // //创建属性缓冲区对象,3个位一组,表示一个顶点的xyz坐标
    // var attribute = new THREE.BufferAttribute(vertices, 3);
    // //设置几何体attributes属性的位置属性
    // boxGeometry.attributes.position = attribute;
    //为网格模型提供变形目标的数据
    var boxGeometry1 = new THREE.BoxGeometry(100, 5, 100);
    var boxGeometry2 = new THREE.BoxGeometry(5, 200, 5);
    //设置变形目标的数据
    boxGeometry.morphTargets[0] = {
        name: 'target1',
        vertices: boxGeometry1.vertices
    };
    boxGeometry.morphTargets[1] = {
        name: 'target2',
        vertices: boxGeometry2.vertices
    };
    //材质对象
    var boxMaterial = new THREE.MeshLambertMaterial({
        //允许变形
        morphTargets: true,
        color: 0xff0000
    });
    var mesh = new THREE.Mesh(boxGeometry, boxMaterial);
    //888888mesh.morphTargetInfluences[0] = 0.5;
    // mesh.morphTargetInfluences[1] = 1.0;
    scene.add(mesh);

    /**
     * 设置关键帧数据
     */
    // 设置变形目标1对应权重随着时间的变化
    var Track1 = new THREE.KeyframeTrack('.morphTargetInfluences[0]', [0, 10, 20], [0, 1, 0]);
    // 设置变形目标2对应权重随着时间的变化
    var Track2 = new THREE.KeyframeTrack('.morphTargetInfluences[1]', [20, 30, 40], [0, 1, 0]);
    // 创建一个剪辑clip对象，命名"default"，持续时间40
    var clip = new THREE.AnimationClip("default", 40, [Track1, Track2]);

    /**
     * 播放编辑好的关键帧数据
     */
    var mixer = new THREE.AnimationMixer(mesh); //创建混合器
    var AnimationAction = mixer.clipAction(clip); //返回动画操作对象
    AnimationAction.timeScale = 5; //默认1，可以调节播放速度
    // AnimationAction.loop = THREE.LoopOnce; //不循环播放
    // AnimationAction.clampWhenFinished=true;//暂停在最后一帧播放的状态
    AnimationAction.play(); //开始播放
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

    var clock = new THREE.Clock();
    //执行渲染操作 指定场景、相机作为参数
    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);

        //更新混合器相关的时间
        mixer.update(clock.getDelta());
    }
    render();
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}