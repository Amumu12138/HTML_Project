var Example = Example || {};

/**
 * @desc 模型视图投影矩阵
 */
Example.PerspectiveView_MvpMatrix = function() {
    //获取canvas和gl对象
    var canvas = document.getElementById("webgl");
    var gl = getWebGLContext(canvas);

    //顶点着色器程序
    const VSHADER_SOURCE = `
        attribute vec4 a_position;
        attribute vec2 a_texCoord;
        uniform mat4 u_mvpMat;
        varying vec2 v_texCoord;
        void main() {
            gl_Position = u_mvpMat * a_position;
            v_texCoord = a_texCoord;
        }
    `;

    //片元着色器程序
    const FSHADER_SOURCE =  `
        #ifdef GL_ES
        #ifdef GL_FRAGMENT_PRECISION_HIGH
            precision high float;
        #else
            precision mediump float;
        #endif
        #endif

        uniform sampler2D u_sampler;
        varying vec2 v_texCoord;
        void main() {
            vec4 texture = texture2d(u_sampler, v_texCoord);
            gl_FragColor = vec4(0.2 * texture.r, 0.2 * texture.g, 0.2 * texture.b, 1.0);
        }
    `;

    //初始化着色器
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

    //获取着色器程序中的变量
    var a_position = gl.getAttribLocation(gl.program, "a_position");
    var a_texCoord = gl.getAttribLocation(gl.program, "a_texCoord");
    var u_mvpMat = gl.getUniformLocation(gl.program, "u_mvpMat");
    var u_sampler = gl.getUniformLocation(gl.program, "u_sampler");

    //
}

if(typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}