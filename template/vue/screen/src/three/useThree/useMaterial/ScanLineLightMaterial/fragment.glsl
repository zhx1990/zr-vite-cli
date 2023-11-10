varying vec2 vUv;
uniform float iTime;

#define GOLDEN_RATIO (1.61803398874989484820)
#define GOLDEN_RATIO_MIN_ONE (GOLDEN_RATIO - 1.0)
#define GOOD_COLOR (vec3(0.8, 0.2, 1.0))
#define LINE (0.01666f)

void main() {
    vec2 uv = vUv;
    float t_second = fract(iTime);
    float x_spark = 1.0 - ((uv.y - abs(uv.y - t_second) / mod(t_second, (GOLDEN_RATIO_MIN_ONE * 0.1 * t_second) / (GOLDEN_RATIO_MIN_ONE * t_second))) * 0.5 + 0.5);
    float y_scanline = smoothstep(0.0, 0.666, abs(uv.y - t_second));
    float scanline = LINE / ((LINE * 0.666) + (x_spark * 0.0666) + y_scanline * GOLDEN_RATIO_MIN_ONE);
    gl_FragColor = vec4(vec3(0.5, 0.5, 1.0) * GOOD_COLOR * scanline, 1.0);
}