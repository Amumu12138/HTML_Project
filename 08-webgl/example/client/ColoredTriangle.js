var Example = Example || {}

/**
 * @desc 彩色三角形
 */
Example.ColoredTriangle = function() {
    //获取canvas和gl对象
    var canvas = document.getElementById("webgl");
    var gl = getWebGLContext(canvas);
    
    //顶点着色器程序
    const VSHADER_SOURCE = `
        attribute vec4 a_position;
        //attribute float a_pointSize;
        attribute vec4 a_color;
        varying vec4 v_color;
        uniform mat4 u_mat;
        void main() {
            gl_Position = u_mat * a_position;
           // gl_PointSize = a_pointSize;
            v_color = a_color;
        }
    `;

    //片元着色器程序
    const FSHADER_SOURCE = `
        precision mediump float;
        varying vec4 v_color;
        void main() {
            gl_FragColor = v_color;
        }
    `;


    //初始化着色器
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
    //获取着色器程序中的变量
    var a_position = gl.getAttribLocation(gl.program, "a_position");
    //var a_pointSize = gl.getAttribLocation(gl.program, "a_pointSize");
    var a_color = gl.getAttribLocation(gl.program, "a_color");
    var u_mat = gl.getUniformLocation(gl.program, "u_mat");

    /* 将数据传递给变量 */
    //顶点位置数据
    var vertices = new Float32Array([
        -0.5, -0.5,
        0.5, -0.5,
        0.0, 0.5
    ]);
    //将数据传递给a_position变量
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_position);

    //顶点颜色数据
    var colors = new Float32Array([
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0
    ]);
    //将颜色数据传给a_color变量
    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_color);

    const ANGLE = 45.0;
    //将数据传递给u_mat变量
    var mat = new Matrix4();
    mat.setRotate(ANGLE, 0, 0, 1);
    gl.uniformMatrix4fv(u_mat, false, mat.elements);

    //清理画布
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    //绘制图形
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}

if(typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}