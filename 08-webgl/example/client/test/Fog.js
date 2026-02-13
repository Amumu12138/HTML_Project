var Example = Example || {};

/**
 * @desc 实现雾化
 */
Example.Fog = function() {
    //获取canvas和gl对象
    var canvas = document.getElementById("webgl");
    var gl = getWebGLContext(canvas);

    if(!canvas || !gl) {
        console.error("Amumu Fog canvas or gl is null !");
        return;
    }

    //顶点着色器程序
    const VSHADER_SOURCE = `
        attribute vec4 a_position;
        attribute vec4 a_color;
        uniform mat4 u_mvpMat;
        uniform mat4 u_modelMat;
        uniform vec4 u_eye;
        varying vec4 v_color;
        varying float v_dist;
        void main() {
            //将顶点位置坐标赋值
            gl_Position = u_mvpMat * a_position;
            //将顶点颜色赋值给v_color变量
            v_color = a_color;
            //计算顶点与视点的距离
            v_dist = distance(u_modelMat * a_position, u_eye);
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

        uniform vec3 u_fogColor;
        uniform vec2 u_fogDist;
        varying vec4 v_color;
        varying float v_dist;
        void main() {
            //计算雾化因子
            float fogFactor = clamp((u_fogDist.y - v_dist) / (u_fogDist.y - u_fogDist.x), 0.0, 1.0);
            //mix(x, y, a)等同于 color = u_fogColor * (1 - fogFactor) + v_color * fogFactor
            vec3 color = mix(u_fogColor, vec3(v_color), fogFactor);
            gl_FragColor = vec4(color, v_color.a);
            // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
    `;

    //初始化着色器
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
    //获取着色器程序中的变量
    var a_position = gl.getAttribLocation(gl.program, "a_position");
    var a_color = gl.getAttribLocation(gl.program, "a_color");
    var u_mvpMat = gl.getUniformLocation(gl.program, "u_mvpMat");
    var u_modelMat = gl.getUniformLocation(gl.program, "u_modelMat");
    var u_eye = gl.getUniformLocation(gl.program, "u_eye");
    var u_fogColor = gl.getUniformLocation(gl.program, "u_fogColor");
    var u_fogDist = gl.getUniformLocation(gl.program, "u_fogDist");

    /** 将数据传递给变量 */
    const SPHERE_DIV = 50;
    const RAD = 20.0;
    let points = [];
    let indices = [];

    for(let i = 0; i <= SPHERE_DIV; i++) {
        let radius01 = i * Math.PI / SPHERE_DIV;
        let cos01 = Math.cos(radius01);
        let sin01 = Math.sin(radius01);

        for(let j = 0; j <= SPHERE_DIV; j++){
            let radius02 = 2 * j * Math.PI / SPHERE_DIV;
            let cos02 = Math.cos(radius02);
            let sin02 = Math.sin(radius02);

            let x = RAD * sin01 * cos02;
            points.push(x);
            let y = RAD * sin01 * sin02;
            points.push(y);
            let z = RAD * cos01;
            points.push(z);
        }
    }

    for(let m = 0; m < SPHERE_DIV; m++) {
        for(let n = 0; n < SPHERE_DIV; n++) {
            let p1 = m * (SPHERE_DIV + 1) + n;
            let p2 = p1 + (SPHERE_DIV + 1);

            indices.push(p1);
            indices.push(p2);
            indices.push(p1 + 1);

            indices.push(p1 + 1);
            indices.push(p2);
            indices.push(p2 + 1);
        }
    }

    //将顶点数据传递给a_position变量
    utils.dataToBuffer(gl, a_position, 3, new Float32Array(points), 0, 0);

    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    //将顶点数据传递给a_color变量
    gl.vertexAttrib4fv(a_color, new Float32Array([0.8, 0.0, 0.0, 1.0]));

    var fogColor = new Float32Array([0.137, 0.231, 0.423]);
    var fogDist = new Float32Array([55, 80]);
    var eye = new Float32Array([25, 65, 35, 1.0]);
    //将雾化颜色传递给u_fogColor变量
    gl.uniform3fv(u_fogColor, fogColor);
    //将起终点距离传递给u_fogDist变量
    gl.uniform2fv(u_fogDist,fogDist);
    //将观察视野的位置传递给u_eye变量
    gl.uniform4fv(u_eye, eye);

    //将模型矩阵信息传递给u_modelMat变量
    var modelMat = new Matrix4();
    // modelMat.setScale(1, 1, 1);
    modelMat.setRotate(0, 0, 1, 0);
    gl.uniformMatrix4fv(u_modelMat, false, modelMat.elements);

    //将矩阵信息传递给u_mvpMat变量
    var mvpMat = new Matrix4();
    mvpMat.setPerspective(50.0, canvas.width / canvas.height, 1, 100);
    mvpMat.lookAt(eye[0], eye[1], eye[2], 0, 2, 0, 0, 1, 0);
    mvpMat.multiply(modelMat);
    gl.uniformMatrix4fv(u_mvpMat, false, mvpMat.elements);

    //清理画布
    gl.clearColor(fogColor[0], fogColor[1], fogColor[2], 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //开启深度测试
    gl.enable(gl.DEPTH_TEST);
    //根据数组索引绘制图形
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

    // var modelViewMatrix = new Matrix4();
    // modelViewMatrix.setLookAt(eye[0], eye[1], eye[2], 0, 2, 0, 0, 1, 0);
    // modelViewMatrix.multiply(modelMatrix);
    // modelViewMatrix.multiplyVector4(new Vector4([1, 1, 1, 1]));
    // mvpMatrix.multiplyVector4(new Vector4([1, 1, 1, 1]));
    // modelViewMatrix.multiplyVector4(new Vector4([-1, 1, 1, 1]));
    // mvpMatrix.multiplyVector4(new Vector4([-1, 1, 1, 1]));
    

    const ANGLEP_STEP = 1.0;
    var newAngle = 0.0;
    var g_last = Date.now();
    function tick() {
        var now = Date.now();
        var deltaTime = now - g_last;
        g_last = now;

        // newAngle = (newAngle + (ANGLEP_STEP * deltaTime) / 1000.0) % 360.0;
        modelMat.setRotate(ANGLEP_STEP, 0, 1, 0);
        mvpMat.multiply(modelMat);
        gl.uniformMatrix4fv(u_mvpMat, false, mvpMat.elements);
        
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
        requestAnimationFrame(tick);
    }
    tick();

    //注册按键按下监听事件
    document.onkeydown = function(ev) {
        keydown(ev, gl, 0, u_fogDist, fogDist);
    }

    function keydown(ev, gl, n, location, fogDist) {
        switch(ev.keyCode) {
            case 38:
                fogDist[1] += 1;
                break;
            case 40:
                if(fogDist[1] > fogDist[0]) fogDist[1] -= 1;
                break;
            default:
                return;
        }

        gl.uniform2fv(location, fogDist);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
    } 
}

if(typeof module !== "undefined") {
    module.export = Example[Object.keys(Example)[0]];
}