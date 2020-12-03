var Example = Example || {};

/**
 * @desc WebGL绘制 不同区域片元设置为不同颜色
 */
Example.ColorTest = function () {
    document.write(`<p style="position: absolute; top: 0px; left: 250px; font-weight: bold;">Clinet-ColorTest</p>`);

    //通过getElementById()方法获取canvas画布
    var canvas = document.getElementById('webgl');
    //通过方法getContext()获取WebGL上下文
    var gl = canvas.getContext('webgl');

    //顶点着色器源码
    var vertexShaderSource = `
        //attribute声明vec4类型变量apos
        attribute vec4 apos;
        void main() {
            //点渲染的方形区域像素大小
            gl_PointSize = 500.0;
            //顶点坐标apos赋值给内置变量gl_Position
            //逐顶点处理数据
            gl_Position = apos;
        }
    `;

    
        // //canvas画布上不同区域片元设置为不同颜色
        // void main() {
        // // 根据片元的x坐标，来设置片元的像素值
        // if(gl_FragCoord.x < 300.0){
        //     // canvas画布上[0,300)之间片元像素值设置红色
        //     gl_FragColor = vec4(1.0,0.0,0.0,1.0);
        // }else if (gl_FragCoord.x <= 400.0) {
        //     // canvas画布上(300,400]之间片元像素值设置绿色
        //     gl_FragColor = vec4(0.0,1.0,0.0,1.0);
        // }else {
        //     // canvas画布上(400,500]之间片元像素值设置蓝色
        //     gl_FragColor = vec4(0.0,0.0,1.0,1.0);
        // }    
        // // 所有片元设置为红色
        // // gl_FragColor = vec4(1.0,0.0,0.0,1.0);
        // }
    //片元着色器源码
    var fragShaderSource = `
        void main() {
            // 片元沿着x方向渐变
            gl_FragColor = vec4(gl_FragCoord.x / 500.0 * 1.0, gl_FragCoord.x / 500.0 * 1.0, gl_FragCoord.x / 500.0 * 1.0, 1.0);
        }
    `;

    //初始化着色器
    var program = initShader(gl, vertexShaderSource, fragShaderSource);
    //开始绘制，显示器显示结果
    gl.drawArrays(gl.POINTS, 0, 1);

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