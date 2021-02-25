var Example = Example || {};

/**
  //    v6----- v5
  //   /|      /|
  //  v1------v0|
  //  | |     | |
  //  | |v7---|-|v4
  //  |/      |/
  //  v2------v3
 * @desc 选中物体:点击鼠标选中立方体时,颜色变红
 */
Example.PickObject = function() {
    var newAngle = 0.0;
    const ANGLE_STEP = 45.0;
    var g_last = Date.now();

    //获取canvas和gl对象
    var canvas = document.getElementById("webgl");
    var gl = getWebGLContext(canvas);

    //顶点着色器程序
    const VSHADER_SOURCE = `
        attribute vec4 a_position;
        attribute vec4 a_color;
        attribute vec4 a_normal;
        uniform mat4 u_mvpMat;
        uniform vec3 u_lightColor;
        uniform vec3 u_lightDirection;
        uniform vec3 u_ambientColor;
        varying vec4 v_color;
        void main() {
            //设置顶点位置坐标
            gl_Position = u_mvpMat * a_position;
            //将法向量进行归一化
            vec3 normal = normalize(vec3(a_normal));
            //将光线方向与法向量进行点积运算
            float nDotL = max(dot(u_lightDirection, normal), 0.0);
            //计算漫反射光颜色值
            vec3 diffuse = u_lightColor * vec3(a_color) * nDotL;
            //计算环境光的颜色值
            vec3 ambient = u_ambientColor * vec3(a_color);
            //将漫反射和环境光合成的颜色值赋值给v_color变量
            v_color = vec4(diffuse + ambient, a_color.a);
        }
    `;

    //片元着色器程序
    const FSHADER_SOURCE = `
        #ifdef GL_ES
        #ifdef GL_FRAGMENT_PRECISION_HIGH
            precision highp float;
        #else
            precision mediump float;
        #endif
        #endif

        varying vec4 v_color;
        void main() {
            gl_FragColor = v_color;
        }
    `;

    //初始化着色器程序
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

    //获取着色器程序中的变量
    var a_position = gl.getAttribLocation(gl.program, "a_position");
    var a_color = gl.getAttribLocation(gl.program, "a_color");
    var a_normal = gl.getAttribLocation(gl.program, "a_normal");
    var u_mvpMat = gl.getUniformLocation(gl.program, "u_mvpMat");
    var u_lightColor = gl.getUniformLocation(gl.program, "u_lightColor");
    var u_lightDirection = gl.getUniformLocation(gl.program, "u_lightDirection");
    var u_ambientColor = gl.getUniformLocation(gl.program, "u_ambientColor");

    /** 将数据传递给变量 */
    //将顶点数据传递给a_position变量
    var vertices = new Float32Array([
        /**   D —— —— —— C
         *   /|         /|   
         *  / |        / |
         * A —— —— —— B  |
         * |  |       |  |
         * |  H —— —— —— G     
         * | /        | /
         * E —— —— —— F
         */
        //面ABCD
        -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 
        -0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 
        //面AEHD
        -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 
        -0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5,
        //面DHGC
        0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5,
        0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5,
        //面CGFB
        0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5,
        0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5,
        //面BAEF
        -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5,
        -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5,
        //面EFGH
        -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5,
        -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5
    ]);
    utils.dataToBuffer(gl, a_position, 3, vertices, 0, 0);

    //将颜色数据传递给a_color变量
    var colors = new Float32Array([
        //面ABCD
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        //面AEHD
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        //面DHGC
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        //面CGFB
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        //面BAEF
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        //面EFGH
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0
    ]);
    utils.dataToBuffer(gl, a_color, 3, colors, 0, 0);

    //将法向量数据传递给a_normal变量
    var normals = new Float32Array([
        0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, //y轴正方向——面ABCD
        0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, //z轴正方向——面AEHD
        1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, //x轴正方向——面DHGC
        0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, //z轴负方向——面CGFB
        -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, //x轴负方向——面BAEF
        0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0//y轴负方向——面EFGH
    ]);
    utils.dataToBuffer(gl, a_normal, 3, normals, 0, 0);

    //将平行光颜色值赋值给u_lightColor变量
    gl.uniform3fv(u_lightColor, new Float32Array([1.0, 1.0, 1.0]));
    //将平行光方向值赋值给u_lightDirection变量
    var lightDirection = new Vector3([3.0, 4.0, 5.0]);
    lightDirection.normalize();
    gl.uniform3fv(u_lightDirection, lightDirection.elements);
    //将环境光颜色值传递给u_ambientColor变量
    gl.uniform3fv(u_ambientColor, new Float32Array([0.2, 0.2, 0.2]));

    //将矩阵信息传递给u_mvpMat变量
    var proMat = new Matrix4();
    var viewMat = new Matrix4();
    var modelMat = new Matrix4();
    var mvpMat = new Matrix4();

    proMat.setPerspective(60.0, canvas.width / canvas.height, 1, 100);
    viewMat.setLookAt(0, 0, 2, 0, 0, -1, 0, 1, 0);
    modelMat.setRotate(45.0, 0, 1, 0);
    mvpMat.set(proMat).multiply(viewMat).multiply(modelMat);
    gl.uniformMatrix4fv(u_mvpMat, false, mvpMat.elements);

    //清理画布
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //开启深度测试
    gl.enable(gl.DEPTH_TEST);
    //绘制图形
    gl.drawArrays(gl.TRIANGLES, 0, 36);
    tick();
   
    //绕y轴自转
    function tick() {
        var now = Date.now();
        var detla = now - g_last;
        g_last = now;
        newAngle = newAngle + (ANGLE_STEP * detla) / 1000.0 % 360.0;

        modelMat.setRotate(newAngle, 0, 1, 0);
        mvpMat.set(proMat).multiply(viewMat).multiply(modelMat);
        gl.uniformMatrix4fv(u_mvpMat, false, mvpMat.elements);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 36);
        requestAnimationFrame(tick);
    } 

    //注册鼠标点击监听事件
    canvas.onmousedown = function(ev) {
        console.log("Amumu PickObject onmousedown ev = ", ev);

        var x = ev.clientX;
        var y = ev.clientY;
        //判断是否选中立方体区域
        if((x > canvas.width / 4 && x <= canvas.width / 4 * 3) 
            && (y > canvas.height / 4 && y <= canvas.height / 4 * 3) ) {
            changeCubeColor();
        }
    }

    //改变立方体颜色
    function changeCubeColor() {
        // gl.vertexAttrib4fv(a_color, new Float32Array([1.0, 0.0, 0.0, 1.0]));
        var newColors = new Float32Array([
            //面ABCD
            1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
            1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
            //面AEHD
            1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
            1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
            //面DHGC
            1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
            1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
            //面CGFB
            1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
            1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
            //面BAEF
            1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
            1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
            //面EFGH
            1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
            1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
        ]);
        utils.dataToBuffer(gl, a_color, 3, newColors, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.drawArrays(gl.TRIANGLES, 0, 36);
    }
}

if(typeof module !== "undefined") {
    module.export = Example[Object.keys(Example)[0]];
}