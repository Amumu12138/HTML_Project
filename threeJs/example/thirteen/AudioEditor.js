var Example = Example || {};

/**
 * @desc 音频可视化
 */
var audioEditor = null;
var analyser = null; // 声明一个分析器变量

Example.AudioEditor = function () {
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

    /**
     * 创建多个网格模型组成的组对象
     */
    var group = new THREE.Group();
    let N = 128; //控制音频分析器返回频率数据数量
    for (let i = 0; i < N / 2; i++) {
        // var box = new THREE.LineGeometry(10, 100); //创建一个立方体几何对象
        var geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(5 * i - N / 5 - 60, -25, 0));
        geometry.vertices.push(new THREE.Vector3(5 * i - N / 5 - 60, 0, 0));
        geometry.vertices.push(new THREE.Vector3(5 * i - N / 5 - 60, 25, 0));
        var material = new THREE.LineBasicMaterial({
            color: 0x0000ff
        }); //材质对象
        var mesh = new THREE.Line(geometry, material); //网格模型对象
        // 长方体间隔20，整体居中
        //mesh.position.set(20 * i - N / 2 * 10, 0, 0);
        mesh.rotateY(Math.PI / 4);
        group.add(mesh);
    }
    scene.add(group);

    var listener = new THREE.AudioListener() //监听者
    audioEditor = new THREE.Audio(listener); //非位置音频对象
    var audioLoader = new THREE.AudioLoader(); //音频加载器
    // 加载音频文件
    audioLoader.load('resources/sounds/358232_j_s_song.mp3', function (AudioBuffer) {
        audioEditor.setBuffer(AudioBuffer); // 音频缓冲区对象关联到音频对象audio
        audioEditor.setLoop(true); //是否循环
        audioEditor.setVolume(0.5); //音量
        //audio.play(); //播放
        // 音频分析器和音频绑定，可以实时采集音频时域数据进行快速傅里叶变换
        analyser = new THREE.AudioAnalyser(audioEditor, 2 * N);
    });

    // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
    var axisHelper = new THREE.AxisHelper(250);
    scene.add(axisHelper);
    //执行渲染操作 指定场景、相机作为参数
    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);

        if (analyser) {
            // 获得频率数据N个
            var arr = analyser.getFrequencyData();
            // console.log(arr);
            // 遍历组对象，每个网格子对象设置一个对应的频率数据
            group.children.forEach((elem, index) => {
                elem.scale.y = arr[index] / 80;
                elem.material.color.r = arr[index] / 200;
            });
        }
    }
    render();
};

//播放音频按钮响应
function AudioClick2() {
    console.log("Amumu audio play");
    audioEditor.play();
}

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}