var Example = Example || {};

/**
 * @desc 立方体旋转动画
 */
Example.RotateCube = function () {
    //通过getElementById()方法获取canvas画布
    var canvas = document.getElementById('webgl');
    //通过方法getContext()获取WebGL上下文
    var gl = canvas.getContext('webgl');

    //顶点着色器源码 
    var vertexShaderSource = '' +
        //attribute声明vec4类型变量apos
        'attribute vec4 apos;' +
        //uniform声明旋转矩阵变量mx、my
        'uniform mat4 mx;' + //绕x轴旋转矩阵
        'uniform mat4 my;' + //绕y轴旋转矩阵
        ' void main() {' +
        //两个旋转矩阵、顶点齐次坐标连乘
        ' gl_Position = mx*my*apos;' +
        '}';

    //片元着色器源码 
    var fragShaderSource = '' +
        'void main() {' +
        // 逐片元处理数据，所有片元(像素)设置为红色
        '    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);' +
        '}';

    //初始化着色器
    var program = initShader(gl, vertexShaderSource, fragShaderSource);
    //获取顶点着色器的位置变量apos
    var aposLocation = gl.getAttribLocation(program, 'apos');
    //从program对象获得旋转矩阵变量mx、my地址
    var mx = gl.getUniformLocation(program, 'mx');
    var my = gl.getUniformLocation(program, 'my');

    // //绕x轴旋转45度
    var mxArr = new Float32Array([
        1, 0, 0, 0,
        0, Math.cos(Math.PI / 4), -Math.sin(Math.PI / 4), 0,
        0, Math.sin(Math.PI / 4), Math.cos(Math.PI / 4), 0,
        0, 0, 0, 1
    ]);
    //把数据mxArr传递给着色器旋转矩阵变量mx
    gl.uniformMatrix4fv(mx, false, mxArr);

    //绕y轴旋转45度
    var myArr = new Float32Array([
        Math.cos(Math.PI / 4), 0, -Math.sin(Math.PI / 4), 0,
        0, 1, 0, 0,
        Math.sin(Math.PI / 4), 0, Math.cos(Math.PI / 4), 0,
        0, 0, 0, 1
    ]);
    //把数据myArr传递给着色器旋转矩阵变量my
    gl.uniformMatrix4fv(my, false, myArr);

    //创建立方体的顶点坐标数据
    var data = new Float32Array([
        //z为0.5时，xOy平面上的四个点坐标
        0.5, 0.5, 0.5,
        -0.5, 0.5, 0.5,
        -0.5, -0.5, 0.5,
        0.5, -0.5, 0.5,
        //z为-0.5时，xOy平面上的四个点坐标
        0.5, 0.5, -0.5,
        -0.5, 0.5, -0.5,
        -0.5, -0.5, -0.5,
        0.5, -0.5, -0.5,
        //上面两组坐标分别对应起来组成一一对
        0.5, 0.5, 0.5,
        0.5, 0.5, -0.5,

        -0.5, 0.5, 0.5,
        -0.5, 0.5, -0.5,

        -0.5, -0.5, 0.5,
        -0.5, -0.5, -0.5,

        0.5, -0.5, 0.5,
        0.5, -0.5, -0.5,
    ]);

    //创建缓冲区对象
    var buffer = gl.createBuffer();
    //绑定缓冲区对象
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    //顶点数组data数据传入缓冲区
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    //缓冲区中的数据按照一定的规律传递给位置变量apos，第二个代码案例vertexAttribPointer方法的第二个参数是2，这里是3
    gl.vertexAttribPointer(aposLocation, 3, gl.FLOAT, false, 0, 0);
    //允许数据传递
    gl.enableVertexAttribArray(aposLocation);
    //LINE_LOOP模式绘制前四个点
    gl.drawArrays(gl.LINE_LOOP, 0, 4);
    //LINE_LOOP模式从第五个点开始绘制四个点
    gl.drawArrays(gl.LINE_LOOP, 4, 4);
    //LINES模式绘制后8个点
    gl.drawArrays(gl.LINES, 8, 8);

    /**
     * 定义绘制函数draw()，定时更新旋转矩阵数据，并调用WebGL绘制API
     ***/
    var angle = Math.PI / 4; //起始角度
    function draw() {
        // gl.clear(gl.COLOR_BUFFER_BIT);//清空画布上一帧图像
        /**
         * 立方体绕y轴旋转
         ***/
        angle += 0.01; //每次渲染角度递增，每次渲染不同的角度
        var sin = Math.sin(angle); //旋转角度正弦值
        var cos = Math.cos(angle); //旋转角度余弦值
        var myArr = new Float32Array([cos, 0, -sin, 0, 0, 1, 0, 0, sin, 0, cos, 0, 0, 0, 0, 1]);
        gl.uniformMatrix4fv(my, false, myArr);
        //requestAnimationFrame()可以实现周期性调用某个函数，主要用于动画
        requestAnimationFrame(draw);
        //LINE_LOOP模式绘制前四个点
        gl.drawArrays(gl.LINE_LOOP, 0, 4);
        //LINE_LOOP模式从第五个点开始绘制四个点
        gl.drawArrays(gl.LINE_LOOP, 4, 4);
        //LINES模式绘制后8个点
        gl.drawArrays(gl.LINES, 8, 8);
    }
    draw();

    //声明初始化着色器函数
    function initShader(gl, vertexShaderSource, fragmentShaderSource) {
        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(vertexShader, vertexShaderSource);
        gl.shaderSource(fragmentShader, fragmentShaderSource);
        gl.compileShader(vertexShader);
        gl.compileShader(fragmentShader);
        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);
        return program;
    }
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}