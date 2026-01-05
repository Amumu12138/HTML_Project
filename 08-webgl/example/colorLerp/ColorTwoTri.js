var Example = Example || {};

/**
 * @desc 实现两个单色三角面
 */
Example.ColorTwoTri = function () {
    //通过getElementById()方法获取canvas画布
    var canvas = document.getElementById('webgl');
    //通过方法getContext()获取WebGL上下文
    var gl = canvas.getContext('webgl');

    //顶点着色器源码 
    var vertexShaderSource = '' +
        //attribute声明vec4类型变量apos
        'attribute vec4 apos;' +
        //attribute声明顶点颜色变量
        'attribute vec4 a_color;' +
        //varying声明顶点颜色插值后变量
        'varying vec4 v_color;' +
        ' void main() {' +
        //顶点坐标apos赋值给内置变量gl_Position
        //逐顶点处理数据
        'gl_Position = apos;' +
        //顶点颜色插值计算
        '   v_color = a_color;' +
        '}';

    //片元着色器源码 
    var fragShaderSource = '' +
        //所有float类型数据的精度是lowp
        'precision lowp float;' +
        //接收顶点着色器中v_color数据
        'varying vec4 v_color;' +
        'void main() {' +
        // 逐片元处理数据，所有片元(像素)设置为红色
        '    gl_FragColor = v_color;' +
        '}';

    //初始化着色器
    var program = initShader(gl, vertexShaderSource, fragShaderSource);
    //获取顶点着色器的位置变量apos和a_color
    var aposLocation = gl.getAttribLocation(program, 'apos');
    var a_color = gl.getAttribLocation(program, 'a_color');

    //9个元素构建三个顶点的xyz坐标值
    var data = new Float32Array([
        -0.5, 0.5,
        0.5, 0.5,
        0.5, -0.5,
        -0.5, 0.5,
        0.5, -0.5,
        -0.5, -0.5
    ]);
    //颜色数组
    var colorData = new Float32Array([
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1
    ]);

    /**
    创建缓冲区colorBuffer，传入顶点颜色数据colorData
    **/
    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colorData, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_color);

    //创建缓冲区对象
    var buffer = gl.createBuffer();
    //绑定缓冲区对象
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    //顶点数组data数据传入缓冲区
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    //缓冲区中的数据按照一定的规律传递给位置变量apos，第二个代码案例vertexAttribPointer方法的第二个参数是2，这里是3
    gl.vertexAttribPointer(aposLocation, 2, gl.FLOAT, false, 0, 0);
    //允许数据传递
    gl.enableVertexAttribArray(aposLocation);
    //开始绘制图形，使用LINE_LOOP模式
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.drawArrays(gl.TRIANGLES, 3, 3);
    //gl.drawArrays(gl.TRIANGLES, 0, 6);

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