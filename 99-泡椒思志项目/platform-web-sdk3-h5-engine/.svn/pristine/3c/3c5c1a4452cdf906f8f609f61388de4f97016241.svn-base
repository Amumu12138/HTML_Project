#ifdef FSHIGHPRECISION 
precision highp float;
#else
precision mediump float;
#endif
varying vec2 v_Texcoord;
varying vec3 v_Normal;

uniform sampler2D u_AlbedoTexture;

void main()
{
    gl_FragColor = texture2D(u_AlbedoTexture, v_Texcoord);
}