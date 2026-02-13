var Example = Example || {};

/**
 * @desc canvas画布、视频作为纹理贴图
 */
Example.CanvasTexture = function () {
    // var canvas = document.createElement("canvas");
    // canvas.width = 512;
    // canvas.height = 128;
    // var c = canvas.getContext('2d');
    // // 矩形区域填充背景
    // c.fillStyle = "#ff00ff";
    // c.fillRect(0, 0, 512, 128);
    // c.beginPath();
    // // 文字
    // c.beginPath();
    // c.translate(256, 64);
    // c.fillStyle = "#000000"; //文本填充颜色
    // c.font = "bold 48px 宋体"; //字体样式设置
    // c.textBaseline = "middle"; //文本与fillText定义的纵坐标
    // c.textAlign = "center"; //文本居中(以fillText定义的横坐标)
    // c.fillText("郭隆邦_技术博客", 0, 0);

    //document.body.appendChild(canvas);


    //创建3D场景、相机和渲染器
    var scene = new THREE.Scene();
    //相机设置
    var width = window.innerWidth; //窗口宽度
    var height = window.innerHeight; //窗口高度
    var k = width / height; //窗口宽高比
    var s = 100; //三维场景显示范围控制系数，系数越大，显示的范围越大
    //创建相机对象
    var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(200, 300, 200); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // canvas画布对象作为CanvasTexture的参数重建一个纹理对象
    // // canvas画布可以理解为一张图片
    // var texture = new THREE.CanvasTexture(canvas);
    // //打印纹理对象的image属性
    // // console.log(texture.image);
    // //矩形平面
    // var geometry = new THREE.BoxGeometry(50, 50, 50);

    // var material = new THREE.MeshBasicMaterial({
    //     map: texture, // 设置纹理贴图
    // });
    // // 创建一个矩形平面网模型，Canvas画布作为矩形网格模型的纹理贴图
    // var mesh = new THREE.Mesh(geometry, material);
    //scene.add(mesh);

    //canvas画布加载图片
    // var ctx = canvas.getContext('2d');
    // var image = new Image();
    // image.src = "resources/o.png";
    // image.onload = texture;
    // var materialUpdate = new THREE.MeshBasicMaterial({
    //     map: image
    // });
    // mesh.material = materialUpdate;
    // mesh.material.needsUpdate = true;

    // 创建video对象
    let video = document.createElement('video');
    video.src = "resources/test.mp4"; // 设置视频地址
    video.preload = "auto";
    //video.autoload = true;
    //Chrome浏览器无法播放,IE浏览器可播放
    video.autoplay = "autoplay"; //要设置播放
    // video对象作为VideoTexture参数创建纹理对象
    var textureVideo = new THREE.VideoTexture(video);
    var geometry1 = new THREE.PlaneGeometry(100, 100); //矩形平面
    var material1 = new THREE.MeshBasicMaterial({
        map: textureVideo, // 设置纹理贴图
    }); //材质对象Material
    var mesh1 = new THREE.Mesh(geometry1, material1); //网格模型对象Mesh
    scene.add(mesh1); //网格模型添加到场景中
    mesh1.rotateY(Math.PI / 4);

    //循环渲染
    function render() {
        //渲染场景、 摄像机
        renderer.render(scene, camera);
        //请求再次执行渲染函数render
        requestAnimationFrame(render);
    };
    //执行循环渲染
    render();

    /**
    创建缓冲区textureBuffer，传入图片纹理数据，然后执行绘制方法drawArrays()
    **/
    function texture() {
        var texture = gl.createTexture(); //创建纹理图像缓冲区
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); //纹理图片上下反转
        gl.activeTexture(gl.TEXTURE0); //激活0号纹理单元TEXTURE0
        gl.bindTexture(gl.TEXTURE_2D, texture); //绑定纹理缓冲区
        //设置纹理贴图填充方式(纹理贴图像素尺寸大于顶点绘制区域像素尺寸)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        //设置纹理贴图填充方式(纹理贴图像素尺寸小于顶点绘制区域像素尺寸)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        //设置纹素格式，jpg格式对应gl.RGB
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
        gl.uniform1i(u_Sampler, 0); //纹理缓冲区单元TEXTURE0中的颜色数据传入片元着色器
        // 进行绘制
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}