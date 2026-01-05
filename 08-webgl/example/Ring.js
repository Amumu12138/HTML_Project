var Example = Example || {};
/**
 * @desc 圈型色块
 */
Example.Ring = function () {
    //顶点着色器源码
    var vertexShaderSource = `
        //attribute声明vec4类型变量apos
        attribute vec4 apos;
        void main() {
            //点渲染的方形区域像素大小
            gl_PointSize = 100.0;
            //顶点坐标apos赋值给内置变量gl_Position
            //逐顶点处理数据
            gl_Position = apos;
        }
    `;

    //  lowp ; //低精度
    //mediump; //中精度
    //  highp ; //高精度
    //片元着色器源码
    var fragShaderSource = `
        precision lowp float;// 所有float类型数据的精度是lowp
        void main() {
            // 计算方形区域每个片元距离方形几何中心的距离
            // gl.POINTS模式点渲染的方形区域,方形中心是0.5,0.5,左上角是坐标原点,右下角是1.0,1.0
            float r = distance(gl_PointCoord, vec2(0.5, 0.5));
            //根据距离设置片元,圈型色块
            if(r > 0.5){
                // 距离方形中心距离大于0.5的片元剪裁舍弃掉
                discard;
            } else if(r > 0.0 && r < 0.4) {
                // 距离方形中心距离大于0且小于0.4的片元剪裁舍弃掉
                discard;
            }
            gl_FragColor = vec4(1.0,0.0,0.0,1.0);
        }
    `;

    //通过getElementById()方法获取canvas画布
    var canvas = document.getElementById('webgl');
    //通过方法getContext()获取WebGL上下文
    var gl = canvas.getContext('webgl');

    //初始化着色器
    var program = initShader(gl, vertexShaderSource, fragShaderSource);

    gl.drawArrays(gl.POINTS, 0, 25);

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