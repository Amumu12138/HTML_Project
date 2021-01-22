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
        precision mediump float;
        #endif

        uniform sampler2D u_sampler;
        varying vec2 v_texCoord;
        void main() {
            gl_FragColor = texture2D(u_sampler, v_texCoord);
        }
    `;

    //初始化着色器
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
    //获取着色器程序中的变量
    var a_position = gl.getAttribLocation(gl.program, "a_position");
    var a_texCoord = gl.getAttribLocation(gl.program, "a_texCoord");
    var u_sampler = gl.getUniformLocation(gl.program, "u_sampler");

    /** 将数据传递给变量 */
    //将顶点数据传递给a_position变量
    var vertices = new Float32Array([
        -0.5, -0.5, 0.0,
        -0.5, 0.5, 0.0,
        0.5, -0.5, 0.0,
        0.5, 0.5, 0.0
    ]);
    dataToBuffer(a_position, vertices, 3);

    //将纹理坐标传递给a_texCoord变量
    var texCoords = new Float32Array([
        0.0, 0.0,
        0.0, 1.0,
        1.0, 0.0,
        1.0, 1.0
    ]);
    dataToBuffer(a_texCoord, texCoords, 2);

    //将纹理数据传给给u_sampler变量
    var gif = new Image();
    gif.onload = () => loadTexture(u_sampler, gif , function() {
          //清理画布
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        //绘制图形
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    });
    gif.src = "res/client/circle.gif";

    //将数据传递给缓冲区对象
    function dataToBuffer(location, array, count) {
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
        gl.vertexAttribPointer(location, count, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(location);
    }

    //加载纹理对象
    function loadTexture(location, image, callback) {
        //创建纹理对象
        var texture = gl.createTexture();
        //进行Y轴翻转
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        //开启纹理单元
        gl.activeTexture(gl.TEXTURE0);
        //绑定纹理对象
        gl.bindTexture(gl.TEXTURE_2D, texture);
        //配置纹理参数
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        //配置纹理图像
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
        //将纹理单元编号传给给取样器
        gl.uniform1i(location, 0);

        if(callback) callback();
    }

    // var arr =  new Float32Array([
    //     1.0, 2.0, 3.0, 4.0,
    //     5.0, 6.0, 7.0, 8.0,
    //     9.0, 10.0, 11.0,12.0, 
    //     13.0, 14.0, 15.0, 16.0
    // ]);
    // console.log("arr[0] = ", arr[0]);
}

if(typeof module !== "undefined") {
    moudle.export = Example[Object.keys(Example)[0]];
}