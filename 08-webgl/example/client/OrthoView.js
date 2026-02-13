var Example = Example || {};

/**
 * @desc 正视视图
 */
Example.OrthoView = function() {
    //获取canvas和gl对象
    var canvas = document.getElementById("webgl");
    var gl = getWebGLContext(canvas);

    //顶点着色器程序
    const VSHADER_SOURCE = `
        attribute vec4 a_position;
        attribute vec4 a_color;
        uniform mat4 u_orthoMat;
        varying vec4 v_color;
        void main() {
            gl_Position = u_orthoMat * a_position;
            v_color = a_color;
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
        varying vec4 v_color;
        void main() {
            // gl_FragColor = texture2D(u_sampler, v_texCoord);
            gl_FragColor = v_color;
        }
    `;

    //初始化着色器
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

    //获取着色器程序中变量
    var a_position = gl.getAttribLocation(gl.program, "a_position");
    var a_color = gl.getAttribLocation(gl.program, "a_color");
    var u_orthoMat = gl.getUniformLocation(gl. program, "u_orthoMat");
    var u_sampler = gl.getUniformLocation(gl. program, "u_sampler");

    /** 将数据传递给变量 */
    var verticesCoords = new Float32Array([
        -0.5, -0.5, 0.0, 1.0, 0.0, 0.0,
        -0.5, 0.5, -0.1, 0.0, 1.0, 0.0,
        0.5, -0.5, -0.2, 0.0, 0.0, 1.0,
        0.5, 0.5, -0.3, 1.0, 1.0, 1.0
    ]);
    const FSZIE = verticesCoords.BYTES_PER_ELEMENT;
    //将顶点数据传递给a_position变量
    utils.dataToBuffer(gl, a_position, 3, verticesCoords, FSZIE * 6, 0);
    //将纹理坐标传递给a_position变量
    utils.dataToBuffer(gl, a_color, 3, verticesCoords, FSZIE * 6, FSZIE * 3);
 
    //将视图矩阵数据传递给u_orthoMat变量
    var orthoMat = new Matrix4();
    orthoMat.setIdentity();
    gl.uniformMatrix4fv(u_orthoMat, false, orthoMat.elements);

    utils.draw(gl, gl.TRIANGLE_STRIP, 0,  4);

    let g_near = 0.0, g_far = 0.5;
    document.onkeydown = function(ev) {
        switch(ev.keyCode) {
            case 37:    //左方向键
                g_near += 0.01;
                break;
            case 38:    //上方向键
                g_far += 0.01;
                break;
            case 39:    //右方向键
                g_near -= 0.01;
                break;
            case 40:    //下方向键
                g_far -= 0.01;
                break;
            default: 
            return;
        }

        var newMat = new Matrix4();
        newMat.setOrtho(-1, 1, -1, 1, g_near, g_far);
        gl.uniformMatrix4fv(u_orthoMat, false, newMat.elements);

        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
}

if(typeof module !== "undefined") {
    module.export = Example[Object.keys(Example)[0]];
}