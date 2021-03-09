var Example = Example || {};
/**
 * @desc 实现切换着色器(同时渲染单色立方体和纹理立方体)
 */
Example.ProgramObject = function() {
    //获取canvas和gl对象
    var canvas = document.getElementById("webgl");
    var gl = getWebGLContext(canvas);

    //判断canvas和gl是否存在
    if(!canvas || !gl) {
        console.error("Amumu ProgramObject canvas or gl is null !");
        return;
    }

    //单色立方体顶点着色器程序
    const SOLID_VSHADER_SOURCE = `
        attribute vec4 a_position;
        attribute vec4 a_normal;
        uniform mat4 u_mvpMat;
        uniform mat4 u_normalMat;
        varying vec4 v_color;
        void main() {
            gl_Position = u_mvpMat * a_position;
            //设定照射光线方向
            vec3 lightDirection = vec3(3.0, 4.0, 5.0);
            //设定顶点颜色
            vec3 color = vec3(1.0, 0.0, 0.0);
            //将法向量做归一化处理
            vec3 normal = normalize(vec3(a_normal));
            //计算法向量和照射光线方向的点积
            float nDotL = max(dot(normal, normalize(lightDirection)), 0.0);
            //将反射光的颜色值赋值给v_color变量
            v_color = vec4(color * nDotL * vec3(1.0, 1.0, 1.0) + vec3(0.2, 0.0, 0.2), 1.0);
        }
    `;

    //单色立方体片元着色器程序
    const SOLID_FSHADER_SOURCE = `
        #ifdef GL_ES
        precision mediump float;
        #endif

        varying vec4 v_color;
        void main() {
            gl_FragColor = v_color;
        }
    `;

    //纹理立方体顶点着色器程序
    const TEXTURE_VSHADER_SOURCE = `
        attribute vec4 a_position;
        attribute vec4 a_normal;
        attribute vec2 a_texCoord;
        uniform mat4 u_mvpMat;
        uniform mat4 u_normalMat;
        varying float v_nDotL;
        varying vec2 v_texCoord;
        void main() {
            //将顶点位置赋值给gl_Position
            gl_Position = u_mvpMat * a_position;
            //设定灯光照射方向
            vec3 lightDirection = vec3(0.0, 0.0, 1.0);
            //将法向量进行归一化处理
            vec3 normal = normalize(vec3(a_normal));
            //计算光线照射方向与法向量的点积
            v_nDotL = max(dot(normalize(lightDirection), normal), 0.0);
            //将纹理数据赋值给v_texCoord
            v_texCoord = a_texCoord;
        }
    `;

    //纹理立方体片元着色器程序
    const TEXTURE_FSHADER_SOURCE = `
        #ifdef GL_ES
        precision mediump float;
        #endif

        uniform sampler2D u_sampler;
        varying vec2 v_texCoord;
        varying float v_nDotL;
        void main() {
            vec4 color = texture2D(u_sampler, v_texCoord);
            // gl_FragColor = vec4(vec3(color) * v_nDotL, color.a);
            gl_FragColor = color;
        }
    `;

    //初始化着色器程序
    var solidProgram = createProgram(gl, SOLID_VSHADER_SOURCE, SOLID_FSHADER_SOURCE);
    var texProgram = createProgram(gl, TEXTURE_VSHADER_SOURCE, TEXTURE_FSHADER_SOURCE);

    //获取单色立方体着色器程序中的变量
    solidProgram.a_position = gl.getAttribLocation(solidProgram, "a_position");
    solidProgram.a_normal = gl.getAttribLocation(solidProgram, "a_normal");
    solidProgram.u_mvpMat = gl.getUniformLocation(solidProgram, "u_mvpMat");
    solidProgram.u_normalMat = gl.getUniformLocation(solidProgram, "u_normalMat");

    //获取纹理立方体着色器程序中的变量
    texProgram.a_position = gl.getAttribLocation(texProgram, "a_position");
    texProgram.a_normal = gl.getAttribLocation(texProgram, "a_normal");
    texProgram.a_texCoord = gl.getAttribLocation(texProgram, "a_texCoord");
    texProgram.u_mvpMat = gl.getUniformLocation(texProgram, "u_mvpMat");
    texProgram.u_normalMat = gl.getUniformLocation(texProgram, "u_normalMat");
    texProgram.u_sampler = gl.getUniformLocation(texProgram, "u_sampler");

    /** 将数据传递给各个着色器中的变量 */
    var texCube = drawCube(gl, texProgram, texProgram.a_position, texProgram.a_normal, texProgram.u_mvpMat, texProgram.u_normalMat, 0.5);
    var texCoords = new Float32Array([   // Texture coordinates
        1.0, 1.0,   0.0, 1.0,   0.0, 0.0,   1.0, 0.0,    // v0-v1-v2-v3 front
        0.0, 1.0,   0.0, 0.0,   1.0, 0.0,   1.0, 1.0,    // v0-v3-v4-v5 right
        1.0, 0.0,   1.0, 1.0,   0.0, 1.0,   0.0, 0.0,    // v0-v5-v6-v1 up
        1.0, 1.0,   0.0, 1.0,   0.0, 0.0,   1.0, 0.0,    // v1-v6-v7-v2 left
        0.0, 0.0,   1.0, 0.0,   1.0, 1.0,   0.0, 1.0,    // v7-v4-v3-v2 down
        0.0, 0.0,   1.0, 0.0,   1.0, 1.0,   0.0, 1.0     // v4-v7-v6-v5 back
     ]);
    //将纹理数据传递给texProgram程序中的u_texCoord变量
    utils.dataToBuffer(gl, texProgram.a_texCoord, 2, texCoords, 0, 0);
    var image = new Image();
    image.onload = () => {
        utils.loadTexture(gl, texProgram.u_sampler, gl.TEXTURE0, image, 0, function() {
            //清理画布
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        
            gl.enable(gl.DEPTH_TEST);
            //绘制纹理立方体
            gl.drawElements(gl.TRIANGLES, 24, gl.UNSIGNED_SHORT, 0);
            var solidCube = drawCube(gl, solidProgram, solidProgram.a_position, solidProgram.a_normal, solidProgram.u_mvpMat, solidProgram.u_normalMat, -0.5);
            //绘制单色立方体
            gl.drawElements(gl.TRIANGLES, 24, gl.UNSIGNED_SHORT, 0);
           
        });
    }
    image.src = "res/client/orange.jpg";
  
    //绘制立方体
    function drawCube(gl, program, localPos, localNormal, localMvpMat, localNormalMat, translateX) {
        //使用指定的程序对象program
        gl.useProgram(program);

        var vertices = new Float32Array([   // Vertex coordinates
            1.0, 1.0, 1.0,  -1.0, 1.0, 1.0,  -1.0,-1.0, 1.0,   1.0,-1.0, 1.0,    // v0-v1-v2-v3 front
            1.0, 1.0, 1.0,   1.0,-1.0, 1.0,   1.0,-1.0,-1.0,   1.0, 1.0,-1.0,    // v0-v3-v4-v5 right
            1.0, 1.0, 1.0,   1.0, 1.0,-1.0,  -1.0, 1.0,-1.0,  -1.0, 1.0, 1.0,    // v0-v5-v6-v1 up
           -1.0, 1.0, 1.0,  -1.0, 1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0,-1.0, 1.0,    // v1-v6-v7-v2 left
           -1.0,-1.0,-1.0,   1.0,-1.0,-1.0,   1.0,-1.0, 1.0,  -1.0,-1.0, 1.0,    // v7-v4-v3-v2 down
            1.0,-1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0, 1.0,-1.0,   1.0, 1.0,-1.0     // v4-v7-v6-v5 back
         ]);

         var indices = new Uint8Array([        // Indices of the vertices
            0, 1, 2,   0, 2, 3,    // front
            4, 5, 6,   4, 6, 7,    // right
            8, 9,10,   8,10,11,    // up
           12,13,14,  12,14,15,    // left
           16,17,18,  16,18,19,    // down
           20,21,22,  20,22,23     // back
         ]);

        // Create a buffer object
        var indexBuffer = gl.createBuffer();　 
        // Write date into the buffer object
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

        //将顶点坐标数据传递给localPos变量
        utils.dataToBuffer(gl, localPos, 3, new Float32Array(vertices), 0, 0);

        var normals = new Float32Array([
            0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, //y轴正方向——面ABCD
            0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, //z轴正方向——面AEHD
            1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, //x轴正方向——面DHGC
            0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, //z轴负方向——面CGFB
            -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, //x轴负方向——面BAEF
            0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0//y轴负方向——面EFGH
        ]);
         //将顶点法向量数据传递给localNormal变量
        utils.dataToBuffer(gl, localNormal, 3, normals, 0, 0);

        //将矩阵信息传递给localMvpMat变量 
        var proMat = new Matrix4();
        var viewMat = new Matrix4();
        var modelMat = new Matrix4();
        var mvpMat = new Matrix4();

        proMat.setPerspective(50.0, canvas.width / canvas.height, 1, 100);
        viewMat.setLookAt(0, 0, 2, 0, 0, -1, 0, 1, 0);
        modelMat.setTranslate(translateX, 0.0, 0.0);
        modelMat.rotate(45.0, 0.0, 1.0, 0.0);
        modelMat.scale(0.25, 0.25, 0.25);
        mvpMat.set(proMat).multiply(viewMat).multiply(modelMat);
        gl.uniformMatrix4fv(localMvpMat, false, mvpMat.elements);
    }
}

if(typeof module !== "undefined") {
    module.export = Example[Object.keys(Example)[0]];
}