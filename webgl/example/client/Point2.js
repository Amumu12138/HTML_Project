var Example = Example || {};

/**
 * @desc 绘制一个点 第二种方案
 */
Example.Point2= function () {
    //获取<canvas>元素
   var canvas = document.getElementById("webgl");
   var gl = getWebGLContext(canvas);
   
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
   if(!gl) {
       console.error("Failed to retrieve this <canvas> element");
       return;
   }

   //顶点着色器程序
   var VSHADER_SOURCE = `
        attribute vec4 a_pos;
        uniform float a_pointSize;
        void main() {
            gl_Position = a_pos;
            gl_PointSize = a_pointSize;
        }
   `;

    //片元着色器程序
    var FSHADER_SOURCE = `
        void main() {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
    `;

    if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log("Failed to initShaders");
        return;
    }
    //获取attribute变量的存储位置
    var a_pos = gl.getAttribLocation(gl.program, "a_pos");
    // var a_pointSize = gl.getAttribLocation(gl.program, "a_pointSize");
    var a_pointSize = gl.getUniformLocation(gl.program, "a_pointSize");
    //将顶点位置传输给attribute变量
    var pos = new Float32Array([0.0, 0.0, 0.0, 1.0]);
    gl.vertexAttrib4fv(a_pos, pos); //利用数组做参数设置a_pos位置
    // gl.vertexAttrib3f(a_pos, 0.0, 0.0, 0.0);
    gl.uniform1f(a_pointSize, 10.0);
 
    //清理画布
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    //绘制点
    gl.drawArrays(gl.POINTS, 0, 1);

    //自动适配屏幕
    window.onresize = function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}