var Example = Example || {};

/**
 * @desc 移动三角形
 */
Example.TranslateTriangle = function () {
    //获取<canvas>元素
   var canvas = document.getElementById("webgl");
   var gl = getWebGLContext(canvas);
   
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
   if(!gl) {
       console.error("Failed to retrieve this canvas element");
       return;
   }

   //顶点着色器程序
   var VSHADER_SOURCE = `
        attribute vec4 a_pos;
        attribute float a_pointSize;
        uniform vec4 u_Tranlation;
        void main() {
            gl_Position = a_pos + u_Tranlation;
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
    //获取attribute和uniform变量的存储位置
    var a_pos = gl.getAttribLocation(gl.program, "a_pos");
    var u_Tranlation = gl.getUniformLocation(gl.program, "u_Tranlation");
    //分别向x正方向和y轴正方形移动0.5单位
    gl.uniform4f(u_Tranlation, 0.5, 0.5, 0.0, 1.0);

    var count = initVertexBuffers(gl);
    if(count < 0) {
        console.error("Failed tos set the positions of the vertices");
        return;
    }

    //清理画布
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    //绘制点
    gl.drawArrays(gl.TRIANGLES, 0, count);

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