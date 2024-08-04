#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

void main() {
    vec2 n_mouse = u_mouse / u_resolution;
	gl_FragColor = vec4(n_mouse.x,0.0,n_mouse.y,1.0);
}
