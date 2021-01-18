var Example = Example || {};

/**
 * @desc webGL 测试案例
 */
Example.ClientTest = function() {
    //获取canvas和gl对象
    var canvas = document.getElementById("webgl");
    var gl = getWebGLContext(canvas);
    
    //顶点着色器
    const VSHADER_SOURCE = `
        attribute vec4 a_position;
        attribute float a_pointSize;
        uniform mat4 u_mat;
        void main() {
            gl_Position = u_mat * a_position;
            gl_PointSize = a_pointSize;
        }
    `;

    //片元着色器
    const FSHADER_SOURCE = `
        precision highp float;
        uniform vec4 u_fragColor;
        uniform float u_width, u_height;
        void main() {
            float fragColorR = gl_FragCoord.x / u_width;
            float fragColorB = gl_FragColor.y / u_height;
            gl_FragColor = vec4(fragColorR, 0.0, fragColorB, 1.0);
        }
    `;

    //初始化着色器
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

    //获取着色器变量
    var a_position = gl.getAttribLocation(gl.program, 'a_position');
    var a_pointSize = gl.getAttribLocation(gl.program, 'a_pointSize');
    var u_mat = gl.getUniformLocation(gl.program, 'u_mat');
    // var u_fragColor = gl.getUniformLocation(gl.program, 'u_fragColor');
     var u_width = gl.getUniformLocation(gl.program, 'u_width');
     var u_height = gl.getUniformLocation(gl.program, 'u_height');

    //将数据传输给变量
    var verticesSizes = new Float32Array([
        -0.5, -0.5, 10.0, 
        0.5, -0.5, 20.0, 
        0.0, 0.5, 30.0
    ]);
    var FSIZE = verticesSizes.BYTES_PER_ELEMENT;

    //给a_position顶点位置变量传递数据
    dataToBuffer(verticesSizes, 2, a_position, FSIZE * 3, 0);
    //给a_pointSize顶点位置变量传递数据
    dataToBuffer(verticesSizes, 1, a_pointSize, FSIZE * 3, FSIZE * 2);
    //给u_mat变量传递数据
    const TX = 0.0;
    var mat = new Matrix4();
    mat.setTranslate(TX, 0, 0);
    gl.uniformMatrix4fv(u_mat, false, mat.elements);
    //给r变量传递数据
    // var colors = new Float32Array([1.0, 0.0, 0.0, 1.0]);
    // gl.uniform4fv(u_fragColor, colors);
    gl.uniform1f(u_width, gl.drawingBufferWidth);
    gl.uniform1f(u_height, gl.drawingBufferHeight);

    //清理画布
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    //绘制图形
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    //将数据传输给缓冲区
    function dataToBuffer(data, count, location, stride, offset) {
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
        gl.vertexAttribPointer(location, count, gl.FLOAT, false, stride, offset);
        gl.enableVertexAttribArray(location);
    }
}

if(typeof module !== "undefined") {
    moudle.export = Example[Object.keys(Example)[0]];
}