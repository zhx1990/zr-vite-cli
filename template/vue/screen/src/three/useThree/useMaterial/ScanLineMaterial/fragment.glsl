varying vec2 vUv;
uniform float iTime;
uniform sampler2D iChannel0;

void main() {
    vec2 uv = vUv;
    float y = mod(-iTime / 4., 1.9) - 0.4;
    float str = -pow((uv.y - y) * 110., 2.) + .8;
    uv.x -= clamp(str * .01, 0., 1.);
    vec4 color = texture2D(iChannel0, uv);
        // vec4 color = vec4(0.0, 0.0, uv);
    float colorAdd = pow(1. - pow(abs(uv.y - y), .3), 3.);
    color.g += colorAdd * .5;
    color.b += colorAdd * 1.;
    gl_FragColor = color;
}