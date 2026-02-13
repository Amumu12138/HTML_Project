var Example = Example || {};

/**
 * @desc 绘制一个坐标点
 */
Example.Point2 = function() {
    //获取canvas和gl对象
    var canvas = document.getElementById("webgl");
    var gl = getWebGLContext(canvas);
    if(!gl) {
        console.error("Amumu Point2 gl is null !");
        return;
    }

    //自定义适应屏幕分辨率
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //顶点着色器程序
    var VSHADER_SOURCE = `
        attribute vec4 a_position;
        attribute float a_pointSize;
        void main() {
            gl_Position = a_position;
            gl_PointSize = a_pointSize;
        }
    `;

    //片元着色器
    var FSHADER_SOURCE = `
        precision mediump float;
        uniform vec4 u_fragColor;
        void main() {
            gl_FragColor = u_fragColor;
        }
    `;

    //初始化着色器程序
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
    //获取着色器程序中的变量
    var a_position = gl.getAttribLocation(gl.program, "a_position");
    var a_pointSize = gl.getAttribLocation(gl.program, "a_pointSize");
    var u_fragColor = gl.getUniformLocation(gl.program, "u_fragColor");

    //将数据传递给变量
    gl.vertexAttrib4f(a_position, 0.0, 0.0, 0.0, 1.0);
    gl.vertexAttrib1f(a_pointSize, 5.0);
    gl.uniform4f(u_fragColor, 0.0, 1.0, 0.0, 1.0);

    //清理缓冲区
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    //绘制图形
    gl.drawArrays(gl.POINTS, 0, 1);
}

if(typeof module !== "undefined") {
    module.export = Example[Object.keys(Example)[0]];
}