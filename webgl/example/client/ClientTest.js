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
        attribute vec4 a_color;
        varying vec4 v_color;
        void main() {
            gl_Position = a_position;
            v_color = a_color;
        }
   `;

   //片元着色器程序
   const FSHADER_SOURCE = `
        #ifdef GL_ES
            precision mediump float;
        #endif

        varying vec4 v_color;
        void main() {
            gl_FragColor = v_color;
        }
   `;

   //初始化着色器
   initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

   //获取着色器程序中的变量
   var a_position = gl.getAttribLocation(gl.program, "a_position");
   var a_color = gl.getAttribLocation(gl.program, "a_color");

   /** 将数据传递给变量 */
   //顶点坐标数组
   var pc = new Float32Array([
        0.0, 0.5, -0.1,  0.0, 0.0, 1.0, 
        -0.5, -0.5, -0.1,  0.0, 0.0, 1.0,
        0.5, -0.5, -0.1,  0.0, 0.0, 1.0,

        0.5, 0.4, -0.5,  1.0, 0.0, 0.0, 
        -0.5, 0.4, -0.5,  1.0, 0.0, 0.0,
        0.0, -0.6, -0.5,  1.0, 0.0, 0.0
   ]);
   var numVertex = 3, numColor = 3, n = 6;
   var pcBuffer = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, pcBuffer);
   gl.bufferData(gl.ARRAY_BUFFER, pc, gl.STATIC_DRAW);

   var FSIZE = pc.BYTES_PER_ELEMENT;
   var STRIDE = numVertex + numColor;
   gl.vertexAttribPointer(a_position, numVertex, gl.FLOAT, false, FSIZE * STRIDE, 0);
   gl.enableVertexAttribArray(a_position);

   gl.vertexAttribPointer(a_color, numColor, gl.FLOAT, false, FSIZE * STRIDE, FSIZE * numVertex);
   gl.enableVertexAttribArray(a_color);

   //清理画布
   gl.clearColor(0.0, 0.0, 0.0, 1.0);
   gl.clear(gl.COLOR_BUFFER_BIT);
   //绘制图形
   gl.drawArrays(gl.TRIANGLES, 0, n);
}

if(typeof module !== "undefined") {
    moudle.export = Example[Object.keys(Example)[0]];
}