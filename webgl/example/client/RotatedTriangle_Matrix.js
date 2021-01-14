var Example = Example || {};

/**
 * @desc 利用矩阵变换 平移/旋转点、线段、三角形
 */
Example.RotatedTriangle_Matrix = function() {
    //获取canvas和gl对象
    var canvas = document.getElementById("webgl");
    var gl = getWebGLContext(canvas);

    if(!gl){
        console.error("Amumu RotatedTriangle_Matrix gl is null !");
        return;
    }

    //顶点着色器程序
    var VSHADER_SOURCE = `
        attribute vec4 a_position;
        uniform mat4 u_mat;
        void main() {
            float size = 10.0;
            gl_Position = u_mat * a_position;
            gl_PointSize = size;
        }
    `;

    //片元着色器程序
    var FSHADER_SOURCE = `
        precision mediump float;
        uniform vec4 u_fragColor;
        void main() {
            gl_FragColor = u_fragColor;
        }
    `;

    //初始化着色器
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

    //获取着色器程序中的变量
    var a_position = gl.getAttribLocation(gl.program, "a_position");
    var u_mat = gl.getUniformLocation(gl.program, "u_mat");
    var u_fragColor = gl.getUniformLocation(gl.program, "u_fragColor");

    //将数据传递给变量
    gl.vertexAttrib4f(a_position, 0.5, 0.5, 0.0, 1.0);
    gl.uniform4f(u_fragColor, 1.0, 0.0, 0.0, 1.0);

    //向x轴和y轴各移动0.5个单位
    var translate_mat = new Float32Array([
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0, 
        0.0, 0.0, 1.0, 0.0, 
        0.5, 0.5, 0.0, 1.0
    ]);

    //绕z轴正方向旋转angle度
    const angle = 90.0;
    var radius = angle * Math.PI / 180.0;
    //旋转矩阵
    var roatated_mat = new Float32Array([
        Math.cos(radius), Math.sin(radius), 0.0, 0.0,
        -Math.sin(radius), Math.cos(radius), 0.0, 0.0, 
        0.0, 0.0, 1.0, 0.0, 
        0.0, 0.0, 0.0, 1.0
    ]);

    //缩放矩阵 沿x轴,y轴,z轴各缩小0.5倍
    var scale_mat = new Float32Array([
        0.5, 0.0, 0.0, 0.0,
        0.0, 0.5, 0.0, 0.0, 
        0.0, 0.0, 0.5, 0.0, 
        0.0, 0.0, 0.0, 1.0
    ]);

    gl.uniformMatrix4fv(u_mat, false, roatated_mat);

    /* 使用缓冲区对象传递给三角形顶点数据 */
    //三角形顶点数据
    var vertices = new Float32Array([
        0.0, 0.0,
        0.5, 0.0,
        0.5, 0.5
    ]);

    //创建缓冲区对象
    // var v_buffer = gl.createBuffer();
    // //绑定缓冲区对象
    // gl.bindBuffer(gl.ARRAY_BUFFER, v_buffer);
    // //将数据传递给缓冲区对象
    // gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    // //将缓冲区对象分配给变量
    // gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);
    // //开启指定的变量
    // gl.enableVertexAttribArray(a_position);

    //清空画布
    gl.clearColor(0.0, 0.0, 0.0 , 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    //绘制图形
    gl.drawArrays(gl.POINTS, 0, 1); //绘制点
    //   gl.drawArrays(gl.LINES, 0, 2); //绘制线段
    // gl.drawArrays(gl.TRIANGLES, 0, 3); //绘制三角形
}

if(typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}