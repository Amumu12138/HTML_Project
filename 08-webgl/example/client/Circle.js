var Example = Example || {};

/**
 * @desc 绘制一个圆
 */
Example.Circle = function() {
    //获取canvas和gl对象
    var canvas = document.getElementById("webgl");
    var gl = getWebGLContext(canvas);
    //判断canvas和gl对象是否存在
    if(!canvas || !gl) {
        console.error("Amumu Circle canvas or gl is null !");
        return;
    }

    //顶点着色器程序
    const VSHADER_SOURCE = `
        attribute vec4 a_position;
        attribute vec4 a_color;
        uniform mat4 u_mat;
        varying vec4 v_color;
        void main() {
            gl_Position = a_position;
            v_color = a_color;
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
            // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
            gl_FragColor = v_color;
        }
    `;

    //初始化着色器
    if(!initShaders(gl,VSHADER_SOURCE, FSAHDER_SOURCE)) {
        console.error("Amumu Circle initShaders is failer !");
        return;
    }
    
    //获取着色器程序中的变量
    var a_position = gl.getAttribLocation(gl.program, "a_position");
    var a_color = gl.getAttribLocation(gl.program, "a_color");
    var u_mat = gl.getUniformLocation(gl.program, "u_mat");

    /** 将数据传递给变量  */
    const CIRCLE_DIV = 30;
    var vertices = [];
    var point = {
        x: 0,
        y: 0
    };   
    var angle = 360 / CIRCLE_DIV;
    vertices.push(0.0);
    vertices.push(0.0);
    //将圆形切割成多个三角形组成的图形
    for(var i = 0; i < CIRCLE_DIV; i++) {
        var radius = i * angle * Math.PI / 180;
        point.x = 0.5 * Math.cos(radius);
        point.y = 0.5 * Math.sin(radius);
        vertices.push(point.x);
        vertices.push(point.y);
    }
    utils.dataToBuffer(gl, a_position, 2, new Float32Array(vertices), 0, 0);

    var indices = [];
    for(var j = 1; j < CIRCLE_DIV; j++) {
        indices.push(0);
        indices.push(j);
        indices.push(j + 1);
    }
    indices.push(0);
    indices.push(CIRCLE_DIV);
    indices.push(1);
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);

    
    //将颜色数据传递给a_color变量
    gl.vertexAttrib4fv(a_color, new Float32Array([1.0, 1.0, 1.0, 1.0]));

    //清理画布
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    //绘制图形
    gl.drawElements(gl.TRIANGLES, 3 * CIRCLE_DIV, gl.UNSIGNED_BYTE, 0);
    // gl.drawArrays(gl.TRIANGLE_FAN, 1, CIRCLE_DIV);
}

if(typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}
