var Example = Example || {};

/**
 * @desc 旋转三角形
 */
Example.RotatedTriangle = function() {
    //获取canvas和webgl对象
    var canvas = document.getElementById("webgl");
    var gl = getWebGLContext(canvas);

    //自定义适应屏幕
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if(!gl) {
        console.error('Amumu RotatedTriangle gl is null');
        return;
    }

    //顶点着色器程序
    var VSHADER_SOURCE = `
        attribute vec4 a_position;
        uniform float u_sinB, u_cosB;
        void main() {
            float after_x = a_position.x * u_cosB - a_position.y * u_sinB;
            float after_y = a_position.x * u_sinB + a_position.y * u_cosB;
            gl_Position = vec4(after_x, after_y, a_position.z, 1.0);
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

    if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.error("Amumu RotatedTriangle initSahders is failer");
        return;
    }

    //获取顶点着色器和片元着色变量
    var a_position = gl.getAttribLocation(gl.program, "a_position");
    var u_sinB = gl.getUniformLocation(gl.program, "u_sinB");
    var u_cosB = gl.getUniformLocation(gl.program, "u_cosB");
    var u_fragColor = gl.getUniformLocation(gl.program, "u_fragColor");
    //将数据写入变量
    var angle = 30.0;
    var radius = Math.PI * angle / 180.0;
    gl.uniform1f(u_sinB, Math.sin(radius));
    gl.uniform1f(u_cosB, Math.cos(radius));
    gl.uniform4f(u_fragColor, 1.0, 0.0, 0.0, 1.0);

    //使用缓冲区对象写入定点数据
    var vertices = new Float32Array([0.5, 0.5, 0.0, 1.0, 0.0, 0.0]);
    var v_buffer = gl.createBuffer();   //创建缓冲区
    gl.bindBuffer(gl.ARRAY_BUFFER, v_buffer);   //绑定缓冲区
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);   //将数据写入缓冲区         
    gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);   //将缓冲区对象分配给a_position对象
    gl.enableVertexAttribArray(a_position); //开启a_position变量

    //清理画布
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    //绘制图形
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}
if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}