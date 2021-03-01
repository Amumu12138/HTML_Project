var Example = Example || {};

/**
 * @desc webGL 测试案例
 */
Example.ClientTest = function() {
    //获取canvas和gl对象
    var canvas = document.getElementById("webgl");
    var gl = getWebGLContext(canvas);

    //顶点着色器程序
    const VERTEX_SOURCE = `
        void main() {
            gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
            gl_PointSize = 10.0;
        }
    `;

    //片元着色器程序
    const FRAGMENT_SOURCE = `
        void main() {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
    `;

    //初始化着色器程序
    utils.initShaders(gl, VERTEX_SOURCE, FRAGMENT_SOURCE);
    //清理画布
    gl.clearColor(0.0, 0.0, 0.0, 0.5);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    //绘制图形
    gl.drawArrays(gl.POINTS, 0, 1);
}

if(typeof module !== "undefined") {
    moudle.export = Example[Object.keys(Example)[0]];
}