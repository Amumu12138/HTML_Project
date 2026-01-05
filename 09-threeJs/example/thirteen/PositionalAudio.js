var Example = Example || {};

/**
 * @desc 位置音频PositionalAudio
 */
var PosAudio = null;
Example.PositionalAudio = function () {
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

    //创建用来定位音源的网格模型
    var geometry = new THREE.BoxGeometry(50, 50, 50);
    var material = new THREE.MeshBasicMaterial({
        color: 0xff0000
    });
    var audioMesh = new THREE.Mesh(geometry, material);
    audioMesh.position.set(0, 0, 0);
    scene.add(audioMesh);

    //创建一个监听者
    var listener = new THREE.AudioListener();
    //监听者绑定到相机对象
    camera.add(listener);
    //创建一个位置音频对象,监听者作为参数,音频和监听者关联
    PosAudio = new THREE.PositionalAudio(listener);
    //音源绑定到一个网格模型上
    audioMesh.add(PosAudio);
    //创建一个音频加载器对象
    var audioLoader = new THREE.AudioLoader();
    //加载音频文件,返回一个音频缓冲区对象作为回调函数参数
    audioLoader.load('resources/sounds/358232_j_s_song.mp3', function (audioBuffer) {
        console.log("ThreeJS PositionalAudio audioBuffer = ", audioBuffer);
        //音频缓冲区对象关联到音频对象audio
        PosAudio.setBuffer(audioBuffer);
        PosAudio.setLoop(true);
        PosAudio.setVolume(1.0);
        PosAudio.setRefDistance(200); //参数值越大,声音越大
        //PosAudio.play();
    });

    //执行渲染操作 指定场景、相机作为参数
    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
    render();
};

//播放音频按钮响应
function AudioClick1() {
    console.log("Amumu PosAudio play");
    PosAudio.play();
}

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}