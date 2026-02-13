var Example = Example || {};

/**
 * @desc 手臂关节模型
 */
Example.JointModel = function() {
    //设置基础属性
    var ANGLE_STEP = 3.0;
    var g_arm1Angle = -90.0;
    var g_joint1Angle = 0.0;

    var g_normalMatrix = new Matrix4(); 
    var g_modelMatrix = new Matrix4();
    var g_mvpMatrix = new Matrix4();
     
    //获取canvas和gl对象
    var canvas = document.getElementById("webgl");
    var gl = getWebGLContext(canvas);

    //顶点着色器程序
    const VSDHADER_SOURCE = `
        attribute vec4 a_position;
        attribute vec4 a_normal;
        attribute vec4 a_color;
        uniform mat4 u_mvpMatrix;
        uniform mat4 u_normalMatrix;
        varying vec4 v_color;
        void main() {
            gl_Position = u_mvpMatrix * a_position;
            //设置光照方向
            vec3 lightDirection = normalize(vec3(0.0, 0.5, 0.7));
            //设置自身颜色值
            vec4 color = vec4(1.0, 1.0, 1.0, 1.0);
            //对法向量进行归一化
            vec3 normal = normalize(vec3((u_normalMatrix * a_normal)));
            //计算光线方向和法向量的点积
            float nDotL = max(dot(normal, lightDirection), 0.0);
            //计算满漫反射光的颜色
            vec3 diffuse = vec3(color) * nDotL + vec3(0.1, 0.0, 0.0);
            //将漫反射光的至赋值给v_color变量
            v_color = vec4(diffuse, color.a);
        }
    `;

    //片元着色器程序
    const FSAHDER_SOURCE = `
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
    initShaders(gl, VSDHADER_SOURCE, FSAHDER_SOURCE);

    //获取着色器程序中的变量
    var a_position = gl.getAttribLocation(gl.program, "a_position");
    var a_normal = gl.getAttribLocation(gl.program, "a_normal");
    var u_mvpMatrix = gl.getUniformLocation(gl.program, "u_mvpMatrix");
    var u_normalMatrix = gl.getUniformLocation(gl.program, "u_normalMatrix")

    /** 将数据传递给变量 */
    var viewProjMatrix = new Matrix4();
    viewProjMatrix.setPerspective(50.0, canvas.width / canvas.height, 1.0, 100.0);
    viewProjMatrix.lookAt(20.0, 10.0, 30.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);

    var n = initVertexBuffers(gl);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    //监听按键事件
    document.onkeydown = (ev) => { keydown(ev, gl, n, viewProjMatrix, u_mvpMatrix, u_normalMatrix); }

    draw(gl, n, viewProjMatrix, u_mvpMatrix, u_normalMatrix);
    //清理画布
    // gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // gl.clear(gl.COLOR_BUFFER_BIT);

    // //绘制图形
    // gl.drawArrays(gl.TRIANGLES, 0, n);

   
    //按键响应函数
    function keydown(ev, gl, n, mat1, location, mat2) {
        switch(ev.keyCode) {
            case 38:    //上方向键
                if(g_joint1Angle < 135.0) g_joint1Angle += ANGLE_STEP;
                break;
            case 40:    //下方向键
                if(g_joint1Angle > -135.0) g_joint1Angle -= ANGLE_STEP;
                break;
            case 37:    //右方向键 
                g_arm1Angle = (g_arm1Angle + ANGLE_STEP) % 360.0;
                break;
            case 39:    //左方向键 
                g_arm1Angle = (g_arm1Angle - ANGLE_STEP) % 360.0;
                break;
            default:
                break;
        }

        draw(gl, n, mat1, location, mat2);
    }

    //初始化顶点缓冲区
    function initVertexBuffers(gl) {
        var vertices = new Float32Array([
            1.5, 10.0, 1.5,  -1.5, 10.0, 1.5,  -1.5, 0.0, 1.5,  1.5, 0.0, 0.5, //正视面
            1.5, 10.0, 1.5,  1.5, 0.0, 1.5,  1.5, 0.0, -1.5,  1.5, 10.0, -1.5, //右视面
            1.5, 10.0, 1.5,  1.5, 10.0,-1.5, -1.5, 10.0,-1.5, -1.5, 10.0, 1.5, //上视面
            -1.5, 10.0, 1.5, -1.5, 10.0,-1.5, -1.5,  0.0,-1.5, -1.5,  0.0, 1.5, //左视面
            -1.5,  0.0,-1.5,  1.5,  0.0,-1.5,  1.5,  0.0, 1.5, -1.5,  0.0, 1.5, //下视面
            1.5,  0.0,-1.5, -1.5,  0.0,-1.5, -1.5, 10.0,-1.5,  1.5, 10.0,-1.5  //后视面
        ]);

        // Normal
        var normals = new Float32Array([
            0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0, // v0-v1-v2-v3 front
            1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0, // v0-v3-v4-v5 right
            0.0, 1.0, 0.0,  0.0, 1.0, 0.0,  0.0, 1.0, 0.0,  0.0, 1.0, 0.0, // v0-v5-v6-v1 up
            -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, // v1-v6-v7-v2 left
            0.0,-1.0, 0.0,  0.0,-1.0, 0.0,  0.0,-1.0, 0.0,  0.0,-1.0, 0.0, // v7-v4-v3-v2 down
            0.0, 0.0,-1.0,  0.0, 0.0,-1.0,  0.0, 0.0,-1.0,  0.0, 0.0,-1.0  // v4-v7-v6-v5 back
        ]);

        // Indices of the vertices
        var indices = new Uint8Array([
            0, 1, 2,   0, 2, 3,    // front
            4, 5, 6,   4, 6, 7,    // right
            8, 9,10,   8,10,11,    // up
            12,13,14,  12,14,15,    // left
            16,17,18,  16,18,19,    // down
            20,21,22,  20,22,23     // back
        ]);

        if(!initArrayBuffer(gl, a_position, vertices, gl.FLOAT, 3)) return -1;
        if(!initArrayBuffer(gl, a_normal, normals, gl.FLOAT, 3)) return -1;

        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        // Write the indices to the buffer object
        var indexBuffer = gl.createBuffer();
        if (!indexBuffer) {
            console.log('Failed to create the buffer object');
            return -1;
        }
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

        return indices.length;
    }

    //初始化数组缓冲区
    function initArrayBuffer(gl, location, data, type, num) {
        var buffer = gl.createBuffer();
        if(!buffer) {
            console.log("Failed to create the buffer is null");
            return;
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
        gl.vertexAttribPointer(location, num, type, false, 0, 0);
        gl.enableVertexAttribArray(location);

        return true;
    }

    //绘制
    function draw(gl, n, mat1, location1, location2) {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        //arm1
        var arm1Length = 10.0;
        g_modelMatrix.setTranslate(0.0, -12.0, 0.0);
        g_modelMatrix.rotate(g_arm1Angle, 0.0, 1.0, 0.0);
        drawBox(gl, n, mat1, location1, location2);

        //arm2
        g_modelMatrix.translate(0.0, arm1Length, 0.0);
        g_modelMatrix.rotate(g_joint1Angle, 0.0, 0.0, 1.0);
        g_modelMatrix.scale(1.3, 1.0, 1.3);
        drawBox(gl, n, mat1, location1, location2);
    }

    //绘制矩形盒子
    function drawBox(gl, n, mat, location1, location2) {
        g_mvpMatrix.set(mat);
        g_mvpMatrix.multiply(g_modelMatrix);
        gl.uniformMatrix4fv(location1, false, g_mvpMatrix.elements);

        g_normalMatrix.setInverseOf(g_modelMatrix);
        g_normalMatrix.transpose();
        gl.uniformMatrix4fv(location2, false, g_normalMatrix.elements);

        //绘制图形
        gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
    }
}

if(typeof module !== "undefined") {
    module.export = Example[Object.keys(Example)[0]];
}