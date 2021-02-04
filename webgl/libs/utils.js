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

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
    gl.vertexAttribPointer(location, count, gl.FLOAT, false, stride, offset);
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

    var texture = gl.createTexture();
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.activeTexture(texUnit);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
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

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(mode, start, count);
}

window.utils = utils;