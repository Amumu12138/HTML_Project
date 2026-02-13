var Example = Example || {};

/**
 * @desc 多关节层级模型
 */
Example.MultiJointModel = function() {
    const ARM_LENGTH = 0.55 ;     //底部盒状高度
    const ADD_POS_X = 0.1;      //平移距离
    var newPosX = 0.0;          //当前平移位置
    var g_modelMatrix = new Matrix4();  //全局模型矩阵
    var g_mvpMat = new Matrix4();   //全局矩阵
    var g_jointAngle = 0.0;
    var g_armAngle = 0.0;

    //获取canvas和gl对象
    var canvas = document.getElementById("webgl");
    var gl = getWebGLContext(canvas);

    //顶点着色器程序
    const VSDHADER_SOURCE = `
        attribute vec4 a_position;
        attribute vec4 a_normal;
        attribute vec4 a_color;
        uniform mat4 u_mvpMat;
        uniform vec3 u_lightColor;
        uniform vec3 u_lightDirection;
        uniform vec3 u_ambientColor;
        varying vec4 v_color;
        void main() {
            gl_Position = u_mvpMat * a_position;
            //对法向量进行归一化
            vec3 normal = normalize(vec3(a_normal));
            //对光线方向和法向量做点积运算
            float nDotL = max(dot(u_lightDirection, normal), 0.0);
            //计算漫反射光的颜色值
            vec3 diffuse = u_lightColor * vec3(a_color) * nDotL;
            //将漫反射光和环境光合成的颜色值赋值给v_color变量
            v_color = vec4(diffuse + u_ambientColor, a_color.a);
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
            gl_FragColor = v_color;
        }
    `;

    //初始化着色器程序
    initShaders(gl, VSDHADER_SOURCE, FSAHDER_SOURCE);

    //获取着色器程序中的变量
    var a_position = gl.getAttribLocation(gl.program, "a_position");
    var a_color = gl.getAttribLocation(gl.program, "a_color");
    var a_normal = gl.getAttribLocation(gl.program, "a_normal");
    var u_mvpMat = gl.getUniformLocation(gl.program, "u_mvpMat");
    var u_lightColor = gl.getUniformLocation(gl.program, "u_lightColor");
    var u_lightDirection = gl.getUniformLocation(gl.program, "u_lightDirection");
    var u_ambientColor = gl.getUniformLocation(gl.program, "u_ambientColor");

    /** 将数据传递给变量 */
    //将顶点数据传递给a_position变量
    var vertices = new Float32Array([
        //面ABCD
        -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 
        -0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 
        //面AEHD
        -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 
        -0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5,
        //面DHGC
        0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5,
        0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5,
        //面CGFB
        0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5,
        0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5,
        //面BAEF
         -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5,
         -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5,
        //面EFGH
        -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5,
        -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5
    ]);
    // utils.dataToBuffer = function(gl, location, count, array, stride, offset) {
    utils.dataToBuffer(gl, a_position, 3, vertices, 0, 0);

    //将颜色数据传递给a_color变量
    gl.vertexAttrib4fv(a_color, new Float32Array([1.0, 1.0, 1.0, 1.0]));

    //法向量数组
    var noramls = new Float32Array([
        0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, //y轴正方向——面ABCD
        0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, //z轴正方向——面AEHD
        1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, //x轴正方向——面DHGC
        0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, //z轴负方向——面CGFB
        -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, //x轴负方向——面BAEF
        0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0//y轴负方向——面EFGH
    ]);
    utils.dataToBuffer(gl, a_normal, 3, noramls, 0, 0);

    //将平行光颜色值传递给u_lightColor变量
    gl.uniform3fv(u_lightColor, new Float32Array([1.0, 1.0, 1.0]));
    //将平行光方向传递给u_lightDirection变量
    var lightDirection = new Vector3([3.0, 4.0, 5.0]);
    lightDirection.normalize();
    gl.uniform3fv(u_lightDirection, lightDirection.elements);
    //将环境光颜色值传递给u_ambientColor变量
    gl.uniform3fv(u_ambientColor, new Float32Array([0.2, 0.2, 0.2]));

    //将数据传递给u_mvpMat变量
    var proMat = new Matrix4();     //透视矩阵
    var viewMat = new Matrix4();    //视图矩阵
    var modelMat = new Matrix4();   //模型矩阵
    var mvpMat = new Matrix4();     //最终矩阵

    proMat.setPerspective(60, canvas.width / canvas.height, 1, 100);
    viewMat.setLookAt(0, 0, 2, 0, 0, -1, 0, 1, 0);
    // modelMat.setRotate(60, 0, 0, 1);
    // modelMat.setRotate(0, 0, 1, 0);
    modelMat.scale(0.6, 0.6, 0.6);
    mvpMat.set(proMat).multiply(viewMat).multiply(modelMat);    //注意顺序不能弄混
    //gl.uniformMatrix4fv(u_mvpMat, false, mvpMat.elements);

    //上方盒状模型矩阵
    var modelMat02 = new Matrix4();   //模型矩阵
    // modelMat02.setTranslate(0.0, 0.5, 0.0);
    // modelMat02.scale(0.5, 0.5, 0.5);

    draw(u_mvpMat, mvpMat, modelMat02);

    //绘制
    function draw(location, mat1, mat2) {
        //清理画布
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
        gl.enable(gl.DEPTH_TEST);
        //绘制图形
        g_modelMatrix.setTranslate(0.0, 0.0, 0.0);
        g_modelMatrix.rotate(g_armAngle, 0.0, 1.0, 0.0);
        drawBox(location, mat1);

        g_modelMatrix.translate(0.0, ARM_LENGTH, 0.0);
        g_modelMatrix.rotate(g_jointAngle, 0.0, 1.0, 0.0);
        g_modelMatrix.scale(0.5, 0.5, 0.5);
        drawBox(location, mat2);
    }
    
    //绘制盒状模型
    function drawBox(location, mat) {
       // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        g_mvpMat.set(mat);
        g_mvpMat.multiply(g_modelMatrix);
        gl.uniformMatrix4fv(location, false, g_mvpMat.elements);
        gl.drawArrays(gl.TRIANGLES, 0, 36);
    }

    //注册按键监听事件
    document.onkeydown = (ev) => {
        keydown(ev);
    }

    //按键按下响应事件
    function keydown(ev) {
        switch(ev.keyCode) {
            case 38:    //上方向键
            //  if (g_armAngle < 135.0) g_armAngle += 1.0;   
                g_armAngle += 3.0;
                break;
            case 40:    //下方向键
                g_armAngle -= 3.0;
                break;
            case 37:    //右方向键 
                g_jointAngle += 3.0;
                break;
            case 39:    //左方向键 
                g_jointAngle -= 3.0;
                break;
            default:
                break;
        }

        draw(u_mvpMat, mvpMat, modelMat02);
    }
}

if(typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}