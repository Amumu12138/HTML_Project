var Example = Example || {};

/**
 * @desc 正投影相机OrthographicCamera和透视投影相机PerspectiveCamera
 */
Example.Sprite = function () {
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

    //创建sprite模型
    /*1、创建一个画布，记得设置画布的宽高，否则将使用默认宽高，有可能会导致图像显示变形*/
    // let canvas = document.createElement("canvas");
    // canvas.width = 120;
    // canvas.height = 120;
    // /*2、创建图形，这部分可以去看w3c canvas教程*/
    // let ctx = canvas.getContext("2d");
    // ctx.fillStyle = "#ff0000";
    // ctx.arc(50, 50, 50, 0, 2 * Math.PI);
    // ctx.fill();
    // /*3、将canvas作为纹理，创建Sprite*/
    // let texture = new THREE.Texture(canvas);
    // texture.needsUpdate = true; //注意这句不能少
    // let material = new THREE.SpriteMaterial({
    //     map: texture
    // });
    // let mesh = new THREE.Sprite(material);
    // /*4、放大图片，每个精灵有自己的大小，默认情况下都是很小的，如果你不放大，基本是看不到的*/
    // mesh.scale.set(100, 100, 1);
    // mesh.position.set(0, 0, 0);
    // scene.add(mesh);

    // var box = new THREE.Mesh(new THREE.BoxGeometry(50, 50, 50), new THREE.MeshBasicMaterial({
    //     color: 0xff0000
    // }));
    // scene.add(box);

    var textureLoader = new THREE.TextureLoader();
    textureLoader.load("resources/g.png", function (tex) {
        console.log("Amumu texture", tex);
        // 创建精灵材质对象SpriteMaterial
        var spriteMaterial = new THREE.SpriteMaterial({
            color: 0xffffff, //设置精灵矩形区域颜色
            rotation: Math.PI / 4, //旋转精灵对象45度，弧度值
            map: tex, //设置精灵纹理贴图
            transparent: true
        });
        // 创建精灵模型对象，不需要几何体geometry参数
        var sprite = new THREE.Sprite(spriteMaterial);
        scene.add(sprite);
        // 控制精灵大小，比如可视化中精灵大小表征数据大小
        sprite.scale.set(100, 100, 1); //// 只需要设置x、y两个分量就可以
    });


    /**
     * 光源设置
     */
    //点光源
    var point = new THREE.AmbientLight(0xffffff);
    point.position.set(400, 200, 300); //点光源位置
    scene.add(point); //点光源添加到场景中

    //执行渲染操作 指定场景、相机作为参数
    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
    render();
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}