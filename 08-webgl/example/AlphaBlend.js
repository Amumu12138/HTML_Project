var Example = Example || {};

/**
 * @desc webgl透明度与alpha融合
 */
Example.AlphaBlend = function () {
    //顶点着色器源码
    var vertexShaderSource = '' +
        ' attribute vec4 apos;' + //顶点位置坐标
        ' attribute vec4 a_color;' + //纹理坐标
        ' varying vec4 v_color;' + //插值后纹理坐标
        'void main(){' +
        //顶点坐标apos赋值给内置变量gl_Position
        '   gl_Position = apos;' +
        //顶点颜色插值计算
        '   v_color = a_color;' +
        '}';

    //片元着色器源码
    var fragShaderSource = '' +
        //所有float类型数据的精度
        'precision lowp float;' +
        // 接收顶点着色器中v_color数据
        'varying vec4 v_color;' +
        'void main(){' +
        // 插值后颜色数据赋值给对应的片元
        '   gl_FragColor = v_color;' +
        '}';

    //通过getElementById()方法获取canvas画布
    var canvas = document.getElementById('webgl');
    //通过方法getContext()获取WebGL上下文
    var gl = canvas.getContext('webgl');

    //初始化着色器
    var program = initShader(gl, vertexShaderSource, fragShaderSource);

    //获取顶点着色器的位置变量apos
    var aposLocation = gl.getAttribLocation(program, 'apos');
    var a_color = gl.getAttribLocation(program, 'a_color');

    /**
     创建顶点位置数据数组data，存储6个顶点
     创建顶点颜色数组colorData，存储6个顶点对应RGB颜色值
     **/
    var data = new Float32Array([
        -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, //红色三角形的三个顶点
        -0.7, 0.3, 0.3, 0.3, 0.3, -0.7, //绿色三角形的三个顶点
        -0.8, 0.1, 0.1, 0.1, 0.1, -0.9 //蓝色三角形的三个顶点
    ]);
    var colorData = new Float32Array([
        //红色顶点，透明度0.7
        1, 0, 0, 0.7,
        1, 0, 0, 0.7,
        1, 0, 0, 0.7,
        //绿色顶点，透明度0.7
        0, 1, 0, 0.7,
        0, 1, 0, 0.7,
        0, 1, 0, 0.7,
        //蓝色顶点，透明度0.7
        0, 0, 1, 0.7,
        0, 0, 1, 0.7,
        0, 0, 1, 0.7
    ]);
    /**
     创建缓冲区colorBuffer，传入顶点颜色数据colorData
     **/
    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colorData, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_color, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_color);
    /**
     创建缓冲区buffer，传入顶点位置数据data
     **/
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    gl.vertexAttribPointer(aposLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aposLocation);

    /**
     * 渲染管线α融合功能单元配置
     **/
    gl.enable(gl.BLEND);
    //gl.blendFunc()的第一个参数是源颜色的系数，第二个参数是目标颜色的系数，
    //两组像素值乘以各自系数后然后相加得到融合后的像素值，覆盖原来的像素值，
    //注意覆盖的时候是覆盖x、y坐标相同的像素
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    //gl.blendFunc(gl.ONE_MINUS_SRC_ALPHA, gl.SRC_ALPHA);
    /**执行绘制命令**/
    gl.drawArrays(gl.TRIANGLES, 0, 9);

    //声明初始化着色器函数
    function initShader(gl, vertexShaderSource, fragmentShaderSource) {
        //创建顶点着色器对象
        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        //创建片元着色器对象
        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        //引入顶点、片元着色器源代码
        gl.shaderSource(vertexShader, vertexShaderSource);
        gl.shaderSource(fragmentShader, fragmentShaderSource);
        //编译顶点、片元着色器
        gl.compileShader(vertexShader);
        gl.compileShader(fragmentShader);

        //创建程序对象program
        var program = gl.createProgram();
        //附着顶点着色器和片元着色器到program
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);

        //链接program
        gl.linkProgram(program);
        //使用program
        gl.useProgram(program);
        //返回程序program对象
        return program;
    }
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}