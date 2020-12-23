var Example = Example || {};

/**
 * @desc 通过鼠标点击绘点 在不同区域改变颜色
 */
Example.ColoredPoints = function () {
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
        precision mediump float;
        uniform vec4 u_FragColor;
        void main() {
            gl_FragColor = u_FragColor;
        }
    `;

    if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log("Failed to initShaders");
        return;
    }
    //获取attribute变量的存储位置
    var a_pos = gl.getAttribLocation(gl.program, "a_pos");
    var a_pointSize = gl.getAttribLocation(gl.program, "a_pointSize");
    var u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
    //将顶点位置传输给attribute变量
    // gl.vertexAttrib3f(a_pos, 0.5, 0.5, 0.5);
    gl.vertexAttrib1f(a_pointSize , 10.0);

    //清理画布
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    //注册人鼠标点击事件响应函数
    canvas.onmousedown = function(ev) {
        click(ev, gl, canvas, a_pos, u_FragColor);
    }


    //自动适配屏幕
    window.onresize = function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    //存储鼠标点击位置数据
    var point = {x: 0, y: 0};
    var g_points = [];
    var g_colors = [];
    var scale = canvas.height / canvas.width;
    function click(ev, gl, canvas, pos, u_FragColor) {
        var x = ev.clientX; 
        var y = ev.clientY;
        var rect = ev.target.getBoundingClientRect();
        console.log("rect = ", rect);
        x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
        y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);
        point = {x: x, y: y};
        g_points.push(point);
        //将点颜色左边存储到g_colors数组中
        if(x >= 0.0 && y >= 0.0) {
            g_colors.push([1.0, 0.0, 0.0, 1.0]);
        } else if(x < 0.0 && y <= 0.0) {
            g_colors.push([0.0, 1.0, 0.0, 1.0]);
        } else {
            g_colors.push([1.0, 1.0, 1.0, 1.0]);
        }
        
        //清理canvas
        gl.clear(gl.COLOR_BUFFER_BIT);
        for(var i = 0; i < g_points.length; i++) {
            gl.vertexAttrib3f(a_pos, g_points[i].x, g_points[i].y, 0.0);
            gl.uniform4f(u_FragColor, g_colors[i][0], g_colors[i][1], g_colors[i][2], g_colors[i][3]);
            //绘制点
            gl.drawArrays(gl.POINTS, 0, 1);
        }

    }
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}