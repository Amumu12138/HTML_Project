var Example = Example || {};

/**
 * @desc 投影视图
 */
Example.PerspectiveView = function() {
    //获取canvas和gl对象
    var canvas = document.getElementById("webgl");
    gl = getWebGLContext(canvas);

    //顶点着色器程序
    const VSHADER_SOURCE = `
        attribute vec4 a_position;
        attribute vec4 a_color;
        uniform mat4 u_viewMat; //视图矩阵
        uniform mat4 u_proMat;  //投影矩阵
        varying vec4 v_color;
        void main() {
            gl_Position = u_proMat * u_viewMat * a_position;
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

    //初始化着色器
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

    //获取着色器程序中的变量
    var a_position = gl.getAttribLocation(gl.program, "a_position");
    var a_color = gl.getAttribLocation(gl.program, "a_color");
    var u_proMat = gl.getUniformLocation(gl.program, "u_proMat");
    var u_viewMat = gl.getUniformLocation(gl.program, "u_viewMat");

    /** 将数据传递给变量 */
    //顶点左边和颜色数据
    var verticesColors = new Float32Array([
        //右侧三个三角形
        0.75, 1.0, -4.0, 1.0, 0.0, 0.0,
        0.25, -1.0, -4.0, 1.0, 0.0, 0.0,
        1.25, -1.0, -4.0, 1.0, 0.0, 0.0,

        0.75, 1.0, -2.0, 0.0, 1.0, 0.0,
        0.25, -1.0, -2.0, 0.0, 1.0, 0.0,
        1.25, -1.0, -2.0, 0.0, 1.0, 0.0,
        
        0.75, 1.0, 0.0, 0.0, 0.0, 1.0,
        1.25, -1.0, 0.0, 0.0, 0.0, 1.0,
        0.25, -1.0, 0.0, 0.0, 0.0, 1.0,

        //左侧三个三角形
        -0.75, 1.0, -4.0, 1.0, 0.0, 0.0,
        -1.25, -1.0, -4.0, 1.0, 0.0, 0.0,
        -0.25, -1.0, -4.0, 1.0, 0.0, 0.0,

        -0.75, 1.0, -2.0, 0.0, 1.0, 0.0,
        -0.25, -1.0, -2.0, 0.0, 1.0, 0.0,
        -1.25, -1.0, -2.0, 0.0, 1.0, 0.0,
        
        -0.75, 1.0, 0.0, 0.0, 0.0, 1.0,
        -1.25, -1.0, 0.0, 0.0, 0.0, 1.0,
        -0.25, -1.0, 0.0, 0.0, 0.0, 1.0,
    ]);
    const FSIZE = verticesColors.BYTES_PER_ELEMENT;

    //将顶点坐标数据传递给a_position变量
    utils.dataToBuffer(gl, a_position, 3, verticesColors, FSIZE * 6, 0);
    //将顶点坐标数据传递给a_color变量
    utils.dataToBuffer(gl, a_color, 3, verticesColors, FSIZE * 6, FSIZE * 3);
    //将顶点坐标数据传递给u_proMat变量
    var proMat = new Matrix4();
    proMat.setPerspective(30, canvas.clientWidth / canvas.clientWidth, 1, 100 );
    gl.uniformMatrix4fv(u_proMat, false, proMat.elements);
    //将顶点坐标数据传递给u_viewMat变量
    var viewMat = new Matrix4();
    viewMat.setLookAt(0, 0, 5, 0, 0, -100, 0, 1, 0);
    gl.uniformMatrix4fv(u_viewMat, false, viewMat.elements);

    //绘制图形
    utils.draw(gl, gl.TRIANGLES, 0, 18);
}

if(typeof module !== "undefined") {
    module.export = Example[Object.keys(Example)[0]];
}