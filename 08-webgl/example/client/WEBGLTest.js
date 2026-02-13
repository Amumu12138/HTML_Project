var Example = Example || {};

/**
 * @desc WebGL示例
 */
Example.WEBGLTest = function () {
    //获取<canvas>元素
   var canvas = document.getElementById("webgl");
   var gl = getWebGLContext(canvas);
    // var gl = canvas.getContext("webgl");
   if(!gl) {
       console.error("Failed to retrieve this <canvas> element");
       return;
   }
   //获取绘制二维图形的绘图上下文
//    var ctx = canvas.getContext("2d");
//    //绘制红色矩形
//    ctx.fillStyle = 'rgba(255, 0, 0, 1.0)';
//    ctx.fillRect(100, 100, 150, 150);
//    ctx.fillText("WEBGL-TEST", 150, 75);

   //清理画布
   gl.clearColor(0.0, 0.0, 0.0, 1.0);
   gl.clear(gl.COLOR_BUFFER_BIT);
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}