var Example = Example || {};

/**
 * @desc webGL 测试案例
 */
Example.ClientTest = function() {
    //获取canvas和gl对象
    var canvas = document.getElementById("webgl");
    var gl = getWebGLContext(canvas);
    
    //顶点着色器程序
    const VSHADER_SOURCES = `
        attribute vec4 a_position;
        attribute vec4 a_color;
        varying vec4 v_color;
        void main() {
            gl_Position = a_position;
            gl_PointSize = 10.0;
            v_color = a_color;
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
    initShaders(gl, VSHADER_SOURCES, FSHADER_SOURCE);

    //获取着色器程序中的变量
    var a_position = gl.getAttribLocation(gl.program, "a_position");
    var a_color = gl.getAttribLocation(gl.program, "a_color");

    /** 将数据传递给变量 */
    gl.vertexAttrib4fv(a_position, new Float32Array([0.0, 0.0, 0.0, 1.0]));
    gl.vertexAttrib4fv(a_color, new Float32Array([1.0, 0.0, 0.0, 1.0]));
    
    //清理画布
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    //绘制图形
    gl.drawArrays(gl.POINTS, 0, 1);
}

if(typeof module !== "undefined") {
    moudle.export = Example[Object.keys(Example)[0]];
}