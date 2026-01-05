var Example = Example || {};

/**
 * @desc 编辑关键帧并解析播放
 * 帧动画
 * 一、帧动画应用:骨骼动画、变形目标动画、淡入淡出等
 * 二、编辑
 * a,关键帧KeyframeTrack：位置、颜色等属性随着时间变化、离散时间点对应离散属性值
 * b,剪辑AnimationClip: 多个关键帧构成一个剪辑clip对象
 * 三、播放
 * a,操作AnimationAction: 设置播放方式、开始播放、暂停播放
 * b,混合器AnimationMixer: 一个对象及其子对象的动画播放器
 */
Example.AnimationAction = function () {
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

    //创建两个网格模型并设置一个父对象group
    var group = new THREE.Group();
    var boxGeometry = new THREE.BoxGeometry(20, 20, 20);
    var boxMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000
    });
    var boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh.name = "box";

    var sphereGeometry = new THREE.SphereGeometry(20, 100, 100);
    var sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x0000ff
    });
    var sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphereMesh.translateX(50);
    sphereMaterial.name = "sphere";
    group.add(boxMesh);
    group.add(sphereMesh);
    scene.add(group);

    //编辑group子对象网格模型boxMesh和sphereMesh的帧动画数据
    var times = [0, 10]; //关键帧时间数据,离散的时间点序列
    var values = [0, 0, 0, 150, 0, 0]; //与时间点对应的值组成的数组
    //创建位置关键帧对象:0时刻对应位置0,0,0;10时刻对应位置150,0,0
    var posTrack = new THREE.KeyframeTrack('box.position', times, values);
    var posTrackBack = new THREE.KeyframeTrack('box.position', [20, 30], [150, 0, 0, 0, 0, 0]);
    //创建颜色关键帧对象：10时刻对应颜色1,0,0;20时刻对用颜色0,0,1
    var colorKF = new THREE.KeyframeTrack('box.material.color', [10, 20], [1, 0, 0, 0, 0, 1]);
    var colorKFBack = new THREE.KeyframeTrack('box.material.color', [30, 40], [0, 0, 1, 1, 0, 0]);
    //创建名为sphere对象的关键帧数据, 从0-20时间段,尺寸scale缩放
    var scaleTrack = new THREE.KeyframeTrack('sphere.scale', [0, 20], [1, 1, 1, 0.2, 0.2, 0.2]);
    var scaleTrackBack = new THREE.KeyframeTrack('sphere.scale', [20, 40], [0.2, 0.2, 0.2, 1, 1, 1]);
    // duration决定了默认的播放时间，一般取所有帧动画的最大时间
    // duration偏小，帧动画数据无法播放完，偏大，播放完帧动画会继续空播放
    var duration = 40;
    // 多个帧动画作为元素创建一个剪辑clip对象，命名"default"，持续时间duration
    var clip = new THREE.AnimationClip("default", duration, [posTrack, colorKF, posTrackBack, colorKFBack, scaleTrack, scaleTrackBack]);

    //播放编辑好的关键帧数据
    var mixer = new THREE.AnimationMixer(group); //group作为混合器的参数,可以播放group中所有子对象的帧动画
    //剪辑clip作为参数,通过混合器clipAction方法返回一个操作对象AnimationAction
    var animationAction = mixer.clipAction(clip);
    //通过操作Action设置播放方式
    animationAction.timeScale = 1; //调节播放速度,默认为1
    animationAction.play(); //开始播放
    /**
     * 光源设置
     */
    //点光源
    var point = new THREE.AmbientLight(0xffffff);
    point.position.set(400, 200, 300); //点光源位置
    scene.add(point); //点光源添加到场景中

    // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
    var axisHelper = new THREE.AxisHelper(250);
    scene.add(axisHelper);

    //创建一个时钟对象Clock
    var clock = new THREE.Clock();
    //执行渲染操作 指定场景、相机作为参数
    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);

        // 更新混合器相关的时间,clock.getDelta()方法获得两帧的时间间隔
        mixer.update(clock.getDelta());
    }
    render();
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}