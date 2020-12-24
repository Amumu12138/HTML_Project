var Example = Example || {};

/**
 * @desc 绘制多个点
 */
Example.MultipPoints= function () {
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
        attribute float a_pointSize;
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
    var a_pointSize = gl.getAttribLocation(gl.program, "a_pointSize");
    //将顶点位置传输给attribute变量
    // gl.vertexAttrib3f(a_pos, 0.0, 0.0, 0.0);
    gl.vertexAttrib1f(a_pointSize , 10.0);
    var count = initVertexBuffers(gl);
    if(count < 0) {
        console.error("Failed tos set the positions of the vertices");
        return;
    }

    //清理画布
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    //绘制点
    gl.drawArrays(gl.POINTS, 0, count);

    //自动适配屏幕
    window.onresize = function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    //初始化顶点数据
    function initVertexBuffers(gl) {
        var vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
        var n = 3; 
        //创建缓冲区对象
        var vertexBuffer = gl.createBuffer();
        if(!vertexBuffer) {
            console.error("Failer to create the buffer object");
            return -1;
        }

        //将缓冲区对象绑定到目标
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        //向缓冲区对象中写入数据
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        //将缓冲区对象分配给a_pos变量
        gl.vertexAttribPointer(a_pos, 2, gl.FLOAT, false, 0, 0);
        //连接a_pos变量与分配给它的缓冲区对象
        gl.enableVertexAttribArray(a_pos);

        return n;
    }
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}