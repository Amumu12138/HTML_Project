var Example = Example || {};

/**
 * @desc 半透明的球形物体(开启ALPHA混合)
 */
Example.BlendSphere = function() {
    //获取canvas和gl对象
    var canvas = document.getElementById("webgl");
    var gl = getWebGLContext(canvas);
    //判断canvas和gl是否存在
    if(!canvas || !gl) {
        console.error("Amumu BlendSphere canvas or gl is null !");
        return;
    }

    //顶点着色器程序
    const VSHADER_SOURCE = `
        attribute vec4 a_position;
        attribute vec4 a_color;
        attribute vec4 a_normal;
        uniform mat4 u_mvpMat;
        uniform vec3 u_lightColor;
        uniform vec3 u_lightDirection;
        varying vec4 v_color;
        void main() {
            gl_Position = u_mvpMat * a_position;
            //将法向量归一化
            vec3 normal = normalize(vec3(a_normal));
            //计算漫反射光线方向和法向量的点积
            float nDotL = max(dot(u_lightDirection, normal), 0.0);
            //计算漫反射光的颜色值
            vec3 diffuse = u_lightColor * vec3(a_color) * nDotL;
            //将漫反射的颜色值赋值给v_color变量
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
            gl_FragColor = v_color;
        }
    `;

    //初始化着色器
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
    //获取着色器程序中的变量
    var a_position = gl.getAttribLocation(gl.program, "a_position");
    var a_color = gl.getAttribLocation(gl.program, "a_color");
    var a_normal = gl.getAttribLocation(gl.program, "a_normal");
    var u_mvpMat = gl.getUniformLocation(gl.program, "u_mvpMat");
    var u_lightColor = gl.getUniformLocation(gl.program, "u_lightColor");
    var u_lightDirection = gl.getUniformLocation(gl.program, "u_lightDirection");

    /* 将数据传递给变量 */
    const SPHERE_DIV = 30;
    const RAD = 5.0;
    var points = [], indices = [];

    for(var i = 0; i < SPHERE_DIV; i++) {
        var radius01 = i * Math.PI / SPHERE_DIV;
        var cos01 = Math.cos(radius01);
        var sin01 = Math.sin(radius01);
        for(var j = 0; j < SPHERE_DIV; j++) {
            var radius02 = 2 * j * Math.PI / SPHERE_DIV;
            var cos02= Math.cos(radius02);
            var sin02 = Math.sin(radius02);

            var x = RAD * sin01 * cos02;
            points.push(x);
            var y = RAD * sin01 * sin02;
            points.push(y);
            var z = RAD * cos01;
            points.push(z);
        }
    }

    for(var m = 0; m <= SPHERE_DIV; m++) {
        for(var n = 0;n <= SPHERE_DIV; n++) {
            var p1 = m * (SPHERE_DIV + 1) + n;
            var p2 = p1 + (SPHERE_DIV + 1);

            indices.push(p1);
            indices.push(p2);
            indices.push(p1 + 1);

            indices.push(p1 + 1)
            indices.push(p2);
            indices.push(p2 + 1);
        }
    } 
    
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    //将顶点数据传递给a_position变量
    utils.dataToBuffer(gl, a_position, 3, new Float32Array(points), 0, 0);

    //将发向量数据传递给a_normal变量
    utils.dataToBuffer(gl, a_normal, 3, new Float32Array(points), 0, 0);

    //将颜色数据传递给a_color变量
    gl.vertexAttrib4fv(a_color, new Float32Array([1.0, 0.0, 0.0, 1.0]));

    //将漫反射光线的方向和颜色值赋值给变量
    gl.uniform3fv(u_lightColor, new Float32Array([1.0, 1.0, 1.0]));
    var lightDirection = new Vector3([3.0, 4.0, 5.0]);
    lightDirection.normalize();
    gl.uniform3fv(u_lightDirection, lightDirection.elements);

    //将矩阵信息传递给u_mvpMat变量
    var modelMat = new Matrix4();
    var mvpMat = new Matrix4();

    mvpMat.setPerspective(50.0, canvas.width / canvas.height, 1, 100);
    mvpMat.lookAt(0, 15, 0, 0, 0, 1, 0, 1, 0);
    mvpMat.multiply(modelMat);
    gl.uniformMatrix4fv(u_mvpMat, false, mvpMat.elements);

    //清理画布
    gl.clearColor(0.0, 0.0, 0.0, 0.8);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    //开启混合功能
    // gl.enable(gl.BLEND);
    // //指定混合函数
    // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // gl.enable(gl.BLEND);
    // //gl.blendFunc()的第一个参数是源颜色的系数，第二个参数是目标颜色的系数，
    // //两组像素值乘以各自系数后然后相加得到融合后的像素值，覆盖原来的像素值，
    // //注意覆盖的时候是覆盖x、y坐标相同的像素
    // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    //  gl.depthMask(false); //关闭深度缓冲区
    //绘制图形
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

    const ANGLEP_STEP = 1.0;
    var newAngle = 0.0;
    var g_last = Date.now();
    /** 绕Y轴自转 */
    function tick() {
        var now = Date.now();
        var deltaTime = now - g_last;
        now = g_last;

        modelMat.setRotate(ANGLEP_STEP, 0, 0, 1);
        mvpMat.multiply(modelMat);
        gl.uniformMatrix4fv(u_mvpMat, false, mvpMat.elements);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
        requestAnimationFrame(tick);
    }

    // tick();
}

if(typeof module !== "undefined") {
    module.export = Example[Object.keys(Example)[0]];
}