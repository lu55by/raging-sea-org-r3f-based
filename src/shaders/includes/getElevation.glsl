uniform float uTime;

uniform vec2 uBigWavesFrequency;
uniform float uBigWavesSpeed;
uniform float uBigWavesStrength;

uniform float uSmallWavesFrequency;
uniform float uSmallWavesSpeed;
uniform float uSmallWavesStrength;
uniform float uSmallWavesIteration;

#include ./noises/cnoise3d.glsl

float getElevation(vec3 P) {
    float elev = sin(P.x * uBigWavesFrequency.x + uTime * uBigWavesSpeed) * sin(P.z * uBigWavesFrequency.y + uTime * uBigWavesSpeed) * uBigWavesStrength;
    for(float i = 1.; i <= uSmallWavesIteration; i++) {
        // elev -= (abs(cnoise3d(vec3((P.xz + 2.) * uSmallWavesFrequency, uTime * uSmallWavesSpeed))) * uSmallWavesStrength) / i;
        elev -= abs(cnoise3d(vec3(P.xz * uSmallWavesFrequency * i, uTime * uSmallWavesSpeed)) * uSmallWavesStrength / i);
    }
    return elev;
}
