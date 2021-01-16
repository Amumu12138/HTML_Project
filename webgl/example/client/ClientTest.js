var Example = Example || {};

/**
 * @desc WebGL编程指南 ClientTest
 */
Example.ClientTest = function () {
    //获取canvas和gl对象
    var canvas = document.getElementById("webgl");
    var gl = getWebGLContext(canvas);

    //顶点着色器程序
    const VSHADER_SOURCE = `
        attribute vec4 a_position;
        attribute float a_pointSize;
        attribute vec4 a_color;
        varying vec4 v_color;
        void main() {
            gl_Position = a_position;
            gl_PointSize = a_pointSize;
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

    //获取着色器程序中变量
    var a_position = gl.getAttribLocation(gl.program, "a_position");
    var a_pointSize = gl.getAttribLocation(gl.program, "a_pointSize");
    var a_color = gl.getAttribLocation(gl.program, "a_color");

    //将数据传递给变量
    //顶点数据
    var vertices = new Float32Array([
        -0.5, -0.5, 
        0.5, -0.5,
        0.0, 0.5
    ]);

    //创建顶点位置缓冲区
    var vertexBuffer = gl.createBuffer();
    //绑定缓冲区对象
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    //将数据传递给缓冲区
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    //将缓冲区对象分配给变量
    gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);
    //开启指定的变量
    gl.enableVertexAttribArray(a_position);

    //顶点尺寸数据
    var sizes = new Float32Array([5.0, 10.0, 15.0]);
    //传递顶点数据给a_pointSize
    var sizeBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_pointSize, 1, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_pointSize);

    //传递数据给a_color变量
    var colors = new Float32Array([1.0, 1.0, 0.0, 1.0]);
    gl.vertexAttrib4fv(a_color, colors);

    //清理画布
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    //绘制图形
    gl.drawArrays(gl.POINTS, 0, 3);
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}