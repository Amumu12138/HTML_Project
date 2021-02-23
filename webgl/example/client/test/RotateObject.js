var Example = Example || {};

/**
 * @desc 用鼠标控制物体旋转(创建一个棱锥,鼠标控制该物体)
 */
Example.RotateObject = function() {
    //获取canvas和gl对象
    var canvas = document.getElementById("webgl");
    var gl = getWebGLContext(canvas);

    if(!canvas || !gl) {
        console.error("Amumu RotateObject canvas is null or gl is null");
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
            // gl_Position = a_position;
            //对法向量进行归一化
            vec3 normal = normalize(vec3(a_normal));
            //计算光线方向和法向量的点积
            float nDotL = max(dot(u_lightDirection, normal), 0.0);
            //计算反射光的颜色
            vec3 diffuse = u_lightColor * vec3(a_color) * nDotL;
            //将反射光的颜色值赋值给v_color变量
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
            // gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        }
    `;

    //初始化着色器
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

    //获取着色器程序中的变量
    var a_position = gl.getAttribLocation(gl.program, "a_position");
    var a_normal = gl.getAttribLocation(gl.program, "a_normal");
    var a_color = gl.getAttribLocation(gl.program, "a_color");
    var u_mvpMat = gl.getUniformLocation(gl.program, "u_mvpMat");
    var u_lightColor = gl.getUniformLocation(gl.program, "u_lightColor");
    var u_lightDirection = gl.getUniformLocation(gl.program, "u_lightDirection");

    //将矩阵数据传递给u_mvpMat变量
    var proMat = new Matrix4();
    var viewMat = new Matrix4();
    var modelMat = new Matrix4();
    var mvpMat = new Matrix4();

    proMat.setPerspective(50.0, canvas.width / canvas.height, 1, 100);
    viewMat.setLookAt(0, 0, 2, 0, 0, -1, 0, 1, 0);
    modelMat.setRotate(45, 0, 1, 0);
    modelMat.scale(0.5, 0.5, 0.5);
    mvpMat.set(proMat).multiply(viewMat).multiply(modelMat);    //注意顺序不能弄混
    gl.uniformMatrix4fv(u_mvpMat, false, mvpMat.elements);

    initVertexBuffers();
    draw(gl.TRIANGLES, 0, 18);

    ///将数据传递给变量
    function initVertexBuffers() {
        //顶点坐标数组
        var vertices = new Float32Array([
            // 0.0, 1.0, 0.0,          //点A
            // -1.0, 0.0, 0.0,         //点B
            // 0.0, 0.0, 1.0,          //点C
            // 1.0, 0.0, 0.0,          //点D
            // 0.0, 0.0, -1.0          //点E

            0, 1, 0,  -1, 0, 0,     0, 0, 1,    //面ABC
            0, 1, 0,  0, 0, 1,     1, 0, 0,    //面ACD
            0, 1, 0,  1, 0, 0,     0, 0, -1,    //面ADE
            0, 1, 0,  -1, 0, 0,     0, 0, -1,    //面ABE
            -1, 0, 0,  0, 0, 1,     0, 0, -1,    //面BCE
            1, 0, 0,  0, 0, 1,      0, 0, -1    //面DCE
        ]);
        utils.dataToBuffer(gl, a_position, 3, vertices, 0, 0);

        //将法向量数据传递给a_normal变量
        var normals = new Float32Array([
            -1, 1, 1,  -1, 1, 1,    -1, 1, 1,       //面ABC法向量
            1, 1, 1,    1, 1, 1,    1, 1, 1,        //面ACD法向量
            -1, 1, -1, -1, 1, -1,   -1, 1, -1,      //面ADE法向量
            1, 1, -1,   1, 1, -1,   1, 1, -1,       //面ABE法向量
            0, 1, 0,    0, 1, 0,    0, 1, 0,        //面BCE法向量
            0, 1, 0,    0, 1, 0,    0, 1, 0         //面DCE法向量
        ]);
        utils.dataToBuffer(gl, a_normal, 3, normals, 0, 0);

        //将颜色值数据传递给a_normal变量
        var colors = new Float32Array([
           1, 1, 1,     1, 1, 1,    1, 1, 1,
           1, 1, 1,     1, 1, 1,    1, 1, 1,
           1, 1, 1,     1, 1, 1,    1, 1, 1,
           1, 1, 1,     1, 1, 1,    1, 1, 1,
           1, 1, 1,     1, 1, 1,    1, 1, 1,
           1, 1, 1,     1, 1, 1,    1, 1, 1
        ]);
        utils.dataToBuffer(gl, a_color, 3, colors, 0, 0);

        //顶点坐标索引数组
        var indices = new Uint16Array([
            0, 1, 2,  //面ABC
            0, 2, 3,  //面ACD
            0, 3, 4,  //面ADE
            0, 1, 4,  //面ABE
            1, 2, 4,  //面BCE
            3, 2, 4,  //面DCE
        ]);

        // var indexBuffer = gl.createBuffer();
        // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        // gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

        
        //设置光线颜色
        gl.uniform3f(u_lightColor, 1.0, 1.0, 1.0);
        //设置光线方向
        var lightDirection = new Vector3([3.0, 4.0, 5.0]);
        //归一化
        lightDirection.normalize();
        gl.uniform3fv(u_lightDirection, lightDirection.elements);
    }

    //绘制图形
    function draw(model, start, count) {
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.enable(gl.DEPTH_TEST);
        gl.drawArrays(model, start, count);
    }

    const ANGLE_STEP = 3.0;
    var curAngle = 0.0;
    var curMouseX = 0.0;
    var curMouseY = 0.0;
    //注册鼠标按下监听事件
    canvas.onmousedown = (ev) => {
        console.log("Amumu onmousedown ev = ", ev);

        curMouseX = ev.clientX;
        curMouseY = ev.clientY;
    }

    //注册鼠标松开监听事件
    canvas.onmouseup = (ev) => {
        console.log("Amumu onmouseup ev = ", ev);

        var offsetX = ev.clientX  - curMouseX;
        var offsetY = ev.clientY - curMouseY;

        if(offsetX > offsetY && offsetX > 0) {
            curAngle  = (curAngle + ANGLE_STEP) % 360.0;
            modelMat.rotate(curAngle, 0, 1, 0);
            mvpMat.set(proMat).multiply(viewMat).multiply(modelMat);  
            gl.uniformMatrix4fv(u_mvpMat, false, mvpMat.elements);

            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLES, 0, 18);
        }
    }
}

if(typeof module !== "undefined") {
    module.export = Example[Object.keys(Example)[0]];
}