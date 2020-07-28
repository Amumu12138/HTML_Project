var Example = Example || {};

/**
 * @decs 飞机小游戏
 */
Example.AirPlane = function () {
    init();

    //初始化
    function init(event) {
        createScene();
        createLight();
        createPlane();
        createSea();
        createSky();
        //循环函数,用于最后每一个帧的重绘,实现动画效果
        loop();
        //注册鼠标移动监听
        //document.addEventListener("mousemove", handleMouse, false);
    }

    //创建场景
    function createScene() {
        HEIGHT = window.innerHeight;
        WIDTH = window.innerWidth;

        //创建ThreeJs中场景
        scene = new THREE.Scene();
        //使用雾化效果
        scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
        //在场景中添加一个三维坐标系,便于观察图形的位置
        var axes = new THREE.AxisHelper(200);
        scene.add(axes);
        //宽高比设置为窗口大小,避免图案的变形
        aspectRatio = WIDTH / HEIGHT;
        fieldOfView = 50;
        nearPlane = 0.1;
        farPlane = 1000;
        //创建一个透视摄像机
        camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        camera.position.set(200, 300, 200);
        camera.lookAt(scene.position);

        //声明一个webgl的渲染器
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(WIDTH, HEIGHT);
        document.body.appendChild(renderer.domElement);
    }

    //创建灯光
    function createLight() {
        hemisphereLight = new THREE.HemisphereLight(0xbbbbbb, 0x000000, 0.9);
        ambientLight = new THREE.AmbientLight(0xffffff);
        shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);
        //阴影光照设置
        shadowLight.castShadow = true;
        shadowLight.shadow.camera.left = -400;
        shadowLight.shadow.camera.right = 400;
        shadowLight.shadow.camera.top = 400;
        shadowLight.shadow.camera.bottom = -400;
        shadowLight.shadow.camera.near = 1;
        shadowLight.shadow.camera.far = 1000;
        shadowLight.shadow.camera.width = 2048;
        shadowLight.shadow.camera.height = 2048;
        //每次设置灯光需要都添加到场景中
        scene.add(hemisphereLight);
        scene.add(shadowLight);
        scene.add(ambientLight);
    }

    //创建飞机
    function createPlane() {

    }

    function sea() {
        var seaGeom = new THREE.CylinderGeometry(600, 600, 800, 40, 10);
        seaGeom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
        var seaMat = new THREE.MeshPhongMaterial({
            color: Color.blue,
            transparent: true,
            opacity: 0.6,
            shading: THREE.FlatShading
        });

        var seaMesh = new THREE.Mesh(seaGeom, seaMat);
        seaMesh.receiveShadow = true;

        return seaMesh;
    }

    var seaModel;
    //创建大海
    function createSea() {
        seaModel = new sea();
        seaModel.position.y = -600;
        scene.add(seaModel);
    }

    //构造云层对象
    function Cloud() {
        var cloudObj = new THREE.Object3D();
        var cloudGeom = new THREE.BoxGeometry(20, 20, 20);
        var cloudMat = new THREE.MeshPhongMaterial({
            color: Color.white
        });

        var nBlocs = 3 + Math.floor(Math.random() * 3);
        //实现位置随机、大小随机
        for (var i = 0; i < nBlocs; i++) {
            var m = new THREE.Mesh(cloudGeom, cloudMat);
            m.position.x = i * 15;
            m.position.y = Math.random() * 10;
            m.position.z = Math.random() * 10;
        }
    }

    //创建天空
    function createSky() {

    }

    //循环帧
    function loop() {

        //渲染
        renderer.render(scene, camera);
        //循环渲染
        requestAnimationFrame(loop);
    }
};

var Color = {
    red: 0xf25346,
    white: 0xd8d0d1,
    brown: 0x59332e,
    brownDark: 0x23190f,
    pink: 0xF5986E,
    yellow: 0xf4ce93,
    blue: 0x0000ff
}

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}