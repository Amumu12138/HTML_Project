var Example = Example || {};

/**
 * @desc 几何体顶点纹理坐标UV
 * 顶点数据
 * position: 顶点位置坐标数据
 * color:顶点颜色数据
 * normal: 顶点法线方向向量数据
 * UV
 * a,顶点纹理坐标数据:图片映射
 * b,和顶点位置、颜色、法向量等数据一一对应
 * c,Geometry: faceVertexUvs属性(faceVertexUvs[0]、faceVertexUvs[1])
 * d,BufferGeometry:attributes.uv属性、attributes.uv2属性
 */
Example.FaceVertexUvs = function () {
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

    // 纹理贴图映射到一个矩形平面上
    var geometry = new THREE.PlaneGeometry(100, 100, 4, 4); //矩形平面 设置细分数4,4
    // TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
    var textureLoader = new THREE.TextureLoader();
    // 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
    textureLoader.load('resources/g.png', function (texture) {
        var material = new THREE.MeshBasicMaterial({
            // color: 0x0000ff,
            // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
            map: texture, //设置颜色贴图属性值
        }); //材质对象Material
        var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        scene.add(mesh); //网格模型添加到场景中
    });

    /**
     * 遍历uv坐标
     */
    // geometry.faceVertexUvs[0].forEach(elem => {
    //     elem.forEach(Vector2 => {
    //         // 所有的UV坐标全部设置为一个值
    //         Vector2.set(0.2, 0.2);
    //     });
    // });

    /**
     * 局部三角面显示完整纹理贴图
     */
    var t0 = new THREE.Vector2(0, 1); //图片左下角
    var t1 = new THREE.Vector2(0, 0); //图片右下角
    var t2 = new THREE.Vector2(1, 0); //图片右上角
    var t3 = new THREE.Vector2(1, 1); //图片左上角
    var uv1 = [t0, t1, t3]; //选中图片一个三角区域像素——用于映射到一个三角面
    var uv2 = [t1, t2, t3]; //选中图片一个三角区域像素——用于映射到一个三角面
    // 设置第1、第2个三角形面对应的纹理坐标(左上角)
    geometry.faceVertexUvs[0][0] = uv1;
    geometry.faceVertexUvs[0][1] = uv2;
    // 设置第31、第32个三角形面相反的纹理坐标(右下角)
    geometry.faceVertexUvs[0][30] = uv2;
    geometry.faceVertexUvs[0][31] = uv1;

    //Geometry自定义顶点UV坐标 创建一个矩形几何体
    var geometryRect = new THREE.Geometry(); //创建一个空几何体对象
    /**顶点坐标(纹理映射位置)*/
    var p1 = new THREE.Vector3(0, 0, 0); //顶点1坐标
    var p2 = new THREE.Vector3(100, 0, 0); //顶点2坐标
    var p3 = new THREE.Vector3(100, 50, 0); //顶点3坐标
    var p4 = new THREE.Vector3(0, 50, 0); //顶点4坐标
    geometryRect.vertices.push(p1, p2, p3, p4); //顶点坐标添加到geometry对象
    /** 三角面1、三角面2*/
    var normal = new THREE.Vector3(0, 0, 1); //三角面法向量
    var face0 = new THREE.Face3(0, 1, 2, normal); //三角面1
    var face1 = new THREE.Face3(0, 2, 3, normal); //三角面2
    geometryRect.faces.push(face0, face1); //三角面1、2添加到几何体
    /**纹理坐标*/
    var t0 = new THREE.Vector2(0, 0); //图片左下角
    var t1 = new THREE.Vector2(1, 0); //图片右下角
    var t2 = new THREE.Vector2(1, 1); //图片右上角
    var t3 = new THREE.Vector2(0, 1); //图片左上角
    uv1 = [t0, t1, t2]; //选中图片一个三角区域像素——映射到三角面1
    uv2 = [t0, t2, t3]; //选中图片一个三角区域像素——映射到三角面2
    geometryRect.faceVertexUvs[0].push(uv1, uv2); //纹理坐标传递给纹理三角面属性

    textureLoader.load('resources/w.png', function (texture) {
        var materialRect = new THREE.MeshBasicMaterial({
            // color: 0x0000ff,
            // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
            map: texture, //设置颜色贴图属性值
        }); //材质对象Material
        var meshRect = new THREE.Mesh(geometryRect, materialRect);
        scene.add(meshRect);
        meshRect.translateZ(50);
    });

    // BufferGeometry自定义顶点UV坐标
    var geometry1 = new THREE.BufferGeometry(); //声明一个空几何体对象
    //类型数组创建顶点位置position数据
    var vertices = new Float32Array([
        0, 0, 0, //顶点1坐标
        80, 0, 0, //顶点2坐标
        80, 80, 0, //顶点3坐标
        0, 80, 0, //顶点4坐标
    ]);
    // 创建属性缓冲区对象
    var attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组
    // 设置几何体attributes属性的位置position属性
    geometry1.attributes.position = attribue
    var normals = new Float32Array([
        0, 0, 1, //顶点1法向量
        0, 0, 1, //顶点2法向量
        0, 0, 1, //顶点3法向量
        0, 0, 1, //顶点4法向量
    ]);
    // 设置几何体attributes属性的位置normal属性
    geometry1.attributes.normal = new THREE.BufferAttribute(normals, 3); //3个为一组,表示一个顶点的xyz坐标
    // Uint16Array类型数组创建顶点索引数据
    var indexes = new Uint16Array([
        0, 1, 2, 0, 2, 3,
    ])
    // 索引数据赋值给几何体的index属性
    geometry1.index = new THREE.BufferAttribute(indexes, 1); //1个为一组
    /**纹理坐标*/
    var uvs = new Float32Array([
        0, 0, //图片左下角
        1, 0, //图片右下角
        1, 1, //图片右上角
        0, 1, //图片左上角
    ]);
    // 设置几何体attributes属性的位置normal属性
    geometry1.attributes.uv = new THREE.BufferAttribute(uvs, 2); //2个为一组,表示一个顶点的纹理坐标
    textureLoader.load('resources/o.png', function (texture) {
        var material1 = new THREE.MeshBasicMaterial({
            // color: 0x0000ff,
            // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
            map: texture, //设置颜色贴图属性值
        }); //材质对象Material
        var mesh1 = new THREE.Mesh(geometry1, material1);
        scene.add(mesh1);
        mesh1.translateZ(-50);
    });

    //加载一个包含UV坐标的模型文件
    // 创建一个加载threejs格式JSON文件的加载器
    var loader = new THREE.ObjectLoader();
    // TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
    //var textureLoader = new THREE.TextureLoader();
    loader.load('resources/model.json', function (obj) {
        console.log(obj);
        scene.add(obj); //加载返回的对象插入场景中
        // 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
        textureLoader.load('resources/o.png', function (texture) {
            //材质对象Material
            var material = new THREE.MeshBasicMaterial({
                // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
                map: texture, //设置颜色贴图属性值
            });
            // 设置球体网格模型材质的map属性
            obj.material = material;
            // 告诉threejs渲染器系统，材质对象的map属性已更新
            obj.material.needsUpdate = true;
        })
    });

    // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
    var axisHelper = new THREE.AxisHelper(250);
    scene.add(axisHelper);

    //循环渲染
    function render() {
        //渲染场景、 摄像机
        renderer.render(scene, camera);
        //请求再次执行渲染函数render
        requestAnimationFrame(render);
    };
    //执行循环渲染
    render();
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}