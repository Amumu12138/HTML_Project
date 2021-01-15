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
        uniform mat4 u_mat;
        void main() {
            gl_Position = u_mat * a_position;
        }
    `;

    //片元着色器
    const FSHADER_SOURCE = `
        precision highp float;
        uniform vec4 u_fragColor;
        void main() {
            gl_FragColor = u_fragColor;
        }
    `;

    //初始化着色器
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

    //获取着色器程序中变量
    var a_position = gl.getAttribLocation(gl.program, "a_position");
    var u_mat = gl.getUniformLocation(gl.program, "u_mat");
    var u_fragColor = gl.getUniformLocation(gl.program, "u_fragColor");

    //将数据传递给变量
    //正方体顶点数据
    var vertices = new Float32Array([
        //z为0.5时，xOy平面上的四个点坐标
        0.5, 0.5, 0.5,
        -0.5, 0.5, 0.5,
        -0.5, -0.5, 0.5,
        0.5, -0.5, 0.5,
        //z为-0.5时，xOy平面上的四个点坐标
        0.5, 0.5, -0.5,
        -0.5, 0.5, -0.5,
        -0.5, -0.5, -0.5,
        0.5, -0.5, -0.5,
        //上面两组坐标分别对应起来组成一一对
        0.5, 0.5, 0.5,
        0.5, 0.5, -0.5,

        -0.5, 0.5, 0.5,
        -0.5, 0.5, -0.5,

        -0.5, -0.5, 0.5,
        -0.5, -0.5, -0.5,

        0.5, -0.5, 0.5,
        0.5, -0.5, -0.5,
    ]);
    //创建缓冲区对象
    var buffer = gl.createBuffer();
    //绑定缓冲区对象
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    //将数据传递给缓冲区对象
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    //将缓冲区变量分配给变量
    gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, 0, 0);
    //开启指定的变量
    gl.enableVertexAttribArray(a_position);

    //给u_fragColor变量传递数据
    var colors = new Float32Array([1.0, 0.0, 0.0, 1.0]);
    gl.uniform4fv(u_fragColor, colors);

    //给u_mat变量传递数据
    var mat = new Matrix4();
    mat.setRotate(20.0, 0, 1, 0);
    mat.rotate(20.0, 1, 0, 0);
    gl.uniformMatrix4fv(u_mat, false, mat.elements);

    //清理画布
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    //绘制图形
    //LINE_LOOP模式绘制前四个点
    gl.drawArrays(gl.LINE_LOOP, 0, 4);
    //LINE_LOOP模式从第五个点开始绘制四个点
    gl.drawArrays(gl.LINE_LOOP, 4, 4);
    //LINES模式绘制后8个点
    gl.drawArrays(gl.LINES, 8, 8);
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}