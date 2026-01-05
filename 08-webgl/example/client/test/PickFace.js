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
        attribute float a_face;
        attribute vec4 a_color;
        uniform mat4 u_mvpMat;
        uniform int u_pickedFace;   
        varying vec4 v_color;
        varying float v_face;
        void main() {
            //将顶点位置坐标赋值给gl_Position
            gl_Position = u_mvpMat * a_position;
            //转化为int类型
            int face = int(a_face);
            //设置选中某块表面后的颜色值
            vec3 color = (face == u_pickedFace) ? vec3(1.0, 0.0, 0.0) : vec3(a_color);
            if(u_pickedFace == 0) {
                //若选中,则变红
                v_color = vec4(color, a_face / 255.0);
                // v_color = vec4(1.0, 1.0, 1.0, a_color.a);
            } else {
                //若未选中,则恢复为原来颜色
                v_color = vec4(color, a_color.a);
            }
            // v_color = a_color;
             v_face = a_face;
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
    var a_face = gl.getAttribLocation(gl.program, "a_face");
    var u_mvpMat = gl.getUniformLocation(gl.program, "u_mvpMat");
    var u_pickedFace = gl.getUniformLocation(gl.program, "u_pickedFace");

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
    var faces = new Uint8Array([
        1, 1, 1, 1, 1, 1,
        2, 2, 2, 2, 2, 2,
        3, 3, 3, 3, 3, 3,
        4, 4, 4, 4, 4, 4,
        5, 5, 5, 5, 5, 5,
        6, 6, 6, 6, 6, 6
    ]);
    // utils.dataToBuffer(gl, a_face, 3, normals, 0, 0);
    // console.log("Amumu faces = ", faces[0], faces[6], faces[12]);
    var faceBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, faceBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, faces, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_face, 1, gl.UNSIGNED_BYTE, false, 0, 0);
    gl.enableVertexAttribArray(a_face);

    //将平行光颜色值赋值给u_lightColor变量
    // gl.uniform3fv(u_lightColor, new Float32Array([1.0, 1.0, 1.0]));
    // //将平行光方向值赋值给u_lightDirection变量
    // var lightDirection = new Vector3([3.0, 4.0, 5.0]);
    // lightDirection.normalize();
    // gl.uniform3fv(u_lightDirection, lightDirection.elements);
    // //将环境光颜色值传递给u_ambientColor变量
    // gl.uniform3fv(u_ambientColor, new Float32Array([0.2, 0.2, 0.2]));

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

    gl.uniform1i(u_pickedFace, -1);
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
            var face = checkFace(gl, 0, x_in_canvas, y_in_canvas, 0, u_pickedFace, viewMat, mvpMat);
            gl.uniform1i(u_pickedFace, face);
        }
    }

    //选中表面
    function checkFace(gl, n, x, y, currentAngle, u_pickedFace, mat1, mat2) {
        var pixels = new Uint8Array(4); // Array for storing the pixel value
        gl.uniform1i(u_pickedFace, 0);  // Pass false to u_Clicked(rewrite the cube)
        draw(gl.TRIANGLES, 0, 36);
        gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

        return pixels[3];
    } 
}

if(typeof module !== "undefined") {
    module.export = Example[Object.keys(Example)[0]];
}