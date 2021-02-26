var Example = Example || {};

/**
 * @desc 选择物体一个面(在鼠标点击选中物体的一个面后,这个面颜色变红)
 */
Example.PickFace = function() {
    //获取canva和gl对象
    var canvas = document.getElementById("webgl");
    var gl = getWebGLContext(canvas);

    //顶点着色器程序
    const VSHADER_SOURCE = `
        attribute vec4 a_position;
        attribute vec4 a_color;
        attribute vec4 a_normal;
        uniform mat4 u_mvpMat;
        uniform vec3 u_lightColor;
        uniform vec3 u_lightDirection;
        uniform vec3 u_ambientColor;
        uniform bool u_click;
        varying vec4 v_color;
        void main() {
            //将顶点位置坐标赋值给gl_Position
            gl_Position = u_mvpMat * a_position;
            //将法向量归一化
            vec3 normal = normalize(vec3(a_normal));
            //漫反射光线和法向量进行点积运算
            float nDotL = max(dot(u_lightDirection, normal), 0.0);
            //计算漫反射光的值
            vec3 diffuse = u_lightColor * vec3(a_color) * nDotL;
            //计算环境光的值
            vec3 ambient = u_ambientColor * vec3(a_color);
            //v_color = vec4(diffuse + ambient, a_color.a);
            if(u_click) {
                //给v_color变量赋值红色
                v_color = vec4(1.0, 0.0, 0.0, 1.0);
            } else {
                //将漫反射光和环境光合成的颜色值赋值给v_color变量
                v_color = vec4(diffuse + ambient, a_color.a); 
            }
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

    //初始化着色器程序
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

    //获取着色器程序中的变量
    var a_position = gl.getAttribLocation(gl.program, "a_position");
    var a_color = gl.getAttribLocation(gl.program, "a_color");
    var a_normal = gl.getAttribLocation(gl.program, "a_normal");
    var u_mvpMat = gl.getUniformLocation(gl.program, "u_mvpMat");
    var u_lightColor = gl.getUniformLocation(gl.program, "u_lightColor");
    var u_lightDirection = gl.getUniformLocation(gl.program, "u_lightDirection");
    var u_ambientColor = gl.getUniformLocation(gl.program, "u_ambientColor");
    var u_click = gl.getUniformLocation(gl.program, "u_click");

    /** 将数据传递给变量 */
     //将顶点数据传递给a_position变量
     var vertices = new Float32Array([
        /**   D —— —— —— C
         *   /|         /|   
         *  / |        / |
         * A —— —— —— B  |
         * |  |       |  |
         * |  H —— —— —— G     
         * | /        | /
         * E —— —— —— F
         */
        //面ABCD
        -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 
        -0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 
        //面AEHD
        -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 
        -0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5,
        //面DHGC
        0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5,
        0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5,
        //面CGFB
        0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5,
        0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5,
        //面BAEF
        -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5,
        -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5,
        //面EFGH
        -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5,
        -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5
    ]);
    utils.dataToBuffer(gl, a_position, 3, vertices, 0, 0);

    //将颜色数据传递给a_color变量
    var colors = new Float32Array([
        //面ABCD
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
        //面AEHD
        1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
        1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
        //面DHGC
        1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0,
        1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0,
        //面CGFB
        0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0,
        0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0,
        //面BAEF
        0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
        0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
        //面EFGH
        0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0
    ]);
    utils.dataToBuffer(gl, a_color, 3, colors, 0, 0);

    //将法向量数据传递给a_normal变量
    var normals = new Float32Array([
        0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, //y轴正方向——面ABCD
        0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, //z轴正方向——面AEHD
        1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, //x轴正方向——面DHGC
        0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, //z轴负方向——面CGFB
        -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, //x轴负方向——面BAEF
        0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0//y轴负方向——面EFGH
    ]);
    utils.dataToBuffer(gl, a_normal, 3, normals, 0, 0);

    //将平行光颜色值赋值给u_lightColor变量
    gl.uniform3fv(u_lightColor, new Float32Array([1.0, 1.0, 1.0]));
    //将平行光方向值赋值给u_lightDirection变量
    var lightDirection = new Vector3([3.0, 4.0, 5.0]);
    lightDirection.normalize();
    gl.uniform3fv(u_lightDirection, lightDirection.elements);
    //将环境光颜色值传递给u_ambientColor变量
    gl.uniform3fv(u_ambientColor, new Float32Array([0.2, 0.2, 0.2]));

    //将矩阵信息传递给u_mvpMat变量
    var proMat = new Matrix4();
    var viewMat = new Matrix4();
    var modelMat = new Matrix4();
    var mvpMat = new Matrix4();

    proMat.setPerspective(60.0, canvas.width / canvas.height, 1, 100);
    viewMat.setLookAt(0, 0, 2, 0, 0, -1, 0, 1, 0);
    modelMat.setRotate(45.0, 0, 1, 0);
    mvpMat.set(proMat).multiply(viewMat).multiply(modelMat);
    gl.uniformMatrix4fv(u_mvpMat, false, mvpMat.elements);

    gl.uniform1i(u_click, 0);
    //绘制一个多色立方体
    draw(gl.TRIANGLES, 0, 36);
    /** 绘制 */
    function draw(mode, start, count) {
        //清理画布
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        //开启深度测试
        gl.enable(gl.DEPTH_TEST);
        //绘制图形
        gl.drawArrays(mode, start, count);
    }

    var ANGLE_STEP = 10.0;
    var newAngle = 0.0;
    var g_last = Date.now();
    /** 自转动画 */
    function tick() {
        var now = Date.now();
        var deltaTime = now - g_last;
        g_last = now;

        //物体绕Y轴自转
        newAngle = newAngle + (ANGLE_STEP * deltaTime) / 1000.0 % 360.0;
        modelMat.setRotate(newAngle, 0, 1, 0);
        mvpMat.set(proMat).multiply(viewMat).multiply(modelMat);
        gl.uniformMatrix4fv(u_mvpMat, false, mvpMat.elements);

        //重新清理缓冲区, 绘制图形
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 36);
        //请求浏览器调用tick
        requestAnimationFrame(tick);
    }

   tick();

    //注册监听鼠标在画布按下事件
    canvas.onmousedown = function(ev) {
        var mouseX = ev.clientX;
        var mouseY = ev.clientY;
        var rect = ev.target.getBoundingClientRect();
        if(rect.left <= mouseX && mouseX < rect.right && rect.top <= mouseY && mouseY < rect.bottom) {
            var x_in_canvas = mouseX - rect.left;
            var y_in_canvas = rect.bottom - mouseY;
            var pick = check(gl, 0, x_in_canvas, y_in_canvas, 0, u_click, viewMat, mvpMat);
            if(pick) {
                gl.uniform1i(u_click, 1);
                draw(gl.TRIANGLES, 0, 36);
            } else {
                gl.uniform1i(u_click, 0);
                draw(gl.TRIANGLES, 0, 36);
            }
        }
    }

    function check(gl, n, x, y, currentAngle, u_click, mat1, mat2) {
        var pixels = new Uint8Array(4); // Array for storing the pixel value
        gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        gl.uniform1i(u_click, 0);  // Pass false to u_Clicked(rewrite the cube)
        draw(gl.TRIANGLES, 0, 36);
        
        return pixels[3];
    } 
}

if(typeof module !== "undefined") {
    module.export = Example[Object.keys(Example)[0]];
}