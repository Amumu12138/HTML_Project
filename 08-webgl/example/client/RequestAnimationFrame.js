var Example = Example || {};

/**
 * @desc 按照指定的旋转角度绘制三角形
 */
Example.RequestAnimationFrame = function() {
    //获取canvas和gl对象
    var canvas = document.getElementById("webgl");
    var gl = getWebGLContext(canvas);

    //顶点着色器程序
    const VSHADER_SOURCE = `
        attribute vec4 a_position;   //vec4: [x, y, z, w]四个float变量组合类型
        uniform mat4 u_modelMat;     //mat4: 4X4矩阵类型
        void main() {
            gl_Position =  u_modelMat * a_position; //注意: u_modelMat一定要在a_position前面,矩阵乘以矢量有前后区别
        }
    `;

    //片元着色器
    const FSHADER_SOURCE = `
        precision mediump float;
        uniform vec4 u_fragColor;
        void main() {
            gl_FragColor = u_fragColor;
        }
    `;

    //初始化着色器
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
    //获取着色器程序中的变量
    var a_position = gl.getAttribLocation(gl.program, "a_position");
    var u_modelMat = gl.getUniformLocation(gl.program, "u_modelMat");
    var u_fragColor = gl.getUniformLocation(gl.program, "u_fragColor");

    //将数据传递给变量
    var vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
    //创建缓冲区对象
    var buffer = gl.createBuffer();
    //绑定缓冲区对象
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    //将数据传递给缓冲区对象
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    //将缓冲区对象分配给变量
    gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);
    //开启指定的变量
    gl.enableVertexAttribArray(a_position);

    gl.vertexAttrib4fv(a_position, vertices);
    //传递u_fragColor变量
    var colors = new Float32Array([1.0, 0.0, 0.0, 1.0]);
    gl.uniform4fv(u_fragColor, colors);
    //传递u_modelMat变量
    var mat = new Matrix4();
    mat.setRotate(0.0, 0, 0, 1);
    gl.uniformMatrix4fv(u_modelMat, false, mat.elements); 

    //清理画布
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    //绘制图形
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    //每隔deltaTime毫秒绕z轴旋转addAngle角度,并沿x轴增加addDis距离
    // const addAngle = 30.0;
    // const addDis = 0.05;
    // const deltaTime = 100;
    // var curAngle = 0.0;
    // var curDis = 0.0;
    // setInterval(function() {
    //     curAngle = (curAngle + addAngle) % 360;
    //     curDis += addDis;
    //     var newMat = new Matrix4();
    //     newMat.setRotate(curAngle, 0, 0, 1);
    //     newMat.translate(curDis, 0, 0, 1);
    //     gl.uniformMatrix4fv(u_modelMat, false, newMat.elements); 

    //     //清理画布
    //     gl.clear(gl.COLOR_BUFFER_BIT);
    //     //绘制图形
    //     gl.drawArrays(gl.TRIANGLES, 0, 3);
    // }, deltaTime);
    //绘制
    function draw(gl, count, angle, mat, target) {
        //设置旋转矩阵
        mat.setRotate(angle, 0, 0, 1);
        //将旋转矩阵传输给顶点着色器
        gl.uniformMatrix4fv(target, false, mat.elements);
        //清理画布
        gl.clear(gl.COLOR_BUFFER_BIT);
        //绘制三角形
        gl.drawArrays(gl.TRIANGLES, 0, count);
    }

    var g_last = Date.now();
    //动画
    function animate(angle) {
        //计算距离上次调用经过多长时间
        var now = Date.now();
        var elapsed = now - g_last;
        g_last = now;
        var newAngle = angle + (45.0 * elapsed) / 1000.0 % 360;
     
        return newAngle; 
    } 

    var currentAngle = 0.0;
    //运行动画
    function tick() {
        //更新旋转角
        currentAngle = animate(currentAngle); 
        draw(gl, 3, currentAngle, mat, u_modelMat);
        //请求浏览器调用tick
        requestAnimationFrame(tick);
    }
    tick();
}

if(typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}