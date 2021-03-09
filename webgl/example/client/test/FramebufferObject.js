var Example = Example || {};

/**
 * @desc 实现渲染到纹理(使用WebGL渲染三维图形,然后将渲染结果作为纹理贴到另一个三维物体上去)
 */
Example.FramebufferObject = function() {
    //获取canvas和gl对象
    var canvas = document.getElementById("webgl");
    var gl = getWebGLContext(canvas);

    //顶点着色器程序
    const VSHADER_SOURCE = `
        attribute vec4 a_position;
        attribute vec2 a_texCoord;
        uniform mat4 u_mvpMat;
        varying vec4 v_texCoord;
        void main() {
            gl_Position = u_mvpMat * a_position;
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

        uniform smapler2D u_sampler;
        varying vec2 v_texCoord;
        void main() {
            vec4 texture = texture2D(u_sampler, v_texCoord);
            gl_FragColor = texture;
        }
    `;

    //初始化着色器程序
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

}

if(typeof module !== "undefined") {
    module.export = Example[Object.keys(Example)[0]];
}