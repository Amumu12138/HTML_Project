var Example = Example || {};

/**
 * @desc 解析外部模型的帧动画
 */
Example.AnimationObject = function () {
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

    //通过ObjectLoader加载模型文件
    var loader = new THREE.ObjectLoader();
    var mixer = null;
    //加载文件返回一个对象obj
    loader.load('resources/model.json', function (obj) {
        obj.scale.set(5, 5, 5);
        scene.add(obj);
        //obj作为混合器的参数,可以播放obj包含的帧动画数据
        mixer = new THREE.AnimationMixer(obj);
        //剪辑clip作为参数,通过混合器clipAction方法返回一个操作对象AnimationAction
        // var animationAction = mixer.clipAction(obj.animations[0]);
        //animationAction.play();
    });


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

        if (mixer !== null) {
            // 更新混合器相关的时间,clock.getDelta()方法获得两帧的时间间隔
            mixer.update(clock.getDelta());
        }
    }
    render();
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}