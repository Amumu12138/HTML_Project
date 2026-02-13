var Example = Example || {};

/**
 * @desc 朝向三色三角形
 */
Example.LookAtTriangle = function () {  
    //获取canvas和gl对象
    var canvas = document.getElementById("webgl");
    var gl = getWebGLContext(canvas);

    //顶点着色器程序
    const VSDHADER_SOURCE = `
        attribute vec4 a_position;
        attribute vec4 a_color;
        uniform mat4 u_viewMat;
        varying vec4 v_color;
        void main() {
            gl_Position = u_viewMat * a_position;
            // gl_Position = a_position;
            v_color = a_color;
        }
    `;

    //片着色器程序
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

    //初始化着色器
    initShaders(gl, VSDHADER_SOURCE, FSHADER_SOURCE);

    //获取着色器程序中变量
    var a_position = gl.getAttribLocation(gl.program, "a_position");
    var a_color = gl.getAttribLocation(gl.program, "a_color");
    var u_viewMat = gl.getUniformLocation(gl.program, "u_viewMat");

    /** 将数据传递给变量 */
    //将顶点数据传递给a_position变量
    var vertices = new Float32Array([
        0.0, 0.5, -0.4, -0.5, -0.5, -0.41, 0.5, -0.5, -0.42,
        0.5, 0.4, -0.2, -0.5, 0.4, -0.21, 0.0, -0.6, -0.22,
        0.0, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0
    ]);
    dataToBuffer(a_position, 3, vertices);

    //将顶点数据传递给a_color变量
    var colors = new Float32Array([
        0.4, 1.0, 0.4, 0.4, 1.0, 0.4, 1.0, 0.4, 0.4,    //绿色三角形数据
        1.0, 0.4, 0.4, 1.0, 1.0, 0.4, 1.0, 1.0, 0.4,    //黄色
        0.4, 0.4, 1.0, 0.4, 0.4, 1.0, 1.0, 0.4, 0.4     //蓝色
    ]);
    dataToBuffer(a_color, 3, colors);

    //将数据传递给u_viewMat变量
    var mat = new Matrix4();
    mat.setLookAt(0.2, 0.25, 0.25, 0, 0, 0, 0, 1, 0);
    gl.uniformMatrix4fv(u_viewMat, false, mat.elements);

    //清理画布
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    //绘制图形
    gl.drawArrays(gl.TRIANGLES, 0, 9);

    //将数组数据传递给缓冲区对象
    function dataToBuffer(location, count, array) {
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
        gl.vertexAttribPointer(location, count, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(location);
    }
}

if(typeof module !== "undefined") {
    module.export = Example[Object.keys(Example)[0]];
}