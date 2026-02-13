var Example = Example || {};

/**
 * @desc WebGL绘制 火焰燃烧效果
 */
Example.Flame = function () {
    document.write(`<p style="position: absolute; top: 0px; left: 250px; font-weight: bold;">Clinet-Flame</p>`);

    //通过getElementById()方法获取canvas画布
    var canvas = document.getElementById('webgl');
    //通过方法getContext()获取WebGL上下文
    var gl = canvas.getContext('webgl');

    //顶点着色器源码
    var vertexShaderSource = '';
        // 'void main(){' +
        // //给内置变量gl_PointSize赋值像素大小
        // '   gl_PointSize = 20.0;' +
        // //顶点位置，位于坐标原点
        // '   gl_Position = vec4(0, 0, 0, 1);' +
        // '}';

    //片元着色器源码
    var fragShaderSource = '' +
        'precision mediump float; ' +
        //通过传入的时间值控制燃烧的程度
        'uniform float u_time;' +
        'uniform sampler2D u_Sampler; ' +
        'varying vec2 v_uv;'+
        //取随机值
        'float random (in vec2 st) {' +
        '	return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123); ' +
        '}' +
        
        //噪声
        'float noise (in vec2 st) {' +
        '	vec2 i = floor(st);' +
        '	vec2 f = fract(st);' +
        '	float a = random(i);' +
        '	float b = random(i + vec2(1.0, 0.0));' +
        '	float c = random(i + vec2(0.0, 1.0));' +
        '	float d = random(i + vec2(1.0, 1.0));' +
        //'	vec2 u = smoothstep(0.,1.,f);' +
        '	vec2 u = sin(f * 3.1415926 / 2.0);' +
        //'	return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;}' +
        '	return mix(mix(a, b, u.x), mix(c, d, u.x), u.y); '+
        '}' +
        
        'void main() { ' +
        //取噪声的值
        '	vec2 pos = vec2(v_uv * 100.0); ' +
        '	float n = noise(pos);'+
        //设置火焰燃烧的走势 
        '	vec2 ct = vec2(0.5, 0.5);' +
        '	float d = 1.0 - distance (v_uv, ct) / sqrt(0.5);' +    //直接输出vec4(d, d, d, 1.)见图2
        //设置火焰区域的紧密程度
        '	float s = 1.0 - smoothstep(d - 0.3, d + 0.3, u_time);' +
        '	s = mix(mix(n, d, 0.5), (s - 0.5) * 4.0, 0.5);'+		//直接输出vec4(s, s, s, 1.)见图3
        //燃烧后的颜色
        '	float f1 = step(0.3, s); '+
        '	vec4 fv1 = f1 * vec4(0.0, 0.0, 0.0, 1.0); '+
        //将要燃烧的区域
        '	float f2 = smoothstep(-0.2, 0.3, s) * step(s, 0.3); '+
        '	vec4 fv2 = f2 * vec4(-0.5, -1.0, -1.0, 0.0); '+
        //燃烧的火焰的区域
        '	float f3 = step(s, 0.31) * step(0.3, s);'+
        '	vec4 fv3 = f3 * vec4(1.0, 1.0, 0.0, 1.0); '+
        //未燃烧的区域
        '	float f4 = step(s, 0.3);' +
        '	vec4 fv4 = f4 * texture2D(u_Sampler, v_uv); '+
        '	gl_FragColor = fv4 + fv2 + fv3 + fv1;'+
        '}';

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