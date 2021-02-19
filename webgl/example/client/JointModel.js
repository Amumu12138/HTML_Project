var Example = Example || {};

/**
 * @desc 手臂关节模型
 */
Example.JointModel = function() {
    //获取canvas和gl对象
    var canvas = document.getElementById("webgl");
    var gl = getWebgGLContext(canvas);

    //顶点着色器程序
    const VSDHADER_SOURCE = `
        attribute vec4 a_position;
        attribute vec4 a_normal;
        attribute vec4 a_color;
        void main() {

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

    //初始化着色器程序
    initShaders(gl, VSDHADER_SOURCE, FSAHDER_SOURCE);

    //获取着色器程序中的变量
    var a_position = gl.getAttribLocation(gl.program, "a_position");

    /** 将数据传递给变量 */

    //清理画布
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    //绘制图形
    gl.drawArrays(gl.TRIANGLES, 0, n);
}

if(typeof module !== "undefined") {
    module.export = Example[Object.keys(Example)[0]];
}