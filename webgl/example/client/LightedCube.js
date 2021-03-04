var Example = Example || {};

/**
 * @desc 受光照影响的立方体
 */
Example.LightedCube = function() {
    //获取canvas和gl对象
    var canvas = document.getElementById("webgl");
    var gl = getWebGLContext(canvas);

    //顶点着色器程序
    const VSHADER_SOURCE = `
        attribute vec4 a_position;
        attribute vec4 a_color;
        attribute vec4 a_normal;    //法向量
        uniform vec3 u_lightColor;  //光线颜色
        uniform vec3 u_lightDirection;  //归一化的世界坐标
        uniform mat4 u_mvpMat;
        varying vec4 v_color;
        void main() {
            gl_Position = u_mvpMat * a_position;
            //对法向量进行归一化
            vec3 normal = normalize(vec3(a_normal));
            //计算光线方向和法向量的点积
            float nDotL = max(dot(u_lightDirection, normal), 0.0);
            //计算漫反射光的颜色
            vec3 diffuse = u_lightColor * vec3(a_color) * nDotL;
            v_color = vec4(diffuse, a_color.a);
            // v_color = a_color;
        }
    `;

    //片元着色器程序
    const FSAHDER_SOURCE = `
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

    //初始化着色器
    initShaders(gl, VSHADER_SOURCE, FSAHDER_SOURCE);

    //获取着色器程序中的变量
    var a_position = gl.getAttribLocation(gl.program, "a_position");
    var a_color = gl.getAttribLocation(gl.program, "a_color");
    var a_normal = gl.getAttribLocation(gl.program, "a_normal");
    var u_mvpMat = gl.getUniformLocation(gl.program, "u_mvpMat");
    var u_lightColor = gl.getUniformLocation(gl.program, "u_lightColor");
    var u_lightDirection = gl.getUniformLocation(gl.program, "u_lightDirection");

    /** 将数据传递给变量 */
    //设置光线颜色
    gl.uniform3f(u_lightColor, 1.0, 1.0, 1.0);
    //设置光线方向
    var lightDirection = new Vector3([3.0, -4.0, -5.0]);
    //归一化
    lightDirection.normalize();
    gl.uniform3fv(u_lightDirection, lightDirection.elements);

    //将顶点数据传递给a_position变量
    var vertices = new Float32Array([
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

    //将矩阵信息传递给u_mvpMat变量
    var mvpMat = new Matrix4();
    mvpMat.setRotate(45, 0, 1, 0);
    mvpMat.rotate(30, 1, 0, 0);
    gl.uniformMatrix4fv(u_mvpMat, false, mvpMat.elements);
    //绘制图形
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    //开启深度测试
    // gl.enable(gl.DEPTH_TEST);

     gl.enable(gl.BLEND);
    //指定混合函数
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.drawArrays(gl.TRIANGLES, 0, 36);
}

if(typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}