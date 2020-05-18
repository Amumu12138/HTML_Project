var Example = Example || {};

/**
 * @desc 根据数组中的元素构建插值三角形
 */
Example.ColorElementTri = function () {
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

    /**
 创建顶点位置数据数组data，存储两个顶点(-0.5,0.5、(0.5,0.5)
 存储两个顶点对应RGB颜色值(0,0,1)、(1,0,0)
 **/
    var data = new Float32Array([
        -0.5, 0.5,
        0, 0, 1,
        0.5, 0.5,
        1, 0, 0,
        0, 0,
        0, 1, 0
    ]);

    /**
        创建缓冲区buffer，传入顶点颜色、位置数据data
    **/
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    //4表示data数组一个元素占据的字节数
    //倒数第二个参数4*5表示每5个元素是一个选择单元
    //第2个参数2表示从5元素组成的一个选择单元中选择前2个作为顶点位置数据
    gl.vertexAttribPointer(aposLocation, 2, gl.FLOAT, false, 4 * 5, 0);
    //最后一个参数4*2表示5元素组成的一个选择单元中偏移2个元素
    //第2个参数3表示从5元素组成的一个选择单元中选择后三个作为顶点颜色数据
    gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, 4 * 5, 4 * 2);
    gl.enableVertexAttribArray(aposLocation);
    gl.enableVertexAttribArray(a_color);
    //开始绘制图形，使用TRIANGLES模式，三点构成一个平面
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    //开始绘制图形 LINES模式为直线
    //gl.drawArrays(gl.LINES, 0, 2);

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