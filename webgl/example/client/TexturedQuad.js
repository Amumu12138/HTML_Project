var Example = Example || {};

/**
 * @desc 将纹理图像映射到图形上
 */
Example.TexturedQuad = function() {
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

    //片元着色器
    const FSHADER_SOURCE = `
        precision mediump float;
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
    /* 将数据传递给变量 */
    //顶点和纹理坐标数组
    var verticesTexCoords = new Float32Array([
        -0.5, 0.5, 0.0, 1.0,
        -0.5, -0.5, 0.0, 0.0,
        0.5, -0.5, 1.0, 0.0,
        0.5, 0.5, 1.0, 1.0 
    ]);
    const FSIZE = verticesTexCoords.BYTES_PER_ELEMENT;

    //将顶点数据传递给a_position变量
    dataToBuffer(a_position, 2, verticesTexCoords, FSIZE * 4, 0);
    //将纹理数据传递给a_texCoord变量
    dataToBuffer(a_texCoord, 2, verticesTexCoords, FSIZE * 4, FSIZE * 2);

    //创建一个Image对象
    var image = new Image();
    image.src = "res/texture/panda.jpg";
    image.onload = initTextures();

    //初始化纹理图像
    function initTextures() {
        //创建纹理对象
        var texture = gl.createTexture();
        //对纹理图像进行y轴翻转
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        //开启0号纹理单元
        gl.activeTexture(gl.TEXTURE0);
        //向目标纹理绑定纹理对象
        gl.bindTexture(gl.TEXTURE_2D, texture);
        //配置纹理参数
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        //配置纹理图像
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
        //将0号纹理传递给着色器
        gl.uniform1i(u_sampler, 0);

         //清理画布
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        //绘制图形
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    // function texture() {
    //     var texture = gl.createTexture(); //创建纹理图像缓冲区
    //     gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); //纹理图片上下反转
    //     gl.activeTexture(gl.TEXTURE0); //激活0号纹理单元TEXTURE0
    //     gl.bindTexture(gl.TEXTURE_2D, texture); //绑定纹理缓冲区
    //     //设置纹理贴图填充方式(纹理贴图像素尺寸大于顶点绘制区域像素尺寸)
    //     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    //     //设置纹理贴图填充方式(纹理贴图像素尺寸小于顶点绘制区域像素尺寸)
    //     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    //     //设置纹素格式，jpg格式对应gl.RGB
    //     gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    //     gl.uniform1i(u_Sampler, 0); //纹理缓冲区单元TEXTURE0中的颜色数据传入片元着色器
    //     // 进行绘制
    //     gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    // }

   

    //将数据传递给缓冲区对象
    function dataToBuffer(location, count, array, stride, offset) {
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
        gl.vertexAttribPointer(location, count, gl.FLOAT, false, stride, offset);
        gl.enableVertexAttribArray(location);
    }

}

if(typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}