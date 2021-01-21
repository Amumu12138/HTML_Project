var Example = Example || {};

/**
 * @desc 多幅纹理映射在图形上
 */
Example.MultiTexture = function() {
    //获canvas和gl对象
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
        precision mediump float;
        uniform sampler2D u_sampler0;
        uniform sampler2D u_sampler1;
        varying vec2 v_texCoord;
        void main() {
            vec4 color0 = texture2D(u_sampler0, v_texCoord);
            vec4 color1 = texture2D(u_sampler1, v_texCoord);
            gl_FragColor = color0 * color1;
        }
    `;

    //初始化着色器
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
    //获取着色器程序中变量
    var a_position = gl.getAttribLocation(gl.program, "a_position");
    var a_texCoord = gl.getAttribLocation(gl.program, "a_texCoord");
    var u_sampler0 =  gl.getUniformLocation(gl.program, "u_sampler0");
    var u_sampler1 =  gl.getUniformLocation(gl.program, "u_sampler1");
    /* 将数据传递给变量 */
    var vertiesCoords = new Float32Array([
        -0.5, 0.5, 0.0, 1.0,
        -0.5, -0.5, 0.0, 0.0,
        0.5, 0.5, 1.0, 1.0,
        0.5, -0.5, 1.0, 0.0
    ]);

    const FSIZE = vertiesCoords.BYTES_PER_ELEMENT;
    //将数据传递给a_position变量
    dataToBuffer(a_position, 2, vertiesCoords, FSIZE * 4, 0);
    //将数据传递给a_texCoord变量
    dataToBuffer(a_texCoord, 2, vertiesCoords, FSIZE * 4, FSIZE * 2);

    //加载图像
    var image0 = new Image();
    image0.onload = () => loadTexture(gl.TEXTURE0, u_sampler0, 0, image0);
    image0.src = "res/client/7herbs.jpg";

    var image1 = new Image();
    image1.onload = () => loadTexture(gl.TEXTURE1, u_sampler1, 1, image1);
    image1.src = "res/client/circle.gif";

    var activeTexture0 = false, activeTexture1 =false;
    //加载纹理数据
    function loadTexture(texTureObj, location, texUnit, image) {
        //出啊关键纹理对象
        var texture = gl.createTexture();
        //Y轴翻转
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        //开启纹理单元
        gl.activeTexture(texTureObj);
        //绑定纹理对象
        gl.bindTexture(gl.TEXTURE_2D, texture);
        //配置纹理参数
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        //配置纹理图像
        gl.texImage2D(gl.TEXTURE_2D, 0,  gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        //将纹理单元编号传动给取样器
        gl.uniform1i(location, texUnit);

        if(texUnit == 0) {
            activeTexture0  = true;
        } else if(texUnit == 1) {
            activeTexture1 = true;
        }

        if(activeTexture0 && activeTexture1) {
            //清理画布
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            //绘制图形
            gl.drawArrays(gl.TRIANGLES, 0, 3); 
        }
    }

    //将数据传递给缓冲区对象
    function dataToBuffer(location, count, array, stride, offset) {
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
        gl.vertexAttribPointer(location, count, gl.FLOAT, false, stride, offset);
        gl.enableVertexAttribArray(location);
    }

}

if(typeof module !== "undefined") {
    moudle.export = Example[Object.keys(Example)[0]];
}