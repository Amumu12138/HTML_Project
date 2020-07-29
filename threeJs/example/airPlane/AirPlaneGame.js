var Example = Example || {};

/**
 * @decs 飞机小游戏
 */
Example.AirPlane = function () {
    init();

    var mousePos;
    //初始化
    function init(event) {
        mousePos = {
            x: 0,
            y: 0
        };

        createScene();
        createLight();
        createPlane();
        createSea();
        createSky();

        //注册鼠标移动监听
        document.addEventListener("mousemove", handleMouse, false);

        //循环函数,用于最后每一个帧的重绘,实现动画效果
        loop();

    }


    //控制飞机移动
    function handleMouse(event) {
        // 我们要把鼠标的坐标值转换成webgl系统中规格化的数值，从-1到1
        // 这种转换很简单的伙计！tx = (x-width/2)/(width/2)

        var tx = -1 + (event.clientX / WIDTH) * 2;

        // y轴在窗口坐标系和webg坐标系的方向是相反的，因此我们把他逆一下就可以


        var ty = 1 - (event.clientY / HEIGHT) * 2;
        mousePos = {
            x: tx,
            y: ty
        };
    }

    function updatePlane() {
        var targetY = 100 + mousePos.y * 75; //控制飞机在y轴25到175的位置
        var targetX = mousePos.x * 195; //控制飞机在x轴-195到195的位置

        // 每一帧移动飞机移动的距离，使飞机最终到达鼠标的位置，这样制造出飞机缓缓飞向指定位置的效果，而不会显得很突兀。
        airPlaneModel.mesh.position.y += (targetY - airPlaneModel.mesh.position.y) * 0.1;
        airPlaneModel.mesh.position.x += (targetX - airPlaneModel.mesh.position.x) * 0.5;
        // 通过剩余距离的长度来计算旋转地幅度，这样飞机如果一次性移动的距离很多相应的旋转幅度就越大，与真实的情况也符合，使动画更加真实。
        airPlaneModel.mesh.rotation.z = (targetY - airPlaneModel.mesh.position.y) * 0.0256;
        airPlaneModel.mesh.rotation.x = (airPlaneModel.mesh.position.y - targetY) * 0.0256;

        airPlaneModel.propeller.rotation.x += 0.3;

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
        camera.position.set(0, 100, 200);
        // camera.lookAt(scene.position);

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

    function sea() {
        this.mesh = new THREE.Object3D();

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

        this.mesh.add(seaMesh);
    }

    var seaModel;
    //创建大海
    function createSea() {
        seaModel = new sea();
        seaModel.mesh.position.y = -600;
        scene.add(seaModel.mesh);
    }

    //构造云层对象
    function cloud() {
        this.mesh = new THREE.Object3D();
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
            m.rotation.z = Math.random() * Math.PI * 2;
            m.rotation.y = Math.random() * Math.PI * 2;
            var s = 0.1 + Math.random() * 0.9;
            m.scale.set(s, s, s);

            m.castShadow = true;
            m.receiveShadow = true;

            this.mesh.add(m);
        }
    }

    function sky() {
        this.mesh = new THREE.Object3D();
        this.nClouds = 20;
        var stepAngle = Math.PI * 2 / this.nClouds;
        for (var i = 0; i < this.nClouds; i++) {
            var c = new cloud();
            var a = stepAngle * i;
            var h = 750 + Math.random() * 200;
            c.mesh.position.y = Math.sin(a) * h;
            c.mesh.position.x = Math.cos(a) * h;
            c.mesh.position.z = -50 - Math.random() * 400;
            c.mesh.rotation.z = -Math.PI / 2 + a;

            var s = 1 + Math.random() * 2;
            c.mesh.scale.set(s, s, s);
            this.mesh.add(c.mesh);
        }
    }

    var skyModel;
    //创建天空
    function createSky() {
        skyModel = new sky();
        skyModel.mesh.position.y = -750;
        scene.add(skyModel.mesh);
    }

    function ariPlane() {
        this.mesh = new THREE.Object3D();

        //制作驾驶舱
        var geomCockPit = new THREE.BoxGeometry(80, 50, 50, 1, 1, 1);
        var matCockPit = new THREE.MeshPhongMaterial({
            color: Color.red,
            shading: THREE.FlatShading
        });
        geomCockPit.vertices[4].y -= 10;
        geomCockPit.vertices[4].z += 20;
        geomCockPit.vertices[5].y -= 10;
        geomCockPit.vertices[5].z += 20;
        geomCockPit.vertices[6].y += 20;
        geomCockPit.vertices[6].z += 20;
        geomCockPit.vertices[7].y += 20;
        geomCockPit.vertices[7].z -= 20;

        var cockpit = new THREE.Mesh(geomCockPit, matCockPit);
        cockpit.castShadow = true;
        cockpit.receiveShadow = true;
        this.mesh.add(cockpit);

        //制作引擎盖
        var geomEngine = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1);
        var matEngine = new THREE.MeshPhongMaterial({
            color: Color.white,
            shading: THREE.FlatShading
        });
        var engine = new THREE.Mesh(geomEngine, matEngine);
        engine.castShadow = true;
        engine.receiveShadow = true;
        this.mesh.add(engine);

        //制作机尾
        var geomTailPlane = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1);
        var matTailPlane = new THREE.MeshPhongMaterial({
            color: Color.red,
            shading: THREE.FlatShading
        });
        var tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
        tailPlane.position.set(-35, 25, 0);
        tailPlane.castShadow = true;
        tailPlane.receiveShadow = true;
        this.mesh.add(tailPlane);

        // 飞机前端旋转的螺旋桨
        var geomPropeller = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1);
        var matPropeller = new THREE.MeshPhongMaterial({
            color: Color.brown,
            shading: THREE.FlatShading
        });
        this.propeller = new THREE.Mesh(geomPropeller, matPropeller);
        this.propeller.castShadow = true;
        this.propeller.receiveShadow = true;

        // 制作螺旋桨
        var geomBlade = new THREE.BoxGeometry(1, 100, 20, 1, 1, 1);
        var matBlade = new THREE.MeshPhongMaterial({
            color: Color.brownDark,
            shading: THREE.FlatShading
        });

        var blade = new THREE.Mesh(geomBlade, matBlade);
        blade.position.set(8, 0, 0);
        blade.castShadow = true;
        blade.receiveShadow = true;
        this.propeller.add(blade);
        this.propeller.position.set(50, 0, 0);
        this.mesh.add(this.propeller);
    }

    var airPlaneModel;
    //创建飞机
    function createPlane() {
        airPlaneModel = new ariPlane();
        airPlaneModel.mesh.scale.set(0.25, 0.25, 0.25);
        airPlaneModel.mesh.position.y = 100;
        scene.add(airPlaneModel.mesh);
    }


    //循环帧
    function loop() {
        airPlaneModel.propeller.rotation.x += 0.3;
        seaModel.mesh.rotation.z += 0.005;
        skyModel.mesh.rotation.z += 0.01;

        updatePlane();
        //airPlaneModel.pilot.updateHairs();

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