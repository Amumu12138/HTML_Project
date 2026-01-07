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