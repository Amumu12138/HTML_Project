var Example = Example || {};

/**
 * @desc 逆转置矩阵(绘制球体)
 */
Example.LightedTranslatedRotatedCube = function() {
    //获取canvas和gl对象
    var canvas = document.getElementById("webgl");
    var gl = getWebGLContext(canvas);

    //顶点着色器程序
    const VSHADER_SOURCE = `
        attribute vec4 a_position;
        attribute vec4 a_color;
        attribute vec4 a_normal;
        uniform mat4 u_mvpMat;
        uniform mat4 u_modelMat;
        uniform mat4 u_normalMat;   
        uniform vec3 u_lightColor;
        uniform vec3 u_lightDirection;
        uniform vec3 u_ambientLight;
        varying vec4 v_color;
        void main() {
            gl_Position = u_mvpMat * a_position;
            //计算变换后的法向量并归一化
            vec3 normal = normalize(vec3(u_normalMat * a_normal));
            vec4 vertexPosition = u_modelMat * a_position;
            vec3 lightDirection = normalize(u_lightDirection - vec3(vertexPosition));
            //计算光线方向和法向量的点积
            float nDotL = max(dot(lightDirection, normal), 0.0);
            //计算漫反射光的颜色
            vec3 diffuse = u_lightColor * vec3(a_color) * nDotL;
            //计算环境光产生的反射光的颜色
            vec3 ambient = u_ambientLight * vec3(a_color);
            //将漫反射和环境光共同作用的颜色赋值给v_color
            v_color = vec4(diffuse + ambient, a_color.a);
             //v_color = a_color;
        }
    `;

    //片元着色器程序
    const FSAHDER_SOURCE = `
        #ifdef GL_ES
        #ifdef GL_FRAGMENT_PReCISION_HIGH
            precision highp float;
        #else 
            precision mediump float;
        #endif
        #endif

        varying vec4 v_color;
        void main() {
           // gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
            gl_FragColor = v_color;
        }
    `;

    //初始化着色器
    initShaders(gl, VSHADER_SOURCE, FSAHDER_SOURCE);

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
    //将顶点数据传递给a_position变量
    const SPHERE_DIV = 30;
    const R = 1.0;
    var i;
    var j;
    var p1, p2;

    var positions  = [];
    var indices = [];
    //将球形切割成多个三角形组成的图形
    for(i = 0; i <= SPHERE_DIV; i++) {
        var angle01 = 180 / SPHERE_DIV;
        var radius01 = angle01 * Math.PI / 180 * i;
        var sin01 = Math.sin(radius01);
        var cos01 = Math.cos(radius01);

        for(var j = 0; j <= SPHERE_DIV; j++) {
            var angle02 = 360 / SPHERE_DIV;
            var radius02 = angle02 * Math.PI / 180 * j;

            var x = R * sin01 * Math.sin(radius02);
            positions.push(x);
            var y = R * cos01;
            positions.push(y);
            var z = R * sin01 * Math.cos(radius02);
            positions.push(z);
        }
    }

    for (j = 0; j < SPHERE_DIV; j++) {
        for (i = 0; i < SPHERE_DIV; i++) {
          p1 = j * (SPHERE_DIV + 1) + i;
          p2 = p1 + (SPHERE_DIV + 1);
    
          indices.push(p1);
          indices.push(p2);
          indices.push(p1 + 1);
    
          indices.push(p1 + 1);
          indices.push(p2);
          indices.push(p2 + 1);
        }
      }

    //将顶点索引数据传递给缓冲区对象
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    //将顶点数据传递给a_position变量
    utils.dataToBuffer(gl, a_position, 3, new Float32Array(positions), 0, 0);

    //将法向量数据传递给a_normal变量
    utils.dataToBuffer(gl, a_normal, 3, new Float32Array(positions), 0, 0);

    //将颜色数据传递给a_color变量
    gl.vertexAttrib4fv(a_color, new Float32Array([1.0, 1.0, 1.0, 1.0]));

    //将漫反射光的颜色值传递给u_lightColor变量
    gl.uniform3fv(u_lightColor, new Float32Array([0.8, 0.8, 0.8]));
    //将反射光方向传递给u_lightDirection变量
    var lightDir = new Vector3([5.0, 8.0, 7.0]);
    // lightDir.normalize();
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
    // gl.drawElements(gl.LINE_LOOP, indices.length, gl.UNSIGNED_SHORT, 0);
    // gl.drawArrays(gl.POINTS, 0, positions.length);
}

if(typeof module !== "undefined") {
    module.export = Example[Object.keys(Example)[0]];
}