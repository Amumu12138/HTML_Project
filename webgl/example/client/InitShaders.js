var Example = Example || {};

/**
 * @desc 着色器和着色器程序对象
 */
Example.InitShaders = function() {
    //获取canvas和gl对象
    var canvas = document.getElementById("webgl");
    var gl = getWebGLContext(canvas);

    //顶点着色器程序
    const VSHADER_SOURCE = `
        attribute vec4 a_position;
        attribute float a_pointSize;
        void main() {
            gl_Position = a_position;
            gl_PointSize = a_pointSize;
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

        void main() {
            gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        }
    `;

    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

    //获取着色器程序中的变量
    var a_position = gl.getAttribLocation(gl.program, "a_position");
    var a_pointSize = gl.getAttribLocation(gl.program, "a_pointSize");

    //将顶点位置数据传递给a_position变量
    gl.vertexAttrib4fv(a_position, new Float32Array([0.0, 0.0, 0.0, 1.0]));
    //将顶点位置池逊传递给a_pointSize变量
    gl.vertexAttrib1f(a_pointSize, 10.0);

    //绘制一个点
    draw(gl.POINTS, 0, 1);
    //绘制
    function draw(mode, start, count) {
        //清理画布
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        //绘制图形
        gl.drawArrays(mode, start, count);
    }

    //初始化着色器程序
    function initShaders(gl, vertexSource, fragmentSource) {
        //创建着色器对象
        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        //向着色器对象中填充着色器程序的源代码
        gl.shaderSource(vertexShader, vertexSource);
        gl.shaderSource(fragmentShader, fragmentSource);
        //解释着色器
        gl.compileShader(vertexShader);
        gl.compileShader(fragmentShader);
        //创价和程序对象
        var program = gl.createProgram();
        //为程序对象分配着色器
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        //连接程序对象
        gl.linkProgram(program);
        //使用程序对象
        gl.useProgram(program);
        gl.program = program;

        return true;
    }
}

if(typeof module !== "undefined") {
    module.export = Example[Object.keys(Example)[0]];
}