#ifdef FSHIGHPRECISION 
precision highp float; 
#else 
precision mediump float; 
#endif 
uniform vec4 u_OutlineColor; 
uniform float u_OutlineLightness; 

void main() 
{ 
vec3 finalColor = u_OutlineColor.rgb * u_OutlineLightness; 

gl_FragColor = vec4(finalColor,0.0); 
}