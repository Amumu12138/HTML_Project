var Example = Example || {};

/**
 * @desc 常用材质介绍
 * 材质Material
 * 1,点材质:PointsMaterial
 * 2,线材质:构造函数首字母Line开头材质 a,LineBasicMaterial 线基础材质 b,LineDashedMaterial 虚线材质
 * 3,网格材质:构造函数首字母Mesh开头材质
 * a,MeshBasicMaterial 网格基础材质
 * b,MeshLambertMaterial 网格Lambert材质 暗淡、漫反射
 * c,MeshPhongMaterial 网格Phong材质 高亮表面、镜面反射
 * d,PBR材质 MeshStandardMaterial MeshPhysicalMaterial 金属材质
 * e,MeshDepthMaterial 网格深度材质
 * f,MeshNormalMaterial 网格法向量材质
 * 4,精灵Sprite材质 SpriteMaterial
 * 5,自定义着色器材质 RawShaderMaterial、ShaderMaterial
 * 
 * 材质和模型对应关系
 * 点材质 —— 点模型Pints
 * 线材质 —— 线条类型模型(Line、LineLoop、LineSegments)
 * 网格模型 —— 网格模型(Mesh)、骨骼网络模型(SkinnedMesh)
 * 精灵材质 —— 精灵模型(Sprite)
 */
Example.MaterialClass = function () {
    /**
     * 创建场景对象Scene
     */
    var scene = new THREE.Scene();
    var geometry = new THREE.SphereGeometry(100, 25, 25); //创建一个球体几何对象
    // 创建一个点材质对象
    var material = new THREE.PointsMaterial({
        color: 0xffffff, //颜色
        size: 3, //点渲染尺寸
    });
    //点模型对象  参数：几何体  点材质
    var point = new THREE.Points(geometry, material);
    point.scale.set(0.2, 0.2, 0.2);
    point.translateY(100);
    //scene.add(point); //网格模型添加到场景中
    //直线基础材质对象
    var lineBasicMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff
    });
    var lineBasic = new THREE.Line(geometry, lineBasicMaterial);
    lineBasic.scale.set(0.2, 0.2, 0.2);
    lineBasic.translateY(75);
    //scene.add(lineBasic);

    //虚线材质对象:产生虚线效果
    var lineDashedMaterial = new THREE.LineDashedMaterial({
        color: 0xffffff,
        //显示线段大小,默认为3
        dashSize: 10,
        //间隙的大小,默认为1
        gapSize: 5
    });
    var lineDashed = new THREE.Line(geometry, lineDashedMaterial);
    //  computeLineDistances方法  计算LineDashedMaterial所需的距离数组
    lineDashed.computeLineDistances();
    lineDashed.scale.set(0.2, 0.2, 0.2);
    lineDashed.translateY(50);
    //scene.add(lineDashed);
    //MeshBasicMaterial材质 不受带有方向光源影响,没有棱角感
    var meshBasicMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff
    });
    var meshBasic = new THREE.Mesh(geometry, meshBasicMaterial);
    //meshBasic缩小0.2倍
    meshBasic.scale.set(0.2, 0.2, 0.2);
    scene.add(meshBasic);
    //MeshLambertMaterial材质可以实现网格Mesh表面与光源的漫反射光照计算，有了光照计算，物体表面分界的位置才会产生棱角感
    var meshLambertMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff
    });
    var meshLambert = new THREE.Mesh(geometry, meshLambertMaterial);
    //meshLambert缩小0.2倍
    meshLambert.scale.set(0.2, 0.2, 0.2);
    //沿x轴正方向移动50
    meshLambert.translateX(50);
    scene.add(meshLambert);
    //高光网格材质MeshPhongMaterial除了和MeshLambertMaterial一样可以实现光源和网格表面的漫反射光照计算，还可以产生高光效果(镜面反射)。
    var meshPhongMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0x444444, //高光部分的颜色
        shininess: 20, //高光部分的亮度，默认30
    });
    var meshPhong = new THREE.Mesh(geometry, meshPhongMaterial);
    //meshPhong缩小.2倍
    meshPhong.scale.set(0.2, 0.2, 0.2);
    //沿z轴正方向移动50
    meshPhong.translateZ(50);
    scene.add(meshPhong);


    /**
     * 光源设置
     */
    //点光源
    var point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300); //点光源位置
    scene.add(point); //点光源添加到场景中

    /**
     * 相机设置
     */
    var width = window.innerWidth; //窗口宽度
    var height = window.innerHeight; //窗口高度
    var k = width / height; //窗口宽高比
    var s = 100; //三维场景显示范围控制系数，系数越大，显示的范围越大
    //创建相机对象
    var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(200, 300, 200); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

    // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
    var axisHelper = new THREE.AxisHelper(250);
    scene.add(axisHelper);

    /**    
     * 创建渲染器对象
     */
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height); //设置渲染区域尺寸
    renderer.setClearColor(0x000000, 1); //设置背景颜色
    document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
    //执行渲染操作   指定场景、相机作为参数
    renderer.render(scene, camera);
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}