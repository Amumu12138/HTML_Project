precision highp float;
// 接收插值后的纹理坐标
varying vec2 v_TexCoord;
// 纹理图片像素数据
uniform sampler2D u_Sampler;
void main(){
//采集纹素
    vec4 texture = texture2D(u_Sampler, v_TexCoord);
//计算RGB三个分量光能量之和,也就是亮度
    float luminance = 0.299 * texture.r + 0.578 * texture.g + 0.114 * texture.b;
// float luminance = 0.2 * texture.r + 0.1 * texture.g + 0.1 * texture.b;
// 逐片元赋值像素值,RGB相同均为亮度值,用黑白两色表达图片的明暗变化
    gl_FragColor = vec4(luminance, luminance, luminance, 1.0);
}


precision mediump float;
varying vec2 v_texcoord;
varying vec4 v_color;
uniform sampler2D texture;
uniform sampler2D u_NoiseTex;
//消融阈值  0 - 1
uniform float u_DissolveThreshold;

varying vec4 v_texcoordAlpha;

void main(){
    vec4 noiseTexValue = texture2D(u_NoiseTex, v_texcoordAlpha.xy);
    if (noiseTexValue.r < u_DissolveThreshold)
    {
        discard;
    }
    
    gl_FragColor = texture2D(texture, v_texcoordAlpha.xy);
}