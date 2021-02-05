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
        attribute vec4 a_color;
        attribute vec4 a_normal; 
        uniform mat4 u_mvpMat;
        uniform mat4 u_modelMat;
        uniform mat4 u_normalMat;
        varying vec3 v_normal;
        varying vec3 v_position;
        varying vec4 v_color;
        void main() {
            gl_Position = u_mvpMat * a_position;
            //计算顶点的世界坐标
            v_position = vec3(u_modelMat * a_position);
            v_normal = normalize(vec3(u_normalMat * a_normal));
            v_color = a_color;
        }
    `;

    //片元着色器程序
    const FSHADER_SOURCES = `
        #ifdef GL_ES
        #ifdef GL_FRAGMENT_PRECISION_HIGH
            precision highp float;
        #else
            precision mediump float;
        #endif
        #endif

        uniform vec3 u_lightColor;  
        uniform vec3 u_lightDirection;
        uniform vec3 u_ambientLight;
        varying vec3 v_normal;
        varying vec3 v_position;
        varying vec4 v_color;
        void main() {
            //对法线进行归一化
            vec3 normal = normalize(v_normal);
            //计算光线方向并归一化
            vec3 lightDirection = normalize(u_lightDirection - v_position);
            //计算光线方向和法向量的点积
            float nDotL = max(dot(lightDirection, normal), 0.0);
            //计算diffuse、ambient以及最终的颜色值
            vec3 diffuse = u_lightColor * vec3(v_color) * nDotL;
            vec3 ambient = u_ambientLight * vec3(v_color);
            gl_FragColor = vec4(diffuse + ambient, v_color.a);
        }
    `;

    //初始化着色器
    initShaders(gl, VSHADER_SOURCES, FSHADER_SOURCES);

    //获取着色器程序中的变量
    var a_position = gl.getAttribLocation(gl.program, "a_position");
    var a_color = gl.getAttribLocation(gl.program, "a_color");
    var a_normal = gl.getAttribLocation(gl.program, "a_normal");
    var u_mvpMat = gl.getUniformLocation(gl.program, "u_mvpMat");
    var u_modelMat = gl.getUniformLocation(gl.program, "u_modelMat");
    var u_normalMat = gl.getUniformLocation(gl.program, "u_normalMat");
    var u_lightColor = gl.getUniformLocation(gl.program, "u_lightColor");
    var u_lightDirection = gl.getUniformLocation(gl.program, "u_lightDirection");
    var u_ambientLight = gl.getUniformLocation(gl.program, "u_ambientLight");

    /** 将数据传递给变量 */
    const SPHERE_DIV = 30;
    const RAD = 1.0;
    var points = [];
    //将球体切割成由多个三角形组成
    for(var i = 0; i <= SPHERE_DIV; i++) {
        var angle01 = 180 / SPHERE_DIV;
        var radius01 = i * Math.PI / SPHERE_DIV;
        var sin01 = Math.sin(radius01);
        var cos01 = Math.cos(radius01);
        for(var j = 0; j <= SPHERE_DIV; j++) {
            var angle02 = 360 / SPHERE_DIV;
            var radius02 = 2 * j * Math.PI / SPHERE_DIV;

            var x = RAD * sin01 * Math.cos(radius02);
            points.push(x);
            var y = RAD * sin01 * Math.sin(radius02);
            points.push(y);
            var z = RAD * cos01
            points.push(z);
            // var x = RAD * sin01 * Math.sin(radius02);
            // points.push(x);
            // var y = RAD * cos01
            // points.push(y);
            // var z = RAD * sin01 * Math.cos(radius02);
            // points.push(z);
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
            indices.push(p2 + 1);
        }
    }

    //将数据传递给顶点索引缓冲区
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    //将顶点坐标数据传递给a_position变量
    utils.dataToBuffer(gl, a_position, 3, new Float32Array(points), 0, 0);

    //将颜色值数据传给a_color变量
    gl.vertexAttrib4fv(a_color, new Float32Array([1.0, 0.0, 0.0, 1.0]));

    //将法向量数据传递给a_normal变量
    utils.dataToBuffer(gl, a_normal, 3, new Float32Array(points), 0, 0);

     //将漫反射光的颜色值传递给u_lightColor变量
     gl.uniform3fv(u_lightColor, new Float32Array([0.8, 0.8, 0.8]));
     //将反射光方向传递给u_lightDirection变量
     gl.uniform3fv(u_lightDirection, new Float32Array([5.0, 8.0, 7.0]));
 
     //将环境光的值传递给u_ambientLight变量
     gl.uniform3fv(u_ambientLight, new Float32Array([0.2, 0.2, 0.2]));
 
     //将矩阵信息传递给u_mvpMat变量
     var modelMat = new Matrix4();
     var mvpMat = new Matrix4();
     gl.uniformMatrix4fv(u_modelMat, false, modelMat.elements);
 
     mvpMat.setPerspective(30, canvas.width / canvas.clientHeight, 1, 100);
     mvpMat.lookAt(0, 0, 6, 0, 0, 0, 0, 1, 0);
     mvpMat.multiply(modelMat);
     gl.uniformMatrix4fv(u_mvpMat, false, mvpMat.elements);
 
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
}

if(typeof module !== "undefined") {
    moudle.export = Example[Object.keys(Example)[0]];
}