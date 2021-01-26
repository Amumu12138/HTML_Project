var Example = Example || {};

/**
 * @desc 点击键盘移动视角,观察图形
 */
Example.LookAtTriangleWithKeys = function() {
    //获取canvas和gl对象
    var canvas = document.getElementById("webgl");
    var gl = getWebGLContext(canvas);

    //顶点着色器程序
    const VSHADER_SOURCE = `
        attribute vec4 a_position;
        attribute vec2 a_texCoord;
        uniform mat4 u_mat;
        varying vec2 v_texCoord;
        void main() {
            gl_Position = u_mat * a_position;
            v_texCoord = a_texCoord;
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
        
        uniform sampler2D u_sampler;
        varying vec2 v_texCoord;
        void main() {
            gl_FragColor = texture2D(u_sampler, v_texCoord);
            // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
    `;

    //初始化着色器
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

    //获取着色器程序中的变量
    var a_position = gl.getAttribLocation(gl.program, "a_position");
    var a_texCoord = gl.getAttribLocation(gl.program, "a_texCoord");
    var u_sampler = gl.getUniformLocation(gl.program, "u_sampler");
    var u_mat = gl.getUniformLocation(gl.program, "u_mat");

    /** 将数据传递给变量 */
    var verticesCoords = new Float32Array([
        //三角形ABC顶点位置和纹理坐标
        -0.5, 0.5, 0.0, 1.0, 
        -0.5, -0.5, 0.0, 0.0, 
        0.5, -0.5, 1.0, 0.0,

        //三角形ACD顶点位置和纹理坐标
        -0.5, 0.5, 0.0, 1.0,
        0.5, -0.5, 1.0, 0.0,
        0.5, 0.5, 1.0, 1.0        
    ]);
    const FISZE = verticesCoords.BYTES_PER_ELEMENT;

    //将顶点位置坐标传递给a_position变量
    dataToBuffer(a_position, 2, verticesCoords, FISZE * 4, 0);
    //将纹理坐标传递给a_texCoord变量
    dataToBuffer(a_texCoord, 2, verticesCoords, FISZE * 4, FISZE * 2);
    //将数据传递给u_mat变量
    var eyeX = 0.25, eyeY = 0.25, eyeZ = 0.25;
    var viewMat = new Matrix4();
    viewMat.setIdentity();
    gl.uniformMatrix4fv(u_mat, false, viewMat.elements);
    //注册键盘事件响应函数
    document.onkeydown = function(ev) {
        keyDown(ev, u_mat, viewMat);
    }
    
    //将图像数据传递给u_sampler变量
    var image = new Image();
    image.onload = () => loadTexture(u_sampler, image, () => draw(gl.TRIANGLES, 0, 6));
    image.src = "res/client/7herbs.jpg";

    //将数据传递给缓冲区对象
    function dataToBuffer(location, count, array, stride, offset) {
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
        gl.vertexAttribPointer(location, count, gl.FLOAT, false, stride, offset);
        gl.enableVertexAttribArray(location);
    }

    //根据按键点击移动视图
    function keyDown(ev, location, mat) {
        if(39 == ev.keyCode) {  //左方向键
             eyeX +=  0.01;
        } else if (37 == ev.keyCode) {  //右方向键
            eyeX -= 0.01;
        }
        else if (38 == ev.keyCode) {    //上方向键
            eyeY += 0.01;   
        } else if (40 == ev.keyCode) {  //下方向键
            eyeY -= 0.01;
        } else {
            return;
        }

        mat.setLookAt(eyeX, eyeY, eyeZ, 0, 0, 0, 0, 0, 1);
        gl.uniformMatrix4fv(location, false, mat.elements);

        draw(gl.TRIANGLES, 0, 6);
    }

    //加载纹理图像数据
    function loadTexture(location, image, callback) {
        var texture = gl.createTexture();
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
        gl.uniform1i(location, 0);

        if(callback) callback();
    }

    //绘制
    function draw(mode, start, count) {
        //清理画布
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        //绘制图形
        gl.drawArrays(mode, start, count);
    }
}

if(typeof module !== "undefined") {
    module.export = Example[Object.keys(Example)[0]];
}