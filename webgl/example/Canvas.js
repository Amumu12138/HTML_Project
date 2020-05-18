var Example = Example || {};

/**
 * @desc Canvas画布
 */
Example.Canvas = function () {
    // //获取Canvas对象
    var canvas = document.getElementById('webgl');
    //通过方法getContext()获取Canvas 2D绘图上下文
    var canvas2d = canvas.getContext('2d');
    //直线起点坐标
    canvas2d.moveTo(0, 0);
    //直线第二个坐标
    canvas2d.lineTo(50, 50);
    //直线第三个坐标
    canvas2d.lineTo(0, 100);
    //把点连成直线绘制出来
    canvas2d.stroke();

    // //通过方法getContext() 获取WebGL上下文
    // //var gl = canvas.getContext('3d');

    // //调用WebGL API绘制渲染方法drawArrays
    // //canvas.drawArrays(canvas.POINTS, 0, 1);


};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}