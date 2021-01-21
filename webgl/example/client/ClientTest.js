var Example = Example || {};

/**
 * @desc webGL 测试案例
 */
Example.ClientTest = function() {
    //获取canvas和gl对象
    var canvas = document.getElementById("webgl");
    var gl = getWebGLContext(canvas);

    //顶点着色器程序
    const VSHADER_SOURCE = `
        attribute vec4 a_position;
        attribute vec4 a_color;
        uniform mat4 u_mat;
        varying vec4 v_color;
        void main() {
            gl_Position = u_mat * a_position;
            v_color = a_color;
        }
    `;

    //片元着色器
    const FSHADER_SOURCE = `
        precision mediump float;
        varying vec4 v_color;
        void main() {
            gl_FragColor = v_color;
        }
    `;

    //初始化着色器
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
    //获取着色器程序中变量
    var a_position = gl.getAttribLocation(gl.program, "a_position");
    var a_color = gl.getAttribLocation(gl.program, "a_color");
    var u_mat = gl.getUniformLocation(gl.program, "u_mat");

    //将数据传递给变量
    var datas = new Float32Array([
        0.0, 0.0, 1.0, 0.0, 0.0,
        0.5, 0.5, 0.0, 1.0, 0.0
    ]);
    const FSIZE = datas.BYTES_PER_ELEMENT;
    //将数据传递给a_position变量
    dataToBuffer(a_position, 2, datas, FSIZE * 5, 0);
    //将数据传递给a_color变量
    dataToBuffer(a_color, 3, datas, FSIZE * 5, FSIZE * 2);
 
    //将数据传递给u_mat变量
    // const ANGLE = 0.0;
    // var mat = new Matrix4();
    // mat.setRotate(ANGLE, 0.25, 0.25, 1);
    // gl.uniformMatrix4fv(u_mat, false, mat.elements);

    //清理画布
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    //绘制图形
    gl.drawArrays(gl.LINES, 0, 2);

    //将数据传递给缓冲区对象
    function dataToBuffer(location, count, data, stride, offset) {
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
        gl.vertexAttribPointer(location, count, gl.FLOAT, false, stride, offset);
        gl.enableVertexAttribArray(location);
    }

    var currentAngle = 0.0;
    //将图形旋转起来
    // setInterval(function() {
    //     currentAngle = (currentAngle + 1.0) % 360.0;
    //     mat.rotate(currentAngle, 0, 0, 1);
    //     gl.uniformMatrix4fv(u_mat, false, mat.elements);

    //     gl.clear(gl.COLOR_BUFFER_BIT);
    //     gl.drawArrays(gl.LINES, 0, 2);
    // }, 100);

    function draw(angle) {
        var newMat = new Matrix4();
        newMat.setRotate(angle, 0, 0, 1);
        gl.uniformMatrix4fv(u_mat, false, newMat.elements);

        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.LINES, 0, 2);
    }

    var g_last = Date.now();
    function animation(angle) {
        //获取当前时间与上一时间间隔
        var now = Date.now();
        var deltaTime = now - g_last;
        g_last = now;
        return angle + (10.0 * deltaTime) / 1000.0 % 360;
    }

    function tick() {
        currentAngle = animation(currentAngle);
        draw(currentAngle);
        requestAnimationFrame(tick);
    }
    tick();
}

if(typeof module !== "undefined") {
    moudle.export = Example[Object.keys(Example)[0]];
}