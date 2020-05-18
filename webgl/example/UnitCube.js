var Example = Example || {};

/**
 * @desc 顶点索引绘制
 */
Example.UnitCube = function () {
    //通过getElementById()方法获取canvas画布
    var canvas = document.getElementById('webgl');
    //通过方法getContext()获取WebGL上下文
    var gl = canvas.getContext('webgl');

    //顶点着色器源码 
    var vertexShaderSource = '' +
        //attribute声明vec4类型变量apos
        'attribute vec4 apos;' +
        ' void main() {' +

        //设置几何体轴旋转角度为30度，并把角度值转化为弧度值
        'float radian = radians(30.0);' +
        //求解旋转角度余弦值
        'float cos = cos(radian);' +
        //求解旋转角度正弦值
        'float sin = sin(radian);' +
        //引用上面的计算数据，创建绕x轴旋转矩阵
        // 1      0       0    0
        // 0   cosα   sinα   0
        // 0  -sinα   cosα   0
        // 0      0        0   1
        ' mat4 mx = mat4(1,0,0,0,  0,cos,-sin,0,  0,sin,cos,0,  0,0,0,1);' +
        //引用上面的计算数据，创建绕y轴旋转矩阵
        // cosβ   0   sinβ    0
        //     0   1   0        0
        //-sinβ   0   cosβ    0
        //     0   0   0        1
        ' mat4 my = mat4(cos,0,-sin,0,  0,1,0,0,  sin,0,cos,0,  0,0,0,1);' +
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


    //创建立方体的顶点坐标数据
    var data = new Float32Array([
        //z为0.5时，xOy平面上的四个点坐标
        0.5, 0.5, 0.5, //顶点0
        -0.5, 0.5, 0.5, //顶点1
        -0.5, -0.5, 0.5, //顶点2
        0.5, -0.5, 0.5, //顶点3
        //z为-0.5时，xOy平面上的四个点坐标
        0.5, 0.5, -0.5, //顶点4
        -0.5, 0.5, -0.5, //顶点5
        -0.5, -0.5, -0.5, //顶点6
        0.5, -0.5, -0.5, //顶点7 
    ]);

    var indexes = new Uint8Array([
        //前四个点宿营索引值
        0, 1, 2, 3, //gl.LINE_LOOP模式四个点绘制一个矩形框
        //后四个顶点对应索引值
        4, 5, 6, 7,
        //前后对应点对应索引值,两个点绘制一条直线
        0, 4,
        1, 5,
        2, 6,
        3, 7
    ]);

    //创建缓冲区对象
    var indexesBuffer = gl.createBuffer();
    //绑定缓冲区对象
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexesBuffer);
    //顶点数组indexes数据传入缓冲区
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexes, gl.STATIC_DRAW);

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
    gl.drawElements(gl.LINE_LOOP, 4, gl.UNSIGNED_BYTE, 0);
    //LINE_LOOP模式从第五个点开始绘制四个点
    gl.drawElements(gl.LINE_LOOP, 4, gl.UNSIGNED_BYTE, 4);
    //LINES模式绘制后8个点
    gl.drawElements(gl.LINES, 8, gl.UNSIGNED_BYTE, 8);

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