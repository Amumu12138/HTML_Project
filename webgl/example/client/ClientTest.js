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
        attribute vec2 a_texCoord;
        varying vec2 v_texCoord;
        void main() {
            gl_Position = a_position;
            v_texCoord = a_texCoord;
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

        uniform sampler2D u_sampler;
        varying vec2 v_texCoord;
        void main() {
            gl_FragColor = texture2D(u_sampler, v_texCoord);
            // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
    `;

    // 初始化着色器
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

    //获取着色器程序中的变量
    var a_position = gl.getAttribLocation(gl.program, "a_position");
    var a_texCoord = gl.getAttribLocation(gl.program, "a_texCoord");
    var u_sampler = gl.getUniformLocation(gl.program, "u_sampler");
    
    /** 将数据传递给变量 */
    //将顶点数据传递给a_position变量
    var vertices = new Float32Array([
        -1.73 / 2, 0.5, -1.73 / 2, -0.5, 1.73 / 2, -0.5, //三角形ABD
        -1.73 / 2, 0.5, 1.73 / 2, 0.5, 1.73 / 2, -0.5, //三角形AED
        -1.73 / 2, -0.5, 0.0, -1.0, 1.73 / 2, -0.5,     //三角形BCD
        -1.73 / 2, 0.5, 0.0, 1.0, 1.73 / 2, 0.5 //三角形AFE
    ]);
    dataToBuffer(a_position, 2, vertices);
    //将纹理左边传递给a_texCoord变量
    var coords = new Float32Array([
        0.0, 0.75, 0.0, 0.25, 1.0, 0.25, //三角形ABD纹理坐标
        0.0, 0.75, 1.0, 0.75, 1.0, 0.25, //三角形AED纹理坐标
        0.0, 0.25, 0.5, 0.0, 1.0, 0.25, //三角形BCD纹理坐标
        0.0, 0.75, 0.5, 1.0, 1.0, 0.75, //三角形AFE纹理坐标
    ]);
    dataToBuffer(a_texCoord, 2, coords);

    // gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // gl.clear(gl.COLOR_BUFFER_BIT);
    // //绘制图形
    // gl.drawArrays(gl.TRIANGLES, 0, 12);

    //将图像数据传递给u_sampler变量
    var image01 = new Image();
    image01.onload = () => loadTexture(u_sampler, image01, function() {
        //清理画布
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        //绘制图形
        gl.drawArrays(gl.TRIANGLES, 0, 12);
    });
    image01.src = "res/client/7herbs.jpg";

    //加载纹理图像
    function loadTexture(location, image, callback) {
        var texture = gl.createTexture();
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
        gl.uniform1i(location, 0);

      if(callback) callback();
    }

    //将数据传递给缓冲区对象
    function dataToBuffer(location, count, array) {
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
        gl.vertexAttribPointer(location, count, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(location);
    }
}

if(typeof module !== "undefined") {
    moudle.export = Example[Object.keys(Example)[0]];
}