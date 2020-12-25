var Example = Example || {};

/**
 * @desc 绘制矩形
 */
Example.RectAngle = function () {
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
        void main() {
            gl_Position = a_pos;
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

    //正矩形
    var vertices = new Float32Array([
        -0.5, 0.5, 0.5, 0.5, 0.5,-0.5,
        0.5, -0.5, -0.5, -0.5, -0.5, 0.5
    ]);

    //平行四边形
    var vertices02 = new Float32Array([
        0.0, 0.5, 1.0, 0.5, 0.5, -0.5,
        0.5, -0.5, -0.5, -0.5, 0.0, 0.5
    ]);

     //两条线段
     var vertices_line = new Float32Array([
        -1.0, 0.0, -0.5, -0.5,
        0.0, 0.0, 0.5, -0.5
     ]);

     //扇形
     var vertices_fan = new Float32Array([
        0.0, -1.0, 
        -1.0, 0.0,
        -0.5, 0.0, 
        0.0, 0.5,
        0.5, 0.0,
        1.0, 0.0 
    ]);

    var count = initVertexBuffers(gl, vertices_fan, 2, a_pos);
    if(count < 0) {
        console.error("Failed tos set the positions of the vertices");
        return;
    }

    //清理画布
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    //绘制点
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 6);

    //自动适配屏幕
    window.onresize = function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    //初始化顶点数据
    function initVertexBuffers(gl, vertices, ponitNum, attribName) {
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
        gl.vertexAttribPointer(attribName, ponitNum, gl.FLOAT, false, 0, 0);
        //连接a_pos变量与分配给它的缓冲区对象
        gl.enableVertexAttribArray(attribName);

        return 1;
    }
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}