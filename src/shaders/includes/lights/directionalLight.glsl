vec3 directionalLight(vec3 lightColor, float intensity, vec3 position, vec3 normal, vec3 viewDirection, float specularPower) {
    vec3 lightDirection = normalize(position);
    float shading = max(dot(lightDirection, normal), 0.);
    float specular = pow(max(dot(reflect(-lightDirection, normal), -viewDirection), 0.), specularPower);
    return lightColor * intensity * (shading + specular);
}