var Example = Example || {};

/**
 * @desc webGL 测试案例
 */
Example.ClientTest = function() {
    //获取canvas和gl对象
    var canvas = document.getElementById("webgl");
    var  gl = getWebGLContext(canvas);

    //顶点着色器程序
    const VSDHADER_SOURCE = `
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
        #ifdef GL_FRAGMENT_PRESICION_HIGH
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

    //初始化着色器
    initShaders(gl, VSDHADER_SOURCE,  FSHADER_SOURCE);

    //获取着色器程序中变量
    var a_position = gl.getAttribLocation(gl.program, "a_position");
    var a_texCoord = gl.getAttribLocation(gl.program, "a_texCoord");
    var u_sampler  = gl.getUniformLocation(gl.program, "u_sampler");

    var radius54 = Math.PI * 54.0 / 180.0;
    var radius36 = Math.PI * 36.0 / 180.0;
    var sin54 = Math.sin(radius54);
    var cos54 = Math.cos(radius54);
    var tan54 = Math.tan(radius54);
    var sin36 = Math.sin(radius36);
    var cos36 = Math.cos(radius36);

    /**将数据传递给变量 */
    //将顶点数据传递给a_position变量
    var vertices = new Float32Array([
    //    -sin54, 0.5 / cos54 - sin36, -0.5, -0.5 / cos54 * sin54, 0.5, -0.5 / cos54 * sin54,   //三角形ABC
    //    -sin54, 0.5 / cos54 - sin36, 0.5, -0.5 / cos54 * sin54, sin54, 0.5 / cos54 - sin36,  //三角形ACD
    //    -sin54, 0.5 / cos54 - sin36, sin54, 0.5 / cos54 - sin36, 0.0, 0.5 / cos54  //三角形ADE
        -sin54, 0.5 / cos54 - sin36, -0.5, -0.5 / cos54 * sin54, 0.5, -0.5 / cos54 * sin54, 
        sin54, 0.5 / cos54 - sin36, 0.0, 0.5 / cos54  
    ]);
    dataToBuffer(a_position, 2, vertices);

    //将纹理坐标数据传递给a_texture变量
    var radius18 = Math.PI * 18.0 / 180.0;
    var tan18 = Math.tan(radius18);
    var coords = new Float32Array([
        // 0.0, 1 - sin36 , (1 - sin36) * tan18, 0.0, (1 - sin36) / tan54, 0.0,  //三角形ABC
        // 0.0, 1 - sin36, (1 - sin36) / tan54, 0.0, 1.0, 1 - sin36,  //三角形ACD
        // 0.0, 1 - sin36, 1.0, 1 - sin36, 0.5, 1.0 //三角形ADE
        0.0, 1 - sin36 , 0.5 - (1 / (4 * sin54)), 0.0, 0.5 + (1 / (4 * sin54)), 0.0,
        1.0, 1 - sin36, 0.5, 1.0
     ]);
    dataToBuffer(a_texCoord, 2, coords);

    //将纹理图像数据传递给u_sampler变量
     var image = new Image();
     image.onload = () => loadTexture(u_sampler, image, draw);
    image.src = "res/client/redflower.jpg"
     //加载纹理图像
    function loadTexture(location, image, callback) {
        //创建纹理对象
        var texture = gl.createTexture();
        //Y轴反转
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        //开启纹理单元
        gl.activeTexture(gl.TEXTURE0);
        //绑定纹理对象
        gl.bindTexture(gl.TEXTURE_2D, texture);
        //配置纹理参数
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        //配置纹理图像
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
        //将纹理单元编号传递给取样器
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

    //绘制
    function draw() {
        //清理画布
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        //绘制图形
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 5);
    }
}

if(typeof module !== "undefined") {
    moudle.export = Example[Object.keys(Example)[0]];
}