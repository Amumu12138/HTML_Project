var Example = Example || {};

/**
 * @desc 绘制正方体
 */
Example.DrawCube = function() {
    //获取canvas和gl对象
    var canvas = document.getElementById("webgl");
    var gl = getWebGLContext(canvas);

    //顶点着色器程序
   var VSHADER_SOURCE = [
        "attribute vec4 a_position;",
        "attribute vec4 a_color;",
        "uniform mat4 u_mat;",
        "varying vec4 v_color;",
        "void main() {",
        "gl_Position = u_mat * a_position;",
        "v_color = a_color;",
        "}"
   ].join("\n");

   //片元着色器
   var FSHADER_SOURCE = [
        "precision mediump float;",
        "varying vec4 v_color;",
        "void main() {",
        "gl_FragColor = v_color;",
        // "gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);",
        "}"
    ].join("\n");

    //初始化着色器
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

    //获取着色器程序中的变量
    var a_position = gl.getAttribLocation(gl.program, "a_position");
    var u_mat = gl.getUniformLocation(gl.program, "u_mat");
    var a_color = gl.getAttribLocation(gl.program, "a_color");

    /** 将数据传递给变量 */
    // var vertices = new Float32Array([
    //     //面ABCD
    //     -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 
    //     -0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 
    //     //面AEHD
    //     -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 
    //     -0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5,
    //     //面DHGC
    //     0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5,
    //     0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5,
    //     //面CGFB
    //     0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5,
    //     0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5,
    //     //面BAEF
    //      -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5,
    //      -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5,
    //     //面EFGH
    //     -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5,
    //     -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5
    // ]);
    //顶点坐标数组
    var points = new Float32Array([
        -0.5, 0.5, 0.5,         //点A
        -0.5, 0.5, -0.5,        //点B
        0.5, 0.5, -0.5,         //点C
        0.5, 0.5, 0.5,          //点D

        -0.5, -0.5, 0.5,         //点E
        -0.5, -0.5, -0.5,        //点F
        0.5, -0.5, -0.5,         //点G
        0.5, -0.5, 0.5           //点H
    ]); 

    //顶点索引
    var indices = new Uint8Array([
        0, 1, 2, 0, 2, 3,    //面ABCD
        4, 5, 6, 4, 6, 7,    //面EFGH
        0, 3, 4, 3, 4, 7,    //面AEHD
        1, 2, 6, 1, 5, 6,    //面BCGF
        0, 2, 5, 0, 4, 5,    //面ABFE
        3, 2, 6, 3, 7, 6     //面DCGH  
    ]);

    //创建缓冲区对象
    var indexesBuffer = gl.createBuffer();
    //绑定缓冲区对象
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexesBuffer);
    //顶点数组indexes数据传入缓冲区
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
 
    //将顶点数组传递给a_position变量
    utils.dataToBuffer(gl, a_position, 3, points, 0, 0);

    //颜色值数组
    var colors = new Float32Array([
        1, 0, 0,    //红色——面1
        0.9, 0, 0,  //90%红色——面2
        0.8, 0, 0,  //80%红色——面3
        1, 1, 0,   //黄色——面4
        0, 0, 0,   //黑色——面5
        1, 0, 0,   //纯红色-面6
        1, 0, 1,
        1, 1, 1
    ]);

    //颜色索引数组
    var colorIndices = new Uint8Array([
        0, 1, 2, 0, 2, 3,    //面ABCD
        4, 5, 6, 4, 6, 7,    //面EFGH
        0, 3, 4, 3, 4, 7,    //面AEHD
        1, 2, 6, 1, 5, 6,    //面BCGF
        0, 2, 5, 0, 4, 5,    //面ABFE
        3, 2, 6, 3, 7, 6     //面DCGH   
    ]);

    //创建缓冲区对象
    var colorIndexBuffer = gl.createBuffer();
    //绑定缓冲区对象
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, colorIndexBuffer);
    //顶点数组indexes数据传入缓冲区
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, colorIndices, gl.STATIC_DRAW);
  
    //将顶点数组传递给u_color变量
    utils.dataToBuffer(gl, a_color, 3, colors, 0, 0);

    //将矩阵数据传递给u_mat变量
    var mat = new Matrix4();
    mat.setRotate(45, 0, 1, 0);
    mat.rotate(30, 1, 0, 0);
    gl.uniformMatrix4fv(u_mat, false, mat.elements);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //开启深度测试
    gl.enable(gl.DEPTH_TEST);
    // gl.drawArrays(gl.TRIANGLES, 0, 36);
    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_BYTE, 0);
}

if(typeof nudule !== "undefined") {
    Example.export = Example[Object.keys(Example)[0]];
}