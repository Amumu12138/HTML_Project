var Example = Example || {};

/**
 * @desc webGL 测试案例
 */
Example.ClientTest = function() {
    //获取canvas和gl对象
    var canvas = document.getElementById("webgl");
    var gl = getWebGLContext(canvas);
    
    //顶点着色器程序
    const VSHADER_SOURCES = `
       attribute vec4 a_position;
       attribute vec4 a_normal;
       attribute vec4 a_color;
       uniform vec3 u_lightDirection;
       uniform vec3 u_lightColor;
       varying vec4 v_color;
       void main() {
            gl_Position = a_position;
            gl_PointSize = 10.0;
            //对法向量进行归一化
            vec3 normal = normalize(vec3(a_normal));
            //计算光线方向和法向量的点积
            float nDotL = max(dot(u_lightDirection, normal), 0.0);
            //计算漫反射光的颜色
            vec3 diffuse = u_lightColor * vec3(a_color) * nDotL;
            //将漫反射光的值赋值给v_color变量
            v_color = vec4(diffuse, a_color.a);
        }
    `;

    //片元着色器程序
    const FSHADER_SOURCE = `
        #ifdef GL_ES
        #ifdef GL_FRAGMENT_PRECISION_HIGH
            precision highp float;
        #else 
            precision mediump float;
        #endif
        #endif

       varying vec4 v_color;
       void main() {
        //  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
            gl_FragColor = v_color;
       }
    `;

    //初始化着色器程序
    initShaders(gl, VSHADER_SOURCES, FSHADER_SOURCE);

    //获取着色器程序中的变量
    var a_position = gl.getAttribLocation(gl.program, "a_position");
    var a_color = gl.getAttribLocation(gl.program, "a_color");
    var a_normal = gl.getAttribLocation(gl.program, "a_normal");
    var u_lightColor = gl.getUniformLocation(gl.program, "u_lightColor");
    var u_lightDirection = gl.getUniformLocation(gl.program, "u_lightDirection");

    /** 将数据传递给变量 */
    gl.vertexAttrib4fv(a_position, new Float32Array([0.0, 0.0, 0.0, 1.0]));
    gl.vertexAttrib4fv(a_color, new Float32Array([1.0, 0.0, 0.0, 1.0]));
    gl.vertexAttrib4fv(a_normal, new Float32Array([0.0, 0.0, 1.0, 1.0]));

    //将光线颜色值赋给u_lightColor变量
    gl.uniform3fv(u_lightColor, new Float32Array([1.0, 1.0, 1.0]));
    //将光线方向赋值给u_lightDirection变量
    var lightDirection = new Vector3([3.0, -4.0, -5.0]);
    //归一化
    lightDirection.normalize();
    gl.uniform3fv(u_lightDirection, lightDirection.elements);

    //清理画布
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    //绘制图形
    gl.drawArrays(gl.POINTS, 0, 1);
}

if(typeof module !== "undefined") {
    moudle.export = Example[Object.keys(Example)[0]];
}