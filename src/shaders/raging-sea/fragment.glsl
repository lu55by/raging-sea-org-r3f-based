uniform float uTime;

uniform vec3 uDirectionalLightColor;
uniform float uDirectionalLightIntensity;
uniform float uSpecularPower;

uniform float uElevationOffset;
uniform float uElevationMultiplier;
uniform vec3 uSurfaceColor;
uniform vec3 uDeepColor;

varying float vElevation;
varying vec3 vNormal;
varying vec3 vPosition;

#include ../includes/lights/ambientLight.glsl
#include ../includes/lights/directionalLight.glsl

void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDirection = normalize(vPosition - cameraPosition);

    float elevation = vElevation;
    elevation = (elevation + uElevationOffset) * uElevationMultiplier;
    vec3 col = mix(uDeepColor, uSurfaceColor, elevation);
    // vec3 col = vec3(1.);

    vec3 light = vec3(0.);
    // light += ambientLight(vec3(1.), 1.);
    light += directionalLight(uDirectionalLightColor, uDirectionalLightIntensity, vec3(0., 1., 0.), normal, viewDirection, uSpecularPower);

    col *= light;

    // csm_FragColor = vec4(col, 1.0);
    gl_FragColor = vec4(col, 1.);
}