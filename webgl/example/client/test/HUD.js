var Example = Example || {};

/**
 * @desc HUD(平视显示器)实现
 */
Example.HUD = function() {
    //获取canvas元素和wenbGL绘图上下文
    var canvas = document.getElementById("webgl");
    var hud = document.getElementById("hud");

    if(!canvas || !hud) {
        console.error("Amumu HUD canvas or hud is null !");
        return;
    }

    // var gl = canvas.getContext("2d");
    var gl = getWebGLContext(canvas);
    var ctx = hud.getContext("2d");
    if(!gl || !ctx) {
        console.error("Amumu HUD gl or ctx is null !");
        return;
    }
   
    //顶点着色器程序
    const VSHADER_SOURCE = `
        attribute vec4 a_position;
        attribute vec4 a_color;
        attribute vec4 a_normal;
        uniform mat4 u_mvpMat;
        uniform mat4 u_normalMat;   
        uniform vec3 u_lightColor;
        uniform vec3 u_lightDirection;
        uniform vec3 u_ambientColor;
        varying vec4 v_color;
        void main() {
            //设置顶点位置信息
            gl_Position = u_mvpMat * a_position;
            //将法向量归一化
            vec3 normal = normalize(vec3(u_normalMat * a_normal));
            //将漫反射光线方向和法向量做点积运算
            float nDotL = max(dot(u_lightDirection, normal), 0.0);
            //计算漫反射光线的颜色值
            vec3 diffuse = u_lightColor * vec3(a_color) * nDotL;
            //计算环境光光线的颜色值
            vec3 ambient = u_ambientColor * vec3(a_color);
            //将漫反射光和环境光合成的值传递给v_color变量
            v_color = vec4(diffuse + ambient, a_color.a);
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
            // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
    `;


    //初始化着色器程序
    utils.initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
    //获取着色器程序中的变量
    var a_position = gl.getAttribLocation(gl.program, "a_position");
    var a_color = gl.getAttribLocation(gl.program, "a_color");
    var a_normal = gl.getAttribLocation(gl.program, "a_normal");
    var u_mvpMat = gl.getUniformLocation(gl.program, "u_mvpMat");
    var u_lightColor = gl.getUniformLocation(gl.program, "u_lightColor");
    var u_lightDirection = gl.getUniformLocation(gl.program, "u_lightDirection");
    var u_ambientColor = gl.getUniformLocation(gl.program, "u_ambientColor");
    var u_normalMat = gl.getUniformLocation(gl.program, "u_normalMat");
  
    /** 将数据传递给变量 */
    const SPHERE_DIV = 30;
    const RAD = 0.5;
    var points = [];

    //将球形切割成多个三角形组成的图形
    for(var i = 0; i <= SPHERE_DIV; i++) {
        var angle01 = 180.0 / SPHERE_DIV;
        var radius01 = i * Math.PI / SPHERE_DIV;
        var cos01 = Math.cos(radius01);
        var sin01 = Math.sin(radius01);

        for(var j = 0; j <= SPHERE_DIV; j++) {
            var angle02 = 360.0 / SPHERE_DIV;
            var radius02 = 2 * j * Math.PI / SPHERE_DIV;
            var cos02 = Math.cos(radius02);
            var sin02 = Math.sin(radius02);

            var x = RAD * sin01 * cos02;
            points.push(x);
            var y = RAD * sin01 * sin02;
            points.push(y);
            var z = RAD * cos01;
            points.push(z);
        }
    }

    var indices = [];
    for(var m = 0; m < SPHERE_DIV; m++) {
        for(var n = 0; n < SPHERE_DIV; n++) {
            var p1 = m * (SPHERE_DIV + 1) + n;
            var p2 = p1 + (SPHERE_DIV + 1);

            indices.push(p1);
            indices.push(p2);
            indices.push(p1 + 1);

            indices.push(p1 + 1);
            indices.push(p2);
            indices.push(p2 +1);
        }
    }

    //将顶点坐标数组传递给a_position变量
    utils.dataToBuffer(gl, a_position, 3, new Float32Array(points), 0, 0);
    //将法向量数组传递给a_normal变量
    utils.dataToBuffer(gl, a_normal, 3, new Float32Array(points), 0, 0);
    //将颜色数组传递给a_color变量
    gl.vertexAttrib4fv(a_color, new Float32Array([1.0, 1.0, 1.0, 1.0]));

    //将顶点数据索引传递给顶点着色器
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    //将矩阵数据传递给u_mvpMat变量
    var proMat = new Matrix4();
    var viewMat = new Matrix4();
    var modelMat = new Matrix4();
    var mvpMat = new Matrix4();

    proMat.setPerspective(50.0, canvas.width / canvas.height, 1.0, 100.0);
    viewMat.setLookAt(0, 0, 2, 0, 0, -1, 0, 1, 0);
    modelMat.setRotate(45.0, 0, 1, 0);
    mvpMat.set(proMat).multiply(viewMat).multiply(modelMat);
    gl.uniformMatrix4fv(u_mvpMat, false, mvpMat.elements);

    //将漫反射光的方向和颜色传递给变量
    gl.uniform3fv(u_lightColor, new Float32Array([1.0, 1.0, 1.0]));
    var lightDirection = new Vector3([3.0, 4.0, 5.0]);
    lightDirection.normalize();
    gl.uniform3fv(u_lightDirection, lightDirection.elements);
    //将环境光的颜色值传递给u_ambientColor变量
    gl.uniform3fv(u_ambientColor, new Float32Array([0.2, 0.2, 0.2]));

    //将法向量矩阵数据传递给u_normalMat变量
    var normalMat = new Matrix4();
    normalMat.setInverseOf(modelMat);
    normalMat.transpose();
    gl.uniformMatrix4fv(u_normalMat, false, normalMat.elements);

    //清理画布
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    //绘制图形
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

    var ANGLEP_STEP = 30.0;
    var newAngle = 0.0;
    var g_last = Date.now();
    //绕Y轴自转
    function tick() {
        var now = Date.now();
        var deltaTime = now - g_last;
        g_last = now;

        newAngle = (newAngle + (ANGLEP_STEP * deltaTime) / 1000.0) % 360.0;
        modelMat.setRotate(newAngle, 0, 1, 0);
        mvpMat.set(proMat).multiply(viewMat).multiply(modelMat);
        gl.uniformMatrix4fv(u_mvpMat, false, mvpMat.elements);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

        requestAnimationFrame(tick);

        draw2D(ctx, newAngle);
    }
    tick();

    //绘制二维图形
    function draw2D(ctx, newAngle) {
        //清理hud画布
        ctx.clearRect(0, 0, 400, 400);
        //用白色的线条绘制三角形
        ctx.beginPath();
        //开始绘制
        ctx.moveTo(200, 325);
        ctx.lineTo(100, 375);
        ctx.lineTo(300, 375);
        ctx.closePath();
        //设置线条颜色
        ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
        ctx.stroke();
        //绘制白色文本
        ctx.font = '10px "Time New Roman"';
        //设置文本颜色
        ctx.fillStyle = "rgba(255, 255, 255, 1)";
        ctx.fillText("HUD: Head Up Diplay", 150, 50);
        ctx.fillText('newAngle: ' + Math.floor(newAngle), 160, 75);
    }
}

if(typeof module !== "undefined") {
    module.export = Example[Object.keys(Example)[0]];
}