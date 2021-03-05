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
    const SOLOID_VSHADER_SOURCE = `
        attribute vec4 a_position;
        attribute vec4 a_normal;
        uniform mat4 u_mvpMat;
        uniform mat4 u_normalMat;
        varying vec4 v_color;
        void main() {
            //设定照射光线方向
            vec3 lightDirection = vec3(0.0, 0.0, 1.0);
            //设定顶点颜色
            vec3 color = vec3(1.0, 0.0, 0.0);
            //将法向量做归一化处理
            vec3 normal = normalize(vec3(u_normalMat * a_normal));
            //计算法向量和照射光线方向的点积
            float nDotL = max(dot(normal, lightDirection), 0.0);
            //将反射光的颜色值赋值给v_color变量
            v_color = vec4(color * nDotL, 1.0);
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
            //设定灯光照射方向
            vec3 lightDirection = vec3(0.0, 0.0, 1.0);
            //将顶点位置赋值给gl_Position
            gl_Position = u_mvpMat * a_position;
            //将法向量进行归一化处理
            vec3 normal = normalize(vec3(u_normalMat * a_normal));
            //计算光线照射方向与法向量的点积
            v_nDotL = max(dot(lightDirection, normal), 0.0);
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
            gl_FragColor = vec4(vec3(color) * v_nDotL, color.a);
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
    
}

if(typeof module !== "undefined") {
    module.export = Example[Object.keys(Example)[0]];
}