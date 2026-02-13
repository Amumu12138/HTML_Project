
#ifdef GL_ES
#ifdef GL_FRAGMENT_PRESICION_HIGH
    precision highp float;
#else 
    precision mediump float;
#endif
#endif

uniform sampler2D u_sampler;
varying vec2 v_texCoord;
void main() {
    gl_FragColor = texture2D(u_sampler, v_texCoord);
    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}