var Example = Example || {};

/**
 * @desc 模型视图投影矩阵(同时显示灰色图像和正常图像)
 */
Example.PerspectiveView_MvpMatrix = function() {
    //获取canvas和gl对象
    var canvas = document.getElementById("webgl");
    var gl = getWebGLContext(canvas);

    //顶点着色器程序
    const VSHADER_SOURCE0 = `
        attribute vec4 a_position0;
        attribute vec2 a_texCoord0;
        attribute vec2 a_texCoord1;
        uniform mat4 u_mvpMat0;
        varying vec2 v_texCoord0;
        varying vec2 v_texCoord1;
        void main() {
            gl_Position = u_mvpMat0 * a_position0;
            v_texCoord0 = a_texCoord0;
            v_texCoord1 = a_texCoord1;
        }
    `;

    //片元着色器程序
    const FSHADER_SOURCE0 =  `
        #ifdef GL_ES
        #ifdef GL_FRAGMENT_PRECISION_HIGH
            precision highp float;
        #else
            precision mediump float;
        #endif
        #endif

        uniform sampler2D u_sampler0;
        uniform sampler2D u_sampler1;
        varying vec2 v_texCoord0;
        varying vec2 v_texCoord1;
        void main() {
            vec4 texture0 = texture2D(u_sampler0, v_texCoord0);
            //判断纹理区域
            if(gl_FragCoord.x <= 200.0) {
                float luminance = 0.299 * texture0.r + 0.578 * texture0.g + 0.114 * texture0.b; //调整亮度
                texture0 = vec4(luminance, luminance, luminance, 1.0);
            }
            gl_FragColor = texture0;
        }
    `;

    //初始化着色器
    initShaders(gl, VSHADER_SOURCE0, FSHADER_SOURCE0);

    //获取着色器程序中的变量
    var a_position0 = gl.getAttribLocation(gl.program, "a_position0");
    var a_texCoord0 = gl.getAttribLocation(gl.program, "a_texCoord0");
    var a_texCoord1 = gl.getAttribLocation(gl.program, "a_texCoord1");
    var u_mvpMat0 = gl.getUniformLocation(gl.program, "u_mvpMat0");
    var u_mvpMat1 = gl.getUniformLocation(gl.program, "u_mvpMat1");
    var u_sampler0 = gl.getUniformLocation(gl.program, "u_sampler0");
    var u_sampler1 = gl.getUniformLocation(gl.program, "u_sampler1");

    /** 将数据传递给变量 */
    //顶点和纹理坐便数组
    var verticesCooords0 = new Float32Array([
        //左侧方块
        -1.0, -0.5, 0.0, 0.0, 0.0, 
        -1.0, 0.5, 0.0, 0.0, 1.0,
        0.0, -0.5, 0.0, 1.0, 0.0,

        -1.0, 0.5, 0.0, 0.0, 1.0,
        0.0, -0.5, 0.0, 1.0, 0.0, 
        0.0, 0.5, 0.0, 1.0, 1.0,

        // //右侧方块
        0.0, -0.5, 0.0, 0.0, 0.0, 
        0.0, 0.5, 0.0, 0.0, 1.0,
        1.0, -0.5, 0.0, 1.0, 0.0,

        1.0, 0.5, 0.0, 1.0, 1.0,
        0.0, 0.5, 0.0, 0.0, 1.0,
        1.0, -0.5, 0.0, 1.0, 0.0
    ]);

    const FSIZE = verticesCooords0.BYTES_PER_ELEMENT;
    //将顶点数据传递给a_position变量
    utils.dataToBuffer(gl, a_position0, 3, verticesCooords0, FSIZE * 5, 0);
    //将纹理坐标数据传递给a_texCoord0变量
    utils.dataToBuffer(gl, a_texCoord0, 2, verticesCooords0, FSIZE * 5, FSIZE * 3);

    //将纹理坐标数据传递给a_texCoord0变量
    // utils.dataToBuffer(gl, a_texCoord1, 2, verticesCooords0, FSIZE * 5, FSIZE * 3);

    //将数据传递给u_mvpMat变量
    var proMat = new Matrix4();
    var viewMat = new Matrix4();
    var modelMat = new Matrix4();
    var mvpMat = new Matrix4();

    proMat.setPerspective(60, canvas.clientWidth / canvas.clientHeight, 1, 100);
    viewMat.setLookAt(0, 0, 2, 0, 0, -1, 0, 1, 0);
    modelMat.setRotate(60, 0, 0, 1);
    mvpMat.set(proMat).multiply(viewMat).multiply(modelMat);    //注意顺序不能弄混
    gl.uniformMatrix4fv(u_mvpMat0, false, mvpMat.elements);

    let loadImage0End = false, loadImage1End = false;
    //将纹理图像数据传递给u_sampler0变量
    var image0 = new Image();
    image0.onload = () => utils.loadTexture(gl, u_sampler0, gl.TEXTURE0, image0, 0, function() {
        loadImage0End = true;
        //绘制左边灰色区域图像
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    });
    image0.src = "res/client/redflower.jpg";
   
   
    //将纹理图像数据传递给u_sampler1变量
    var image1 = new Image();
    image1.onload = () => utils.loadTexture(gl, u_sampler0, gl.TEXTURE1, image1, 1, function() {
        loadImage1End = true;
        if(loadImage0End && loadImage1End) {
            //绘制右侧区域图像
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            // gl.clear(gl.COLOR_BUFFER_BIT);
          
            gl.drawArrays(gl.TRIANGLES, 6, 6);
         }
    });
    image1.src = "res/client/yellowflower.jpg";
}

if(typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}