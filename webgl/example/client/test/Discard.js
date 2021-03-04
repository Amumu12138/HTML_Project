var Example = Example || {};

/**
 * @desc 绘制圆形的点(discard舍弃片元)
 */
Example.Discard = function() {
    var canvas = document.getElementById('webgl');
    var gl = getWebGLContext(canvas);

    const VSHADER_SOURCE = `
        attribute vec4 a_position;
        void main() {
            gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
            gl_PointSize = 10.0;
        }
    `;

    const FSHADER_SOURCE = `
        #ifdef GL_ES
        #ifdef GL_FRAGMENT_PRECISION_HIGH
            precision highp float;
        #else
            precision mediump float;
        #endif
        #endif

        void main() {
            float d = distance(gl_PointCoord, vec2(0.5, 0.5));
            if(d < 0.5) {
                gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
            } else {
                discard;
            }
        }
    `;

    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

    // var a_position = gl.getAttribLocation(gl.program, "a_position");
    // gl.vertexAttrib4fv(a_position, new Float32Array([0.0, 0.0, 0.0, 1.0]));

    utils.draw(gl, gl.POINTS, 0, 1);
}

if(typeof module !== "undefined") {
    module.export = Example[Object.keys(Example)[0]];
}