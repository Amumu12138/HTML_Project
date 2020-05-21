var Example = Example || {};

/**
 * @desc 切换着色器
 */
Example.SwitchShader_01 = function () {
    //顶点着色器源码1
    var vertexShaderSource1 = '' +
        'attribute vec4 apos;' +
        'void main() {' +
        '   gl_Position = apos;' +
        '}';

    //片元着色器源码1
    var fragmentShader1 = '' +
        'void main() {' +
        '   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);' +
        '}';

    //顶点着色器源码2
    var vertexShaderSource2 = '' +
        'attribute vec4 apos;' +
        'void main() {' +
        '   gl_Position = apos;' +
        '}';

    //片元着色器源码2
    var fragmentShader2 = '' +
        'void main() {' +
        '   gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);' +
        '}';

    //通过getElementById()方法获取canvas画布
    var canvas = document.getElementById('webgl');
    //通过方法getContext()获取WebGL上下文
    var gl = canvas.getContext('webgl');

    //初始化着色器
    var program1 = initShader(gl, vertexShaderSource1, fragmentShader1);
    var program2 = initShader(gl, vertexShaderSource2, fragmentShader2);
    //获取顶点着色器的位置变量apos
    var aposLocation1 = gl.getAttribLocation(program1, 'apos');
    var aposLocation2 = gl.getAttribLocation(program2, 'apos');

    //类型数组构造函数Float32Array创建顶点数组
    var data = new Float32Array([0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5]);
    //创建缓冲区对象
    var buffer = gl.createBuffer();
    //绑定缓冲区对象,激活buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    //顶点数组data数据传入缓冲区
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    //缓冲区中的数据按照一定的规律传递给位置变量apos
    gl.vertexAttribPointer(aposLocation1, 2, gl.FLOAT, false, 0, 0);
    //允许数据传递
    gl.enableVertexAttribArray(aposLocation1);
    // 使用程序对象program1
    gl.useProgram(program1);
    //开始绘制图形
    gl.drawArrays(gl.LINE_LOOP, 0, 4);


    //类型数组构造函数Float32Array创建顶点数组
    var data2 = new Float32Array([0.3, 0.3, -0.3, 0.3, -0.3, -0.3, 0.3, -0.3]);
    //创建缓冲区对象
    var buffer2 = gl.createBuffer();
    //绑定缓冲区对象,激活buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer2);
    //顶点数组data数据传入缓冲区
    gl.bufferData(gl.ARRAY_BUFFER, data2, gl.STATIC_DRAW);
    //缓冲区中的数据按照一定的规律传递给位置变量apos
    gl.vertexAttribPointer(aposLocation2, 2, gl.FLOAT, false, 0, 0);
    //允许数据传递
    gl.enableVertexAttribArray(aposLocation2);
    // 使用程序对象program2
    gl.useProgram(program2);
    //开始绘制图形
    gl.drawArrays(gl.LINE_LOOP, 0, 4);

    /**
     着色器程序初始化函数initShader()
     **/
    function initShader(gl, vertexShaderSource, fragmentShaderSource) {
        var vertexShader = gl.createShader(gl.VERTEX_SHADER); //创建顶点着色器对象
        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER); //创建片元着色器对象
        gl.shaderSource(vertexShader, vertexShaderSource); //引入片元着色器源代码
        gl.shaderSource(fragmentShader, fragmentShaderSource); //引入片元着色器源代码
        gl.compileShader(vertexShader); //编译顶点着色器程序
        gl.compileShader(fragmentShader); //编译片元着色器程序
        var program = gl.createProgram(); //创建程序对象program
        gl.attachShader(program, vertexShader); //附着顶点着色器对象到程序对象program
        gl.attachShader(program, fragmentShader); //附着片元着色器对象到程序对象program
        gl.linkProgram(program); //链接程序对象program
        //        gl.useProgram(program);//使用程序对象program
        return program; //返回程序program对象
    }
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}