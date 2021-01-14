var Example = Example || {};

/**
 * @desc 复合变换(叠加平移,旋转,缩放)
 */
Example.RotatedTranslateTriangle = function() {
    //获取canvas和gl对象
    var canvas = document.getElementById('webgl');
    var gl = getWebGLContext(canvas);

    //顶点着色器程序
    const VSHADER_SOURCE = `
        attribute vec4 a_position;
        uniform mat4 u_modleMat;
        void main() {
            gl_Position = u_modleMat * a_position;
        } 
    `;

    //片元着色器程序
    const FSHADER_SOURCE = `
        precision mediump float;
        uniform vec4 u_fragColor;
        void main() {
            gl_FragColor = u_fragColor;
        }
    `;

    //初始化着色器
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

    //获取着色器程序中的变量
    var a_position = gl.getAttribLocation(gl.program, "a_position");
    var u_modleMat = gl.getUniformLocation(gl.program, "u_modleMat");
    var u_fragColor = gl.getUniformLocation(gl.program, "u_fragColor");

    //将数据传递给变量
    var vertices = new Float32Array([0.5, 0.5, 0.0, 1.0]);
    gl.vertexAttrib4fv(a_position, vertices);
    var colors = new Float32Array([1.0, 0.0, 0.0, 1.0]);
    gl.uniform4fv(u_fragColor, colors);

    //绕Z轴旋转ANGLE角度
    const ANGLE = 90.0;
    var mat = new Matrix4();
    mat.setRotate(ANGLE, 0, 0, 1);
    //沿x轴平移0.5个单位
    mat.translate(-0.5, 0.0, 0.0);
    //再沿x、y、轴各缩放0.5倍
    mat.scale(0.5, 0.5, 0.5);
    gl.uniformMatrix4fv(u_modleMat, false, mat.elements);

     /* 使用缓冲区对象传递给三角形顶点数据 */
    //三角形顶点数据
    var vertices = new Float32Array([
        0.0, 0.0,
        0.5, 0.0,
        0.5, 0.5
    ]);
    //创建缓冲区对象
    var v_buffer = gl.createBuffer();
    //绑定缓冲区对象
    gl.bindBuffer(gl.ARRAY_BUFFER, v_buffer);
    //将数据传递给缓冲区对象
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    //将缓冲区对象分配给变量
    gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);
    //开启指定的变量
    gl.enableVertexAttribArray(a_position);

    //清理画布
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    //绘制图形
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}

if(typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}