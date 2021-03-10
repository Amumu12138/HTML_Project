var Example = Example || {};

/**
 * @desc 实现渲染到纹理(使用WebGL渲染三维图形,然后将渲染结果作为纹理贴到另一个三维物体上去)
 */
Example.FramebufferObject = function() {
    const OFFSCREEN_WIDTH = 256;
    const OFFSCREEN_HEIGHT = 256;
    // Coordinate transformation matrix
    var g_modelMatrix = new Matrix4();
    var g_mvpMatrix = new Matrix4();

    const ANGLE_STEP = 30;   // The increments of rotation angle (degrees)
    var last = Date.now(); // Last time that this function was called

    //获取canvas和gl对象
    var canvas = document.getElementById("webgl");
    var gl = getWebGLContext(canvas);

    //顶点着色器程序
    const VSHADER_SOURCE = `
        attribute vec4 a_position;
        attribute vec2 a_texCoord;
        uniform mat4 u_mvpMat;
        varying vec2 v_texCoord;
        void main() {
            gl_Position = u_mvpMat * a_position;
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
            vec4 texture = texture2D(u_sampler, v_texCoord);
            gl_FragColor = texture;
        }
    `;

    //初始化着色器程序
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
    //获取着色器程序中的变量
    var program = gl.program; // Get program object
    program.a_position = gl.getAttribLocation(program, 'a_position');
    program.a_texCoord = gl.getAttribLocation(program, 'a_texCoord');
    program.u_mvpMat = gl.getUniformLocation(program, 'u_mvpMat');
    var u_sampler = gl.getUniformLocation(gl.program, "u_sampler");

    /** 将数据信息传递给变量 */
    var cube = initVertexBuffersForCube(gl);
    var plane = initVertexBuffersForPlane(gl);

    var texture = initTextures(gl);
    var fbo = initFramebufferObject(gl);

    //Enable depath test 开启深度测试
    gl.enable(gl.DEPTH_TEST);
    //将视图矩阵信息传递给颜色缓冲区
    var viewProMat = new Matrix4();
    viewProMat.setPerspective(30.0, canvas.width / canvas.height, 1.0, 100.0);
    viewProMat.lookAt(0.0, 0.0, 7.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);

    //将视图矩阵信息传递给fbo
    var viewProMatFBO = new Matrix4();
    viewProMatFBO.setPerspective(30.0, OFFSCREEN_WIDTH / OFFSCREEN_HEIGHT, 1.0, 100.0);
    viewProMatFBO.lookAt(0.0, 2.0, 7.0,  0.0, 0.0, 0.0,  0.0, 1.0, 0.0);

    var currentAngle = 0.0;
    var tick = function() {
        currentAngle = animate(currentAngle);  // Update current rotation angle
        draw(gl, canvas, fbo, plane, cube, currentAngle, texture, viewProMat, viewProMatFBO);
        window.requestAnimationFrame(tick, canvas);
    };
    tick();
    //绘制图形
    // draw(gl, canvas, fbo, plane, cube, 10.0, texture, viewProMat, viewProMatFBO);

    function animate(angle) {
        var now = Date.now();   // Calculate the elapsed time
        var elapsed = now - last;
        last = now;
        // Update the current rotation angle (adjusted by the elapsed time)
        var newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0;
        return newAngle % 360;
    }

    //初始化纹理图片
    function initTextures(gl) {
        var image = new Image();
        image.onload = function() {
            var texture= gl.createTexture();
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            gl.uniform1i(u_sampler, 0);
            gl.bindTexture(gl.TEXTURE_2D, null); 
        }
        image.src = "res/client/sky_cloud.jpg";
   
        return texture;
    }

    //初始化帧缓冲区
    function initFramebufferObject(gl) {
        var framebuffer, texture, depthBuffer;

        var error = function() {
            if (framebuffer) gl.deleteFramebuffer(framebuffer);
            if (texture) gl.deleteTexture(texture);
            if (depthBuffer) gl.deleteRenderbuffer(depthBuffer);
            return null;
        }

        //Create a frame buffer object 创建一个帧缓冲区
        framebuffer = gl.createFramebuffer();
        if (!framebuffer) {
            console.log('Failed to create frame buffer object');
            return error();
          }
        //Create a texture object and set its size and parameters 创建一个纹理对象
        texture = gl.createTexture();
        if (!texture) {
            console.log('Failed to create texture object');
            return error();
          }
        //Bind the object to target 绑定纹理对象并设置其尺寸和参数
        gl.bindTexture(gl.TEXTURE_2D, texture); // Bind the object to target
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        framebuffer.texture = texture; 

        //Create a renderbuffer object and Set its and parameters 创建一个渲染缓冲区对象
        depthBuffer = gl.createRenderbuffer();
        //绑定渲染缓冲区对象并设置其尺寸
        gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer); // Bind the object to target
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT);

        //Attach the texture and the renderbuffer object to FBO 将纹理和渲染缓冲区对象关联到帧缓冲区对象上
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);


        //Check if FBO is configured correctly 检查帧缓冲区是否正确配置
        var e = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
        if (gl.FRAMEBUFFER_COMPLETE !== e) {
            console.log('Frame buffer object is incomplete: ' + e.toString());
            return error();
          }

        // Unbind the buffer object 解绑缓冲区对象
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        return framebuffer;
    }

    function initVertexBuffersForCube(gl) {
        // Create a cube
        //    v6----- v5
        //   /|      /|
        //  v1------v0|
        //  | |     | |
        //  | |v7---|-|v4
        //  |/      |/
        //  v2------v3
      
        // Vertex coordinates
        var vertices = new Float32Array([
           1.0, 1.0, 1.0,  -1.0, 1.0, 1.0,  -1.0,-1.0, 1.0,   1.0,-1.0, 1.0,    // v0-v1-v2-v3 front
           1.0, 1.0, 1.0,   1.0,-1.0, 1.0,   1.0,-1.0,-1.0,   1.0, 1.0,-1.0,    // v0-v3-v4-v5 right
           1.0, 1.0, 1.0,   1.0, 1.0,-1.0,  -1.0, 1.0,-1.0,  -1.0, 1.0, 1.0,    // v0-v5-v6-v1 up
          -1.0, 1.0, 1.0,  -1.0, 1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0,-1.0, 1.0,    // v1-v6-v7-v2 left
          -1.0,-1.0,-1.0,   1.0,-1.0,-1.0,   1.0,-1.0, 1.0,  -1.0,-1.0, 1.0,    // v7-v4-v3-v2 down
           1.0,-1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0, 1.0,-1.0,   1.0, 1.0,-1.0     // v4-v7-v6-v5 back
        ]);
      
        // Texture coordinates
        var texCoords = new Float32Array([
            1.0, 1.0,   0.0, 1.0,   0.0, 0.0,   1.0, 0.0,    // v0-v1-v2-v3 front
            0.0, 1.0,   0.0, 0.0,   1.0, 0.0,   1.0, 1.0,    // v0-v3-v4-v5 right
            1.0, 0.0,   1.0, 1.0,   0.0, 1.0,   0.0, 0.0,    // v0-v5-v6-v1 up
            1.0, 1.0,   0.0, 1.0,   0.0, 0.0,   1.0, 0.0,    // v1-v6-v7-v2 left
            0.0, 0.0,   1.0, 0.0,   1.0, 1.0,   0.0, 1.0,    // v7-v4-v3-v2 down
            0.0, 0.0,   1.0, 0.0,   1.0, 1.0,   0.0, 1.0     // v4-v7-v6-v5 back
        ]);
      
        // Indices of the vertices
        var indices = new Uint8Array([
           0, 1, 2,   0, 2, 3,    // front
           4, 5, 6,   4, 6, 7,    // right
           8, 9,10,   8,10,11,    // up
          12,13,14,  12,14,15,    // left
          16,17,18,  16,18,19,    // down
          20,21,22,  20,22,23     // back
        ])
      
        var o = new Object();  // Create the "Object" object to return multiple objects.
      
        // Write vertex information to buffer object
        o.vertexBuffer = initArrayBufferForLaterUse(gl, vertices, 3, gl.FLOAT);
        o.texCoordBuffer = initArrayBufferForLaterUse(gl, texCoords, 2, gl.FLOAT);
        o.indexBuffer = initElementArrayBufferForLaterUse(gl, indices, gl.UNSIGNED_BYTE);
        if (!o.vertexBuffer || !o.texCoordBuffer || !o.indexBuffer) return null; 
      
        o.numIndices = indices.length;
      
        // Unbind the buffer object
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      
        return o;
      }
      
      function initVertexBuffersForPlane(gl) {
        // Create face
        //  v1------v0
        //  |        | 
        //  |        |
        //  |        |
        //  v2------v3
      
        // Vertex coordinates
        var vertices = new Float32Array([
          1.0, 1.0, 0.0,  -1.0, 1.0, 0.0,  -1.0,-1.0, 0.0,   1.0,-1.0, 0.0    // v0-v1-v2-v3
        ]);
      
        // Texture coordinates
        var texCoords = new Float32Array([1.0, 1.0,   0.0, 1.0,   0.0, 0.0,   1.0, 0.0]);
      
        // Indices of the vertices
        var indices = new Uint8Array([0, 1, 2,   0, 2, 3]);
      
        var o = new Object(); // Create the "Object" object to return multiple objects.
      
        // Write vertex information to buffer object
        o.vertexBuffer = initArrayBufferForLaterUse(gl, vertices, 3, gl.FLOAT);
        o.texCoordBuffer = initArrayBufferForLaterUse(gl, texCoords, 2, gl.FLOAT);
        o.indexBuffer = initElementArrayBufferForLaterUse(gl, indices, gl.UNSIGNED_BYTE);
        if (!o.vertexBuffer || !o.texCoordBuffer || !o.indexBuffer) return null; 
      
        o.numIndices = indices.length;
      
        // Unbind the buffer object
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      
        return o;
      }

      function initArrayBufferForLaterUse(gl, data, num, type) {
        // Create a buffer object
        var buffer = gl.createBuffer();
        if (!buffer) {
          console.log('Failed to create the buffer object');
          return null;
        }
        // Write date into the buffer object
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      
        // Store the necessary information to assign the object to the attribute variable later
        buffer.num = num;
        buffer.type = type;
      
        return buffer;
      }

      function initElementArrayBufferForLaterUse(gl, data, type) {
        // Create a buffer object
        var buffer = gl.createBuffer();
        if (!buffer) {
          console.log('Failed to create the buffer object');
          return null;
        }
        // Write date into the buffer object
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
      
        buffer.type = type;
      
        return buffer;
      }

      function draw(gl, canvas, fbo, plane, cube, angle, texture, viewProjMatrix, viewProjMatrixFBO) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);              // Change the drawing destination to FBO
        gl.viewport(0, 0, OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT); // Set a viewport for FBO
      
        gl.clearColor(0.2, 0.2, 0.4, 1.0); // Set clear color (the color is slightly changed)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);  // Clear FBO
      
        drawTexturedCube(gl, gl.program, cube, angle, texture, viewProjMatrixFBO);   // Draw the cube
      
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);        // Change the drawing destination to color buffer
        gl.viewport(0, 0, canvas.width, canvas.height);  // Set the size of viewport back to that of <canvas>
      
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Clear the color buffer
      
        drawTexturedPlane(gl, gl.program, plane, angle, fbo.texture, viewProjMatrix);  // Draw the plane
      }
      
      function drawTexturedCube(gl, program, o, angle, texture, viewProjMatrix) {
        // Calculate a model matrix
        g_modelMatrix.setRotate(20.0, 1.0, 0.0, 0.0);
        g_modelMatrix.rotate(angle, 0.0, 1.0, 0.0);
      
        // Calculate the model view project matrix and pass it to u_MvpMatrix
        g_mvpMatrix.set(viewProjMatrix);
        g_mvpMatrix.multiply(g_modelMatrix);
        gl.uniformMatrix4fv(program.u_mvpMat, false, g_mvpMatrix.elements);
      
        drawTexturedObject(gl, program, o, texture);
      }
      
      function drawTexturedPlane(gl, program, o, angle, texture, viewProjMatrix) {
        // Calculate a model matrix
        g_modelMatrix.setTranslate(0, 0, 1);
        g_modelMatrix.rotate(20.0, 1.0, 0.0, 0.0);
        g_modelMatrix.rotate(angle, 0.0, 1.0, 0.0);
      
        // Calculate the model view project matrix and pass it to u_MvpMatrix
        g_mvpMatrix.set(viewProjMatrix);
        g_mvpMatrix.multiply(g_modelMatrix);
        gl.uniformMatrix4fv(program.u_mvpMat, false, g_mvpMatrix.elements);
      
        drawTexturedObject(gl, program, o, texture);
      }
      
      function drawTexturedObject(gl, program, o, texture) {
        // Assign the buffer objects and enable the assignment
        initAttributeVariable(gl, program.a_position, o.vertexBuffer);    // Vertex coordinates
        initAttributeVariable(gl, program.a_texCoord, o.texCoordBuffer);  // Texture coordinates
      
        // Bind the texture object to the target
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
      
        // Draw
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, o.indexBuffer);
        gl.drawElements(gl.TRIANGLES, o.numIndices, o.indexBuffer.type, 0);
      }
      
      // Assign the buffer objects and enable the assignment
      function initAttributeVariable(gl, a_attribute, buffer) {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.vertexAttribPointer(a_attribute, buffer.num, buffer.type, false, 0, 0);
        gl.enableVertexAttribArray(a_attribute);
      }      
}

if(typeof module !== "undefined") {
    module.export = Example[Object.keys(Example)[0]];
}