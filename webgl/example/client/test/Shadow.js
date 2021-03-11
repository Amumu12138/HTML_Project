var Example = Example || {};

/**
 * @desc 绘制阴影(采用阴影贴图实现物体在光照下向背光处投下影子的现象)
 */
Example.Shadow = function() {
    //获取canvas和gl对象
    var canvas = document.getElementById("webgl");
    var gl = getWebGLContext(canvas);

    //阴影区域顶点着色器程序
    const SHADOW_VSHADER_SOURCE = ``;
    //阴影区域片元着色器程序
    const SHADOW_FSHADER_SOURCE = ``;

    //阴影贴图顶点着色器程序
    const VSHADER_SOURCE = ``;
    //阴影贴图片元着色器程序
    const FSHADER_SOURCE = ``;
}

if(typeof module !== "undefined") {
    module.export = Example[Object.keys(Example)[0]];
}