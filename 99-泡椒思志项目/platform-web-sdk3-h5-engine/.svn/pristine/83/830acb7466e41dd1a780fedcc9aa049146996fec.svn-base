#include "Lighting.glsl";
attribute vec4 a_Position;
attribute vec2 a_TexCoord; 
varying vec2 v_TexCoord;
uniform mat4 mx; 
uniform mat4 my;
void main(){
    gl_Position = mx * my * a_Position;
    v_TexCoord = a_TexCoord;
}