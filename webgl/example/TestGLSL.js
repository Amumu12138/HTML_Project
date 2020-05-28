var Example = Example || {};
/**
 * @desc GLSL ES着色器语言 三种
 * 三种变量:attribute、uniform、varying
 * 关键字       数据传递                        声明变量
 * attribute    javascript -> 顶点着色器        声明顶点数据变量
 * uniform      javascript -> 顶点、片元着色器   声明非顶点数据变量
 * varying      顶点着色器 -> 片元着色器         声明需要插值计算的顶点变量
 */
Example.TestGLSL = function () {
    //通过getElementById()方法获取canvas画布
    var canvas = document.getElementById('webgl');
    //通过方法getContext()获取WebGL上下文
    var gl = canvas.getContext('webgl');

    //顶点着色器源码 -->
    var vertexShaderSource = `
            attribute float a_arr[4];
            varying float v_arr[4];
            //attribute声明vec4类型变量apos
            attribute vec4 apos;
            void main() {
            //顶点坐标apos赋值给内置变量gl_Position
            //逐顶点处理数据
            gl_Position = apos;
            v_arr[0] = a_arr[0];
          }`;

    //片元着色器源码 -->
    var fragShaderSource = `
            precision highp float;
            varying float v_arr[4];
            void main() {
                // 逐片元处理数据，所有片元(像素)设置为红色
                gl_FragColor = vec4(v_arr[0], v_arr[1], v_arr[2], v_arr[3]);
            }`;

    //初始化着色器
    var program = initShader(gl, vertexShaderSource, fragShaderSource);
    //获取顶点着色器的位置变量apos，即aposLocation指向apos变量。
    var aposLocation = gl.getAttribLocation(program, 'apos');
    var arrLocation = gl.getAttribLocation(program, 'a_arr');

    //类型数组构造函数Float32Array创建顶点数组
    var data = new Float32Array([0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5]);
    var arrData = new Float32Array([1.0, 0.0, 0.0, 1.0]);
    gl.uniform1fv(arrLocation, arrData);

    //创建缓冲区对象
    var buffer = gl.createBuffer();
    //绑定缓冲区对象,激活buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    //顶点数组data数据传入缓冲区
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    //缓冲区中的数据按照一定的规律传递给位置变量apos
    gl.vertexAttribPointer(aposLocation, 2, gl.FLOAT, false, 0, 0);
    //允许数据传递
    gl.enableVertexAttribArray(aposLocation);

    //开始绘制图形
    gl.drawArrays(gl.LINE_LOOP, 0, 4);

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