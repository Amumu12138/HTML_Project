#include "Lighting.glsl";
attribute vec4 a_Position; 
attribute vec2 a_Texcoord; 
attribute vec3 a_Normal;

uniform mat4 u_MvpMatrix; 
uniform mat4 u_WorldMat; 
    
varying vec3 v_Normal; 
varying vec2 v_Texcoord; 

void main() 
{ 
    mat3 worldMat = mat3(u_WorldMat); 
    v_Normal = worldMat * a_Normal; 
    v_Texcoord = a_Texcoord; 
    
    gl_Position = u_MvpMatrix * a_Position;
    gl_Position = remapGLPositionZ(gl_Position);
}