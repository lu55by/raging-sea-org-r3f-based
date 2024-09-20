varying float vElevation;
varying vec3 vNormal;
varying vec3 vPosition;

#include ../includes/getElevation.glsl

void main() {
    // csm_Position.z += getElevation(csm_Position, 4., .5);

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    modelPosition.y += getElevation(modelPosition.xyz);

    // Compute the normal
    float shift = .1;
    vec3 posA = modelPosition.xyz + vec3(shift, 0., 0.);
    vec3 posB = modelPosition.xyz + vec3(0., 0., -shift);
    posA.y += getElevation(posA);
    posB.y += getElevation(posB);
    vec3 toA = normalize(posA - modelPosition.xyz);
    vec3 toB = normalize(posB - modelPosition.xyz);
    vec3 computedNormal = normalize(cross(toA, toB));

    // varyings
    // vNormal = (modelMatrix * vec4(normal, 0.)).xyz;
    vElevation = modelPosition.y;
    vNormal = computedNormal;
    vPosition = modelPosition.xyz;

    // Final Position
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}
