var utils = utils || {};

/**
 * @desc 将数据传递给缓冲区对象
 * @param {*} gl 
 * @param {*} location 
 * @param {*} count 
 * @param {*} array 
 * @param {*} stride 
 * @param {*} offset 
 */
utils.dataToBuffer = function(gl, location, count, array, stride, offset) {
    if(!gl) return;
    if(location == null || location == undefined || location < 0) return;
    if(count <= 0 ) return;
    if(!array || array.length <= 0) return;

    //创建缓冲区对象
    var buffer = gl.createBuffer();
    //绑定缓冲区对象
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    //将数据导入缓冲区对象
    gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
    //将缓冲区对象分配给一个attribute修饰的变量
    gl.vertexAttribPointer(location, count, gl.FLOAT, false, stride, offset);
    //开启attribute修饰的变量
    gl.enableVertexAttribArray(location);
}

/**
 * @desc 将数据和相关类型传递给缓冲区对象
 * @param {*} gl 
 * @param {*} location 
 * @param {*} count 
 * @param {*} type
 * @param {*} array 
 * @param {*} stride 
 * @param {*} offset 
 */
utils.dataAndTypeToBuffer = function(gl, location, count, type, array, stride, offset) {
    if(!gl) return;
    if(location == null || location == undefined || location < 0) return;
    if(count <= 0 ) return;
    if(!array || array.length <= 0) return;

    //创建缓冲区对象
    var buffer = gl.createBuffer();
    //绑定缓冲区对象
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    //将数组元素传递给缓冲区
    gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
    //将缓冲区对象分配给变量
    gl.vertexAttribPointer(location, count, type, false, stride, offset);
    //开启本地变量
    gl.enableVertexAttribArray(location);
}

/**
 * @desc 加载纹理图像数据
 * @param {*} gl 
 * @param {*} location 
 * @param {*} texUnit 
 * @param {*} image 
 * @param {*} number 
 * @param {*} callback 
 */
utils.loadTexture = function(gl, location, texUnit, image, number, callback) {
    if(!gl) return;
    if(location == null || location == undefined || location < 0) return;

    //创建纹理对象
    var texture = gl.createTexture();
    //Y轴翻转
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    //开启纹理单元
    gl.activeTexture(texUnit);
    //绑定纹理对象
    gl.bindTexture(gl.TEXTURE_2D, texture);
    //配置纹理参数
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    //配置纹理图像
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    //根据纹理单元编号传递给取样器
    gl.uniform1i(location, number);

    if(callback) callback();
}

/**
 * @desc 绘制
 * @param {*} gl 
 * @param {*} mode 
 * @param {*} start 
 * @param {*} count 
 */
utils.draw = function(gl, mode, start, count) {
    if(!gl) return;
    if(count <= 0) return;

    //clear canvas 
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //draw
    gl.drawArrays(mode, start, count);
}

/**
 * @desc 根据数组元素绘制
 * @param {*} gl 
 * @param {*} mode 
 * @param {*} length 
 * @param {*} type 
 * @param {*} start 
 */
utils.drawElements = function(gl, mode, length, type, start) {
    if(!gl) return;
    if(count <= 0) return;

    //清理画布
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //根据数组元素绘制图形
    gl.drawElements(mode, length, type, start);
}

/**
 * @desc 初始化着色器
 * @param {*} gl 
 * @param {*} vertexSource 
 * @param {*} fragmentSource 
 */
utils.initShaders = function(gl, vertexSource, fragmentSource) {
    //创建着色器对象
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    //向着色器对象中填充着色器程序的源代码
    gl.shaderSource(vertexShader, vertexSource);
    gl.shaderSource(fragmentShader, fragmentSource);
    //编译着色器
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);
    //创建程序对象
    var program = gl.createProgram();
    //为程序对象分配着色器
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    //连接程序对象
    gl.linkProgram(program);
    //使用程序对象
    gl.useProgram(program);
    gl.program = program;

    return true;
}

window.utils = utils;