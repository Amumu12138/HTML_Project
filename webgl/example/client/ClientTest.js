var Example = Example || {};

/**
 * @desc webGL 测试案例
 */
Example.ClientTest = function() {
    //获取canvas和gl对象
    var canvas = document.getElementById("webgl");
    var gl = getWebGLContext(canvas);

    //顶点着色器程序
    const VSHADER_SOURCE = `
        //顶点坐标
        attribute vec4 a_position;
        //顶点颜色值
        attribute vec4 a_color; 
        //法向量
        attribute vec3 a_normal;
        //变换矩阵
        uniform mat4 u_mvpMat;
        //入射光颜色值
        uniform vec3 u_lightColor;
        //入射光方向
        uniform vec3 u_lightDirection;
        //环境光颜色
        uniform vec3 u_ambientColor;
        varying vec4 v_color;
        void main() {
            gl_Position = u_mvpMat * a_position;
            //对法向量进行归一化
            vec3 normal = normalize(a_normal);
            //计算光线方向和法向量的点积
            float nDotL = max(dot(u_lightDirection, normal), 0.0);
            //计算漫反射光的颜色
            vec3 diffuse = u_lightColor * vec3(a_color) * nDotL;
            //计算环境反射光的颜色
            vec3 ambient = u_ambientColor * vec3(a_color);
            //将漫反射光的值赋给v_color变量
            v_color = vec4(diffuse + ambient, a_color.a);
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

    //获取着色器中的变量
    var a_position = gl.getAttribLocation(gl.program, "a_position");
    var a_color = gl.getAttribLocation(gl.program, "a_color");
    var a_normal = gl.getAttribLocation(gl.program, "a_normal");
    var u_mvpMat = gl.getUniformLocation(gl.program, "u_mvpMat");
    var u_lightColor = gl.getUniformLocation(gl.program, "u_lightColor");
    var u_lightDirection = gl.getUniformLocation(gl.program, "u_lightDirection");
    var u_ambientColor = gl.getUniformLocation(gl.program, "u_ambientColor");

    /** 将数据传递给变量 */
    //顶点坐标数据
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
    //将顶点坐标数据传递给a_position变量
    utils.dataToBuffer(gl, a_position, 3, vertices, 0, 0);
    //颜色数组
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
   //将顶点颜色数据传递给a_color变量
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

    //将矩阵数据传递给u_mapMat变量
    var mvpMat = new Matrix4();
    mvpMat.setRotate(45, 0, 1, 0);
    mvpMat.rotate(30, 1, 0, 0);
    gl.uniformMatrix4fv(u_mvpMat, false, mvpMat.elements);

    //将入射光颜色传递给u_lightColor变量
    gl.uniform3fv(u_lightColor, new Float32Array([1.0, 1.0, 1.0]));
    //将入射光方向传给给u_lightDirection变量
    var lightDir = new Vector3([3.0, -4.0, -5.0]);
    //归一化
    lightDir.normalize();
    gl.uniform3fv(u_lightDirection, lightDir.elements);
    //将环境光颜色传递给u_ambientColor变量
    gl.uniform3fv(u_ambientColor, new Float32Array([0.2, 0.2, 0.2]));

    //清理画布
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFRT_BIT);

    //开启深度测试
    gl.enable(gl.DEPTH_TEST);
    //绘制图形
    gl.drawArrays(gl.TRIANGLES, 0, 36);

    //绕Y轴旋转
    var currentAngle = 45.0;
    function draw() {
        currentAngle += 1.0;
        var newMvpMat = new Matrix4();
        newMvpMat.setRotate(currentAngle, 0, 1, 0);
        newMvpMat.rotate(30, 1, 0, 0);
        gl.uniformMatrix4fv(u_mvpMat, false, newMvpMat.elements);
        requestAnimationFrame(draw);

        //gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFRT_BIT);
        //开启深度测试
        // gl.enable(gl.DEPTH_TEST);
        gl.drawArrays(gl.TRIANGLES, 0, 36);
    }

    draw();
}

if(typeof module !== "undefined") {
    moudle.export = Example[Object.keys(Example)[0]];
}