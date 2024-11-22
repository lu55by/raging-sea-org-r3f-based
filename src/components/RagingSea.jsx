import {
  Color,
  DoubleSide,
  MeshBasicMaterial,
  MeshStandardMaterial,
  SRGBColorSpace,
  Vector2,
} from "three";
import ThreeCustomShaderMaterial from "three-custom-shader-material";
import ragingSeaVertex from "../shaders/raging-sea/vertex.glsl";
import ragingSeaFragment from "../shaders/raging-sea/fragment.glsl";
import { folder, useControls } from "leva";
import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";

const uniforms = {
  uTime: 0,

  uBigWavesFrequency: new Vector2(3, 1),
  uBigWavesSpeed: 1.25,
  uBigWavesStrength: 0.15,

  uSmallWavesFrequency: 2,
  uSmallWavesSpeed: 0.3,
  uSmallWavesStrength: 0.18,
  uSmallWavesIteration: 3,

  uSurfaceColor: new Color("#271442"),
  uDeepColor: new Color("#ff0a81"),
  uElevationOffset: 1,
  uElevationMultiplier: 1,

  // Directional Light
  uDirectionalLightColor: new Color("#fff"),
  uDirectionalLightIntensity: 2,
  uSpecularPower: 36,
};

const RagingSeaShaderMaterial = shaderMaterial(
  uniforms,
  ragingSeaVertex,
  ragingSeaFragment,
  (mat) => {
    mat.transparent = true;
  }
);

extend({ RagingSeaShaderMaterial });

export default function RagingSea() {
  const matRef = useRef();
  const { pos, rot } = useControls("Debug", {
    Plane: folder({
      Transform: folder({
        pos: {
          label: "Position",
          value: { x: 0, y: 0, z: 0 },
          min: -3,
          max: 3,
          step: 0.01,
          joystick: "invertY",
        },
        rot: {
          label: "Rotation",
          value: { x: -Math.PI * 0.5, y: 0, z: 0 },
          min: -Math.PI * 2,
          max: Math.PI * 2,
          step: 0.01,
          joystick: "invertY",
        },
      }),
      Uniforms: folder({
        Plane_Colors: folder({
          surfaceColor: {
            label: "Surface Color",
            value: "#".concat(
              uniforms.uSurfaceColor.getHexString(SRGBColorSpace)
            ),
            onChange: (v) => matRef.current.uniforms.uSurfaceColor.value.set(v),
          },
          deepColor: {
            label: "Deep Color",
            value: "#".concat(uniforms.uDeepColor.getHexString(SRGBColorSpace)),
            onChange: (v) => matRef.current.uniforms.uDeepColor.value.set(v),
          },
        }),
        Elevation: folder({
          elevationOffset: {
            label: "Elevation Offset",
            value: uniforms.uElevationOffset,
            min: 0,
            max: 1,
            step: 0.01,
            onChange: (v) => (matRef.current.uElevationOffset = v),
          },
          elevationMultiplier: {
            label: "Elevation Multiplier",
            value: uniforms.uElevationMultiplier,
            min: 0,
            max: 1,
            step: 0.01,
            onChange: (v) => (matRef.current.uElevationMultiplier = v),
          },
        }),

        Big_Waves: folder({
          bwFrequency: {
            label: "Frequency",
            value: {
              x: uniforms.uBigWavesFrequency.x,
              y: uniforms.uBigWavesFrequency.y,
            },
            min: 2,
            max: 10,
            step: 1,
            joystick: "invertY",
            onChange: (v) => {
              matRef.current.uniforms.uBigWavesFrequency.value.set(v.x, v.y);
            },
          },
          bwSpeed: {
            label: "Speed",
            value: uniforms.uBigWavesSpeed,
            min: 0,
            max: 5,
            step: 0.01,
            onChange: (v) => (matRef.current.uBigWavesSpeed = v),
          },
          bwStrength: {
            label: "Strength",
            value: uniforms.uBigWavesStrength,
            min: 0.1,
            max: 1,
            step: 0.01,
            onChange: (v) => (matRef.current.uBigWavesStrength = v),
          },
        }),
        Small_Waves: folder({
          smwFrequency: {
            label: "Frequency",
            value: uniforms.uSmallWavesFrequency,
            min: 2,
            max: 10,
            step: 0.01,
            onChange: (v) => (matRef.current.uSmallWavesFrequency = v),
          },
          smwSpeed: {
            label: "Speed",
            value: uniforms.uSmallWavesSpeed,
            min: 0,
            max: 5,
            step: 0.01,
            onChange: (v) => (matRef.current.uSmallWavesSpeed = v),
          },
          smwStrength: {
            label: "Strength",
            value: uniforms.uSmallWavesStrength,
            min: 0.1,
            max: 1,
            step: 0.01,
            onChange: (v) => (matRef.current.uSmallWavesStrength = v),
          },
          smwIteration: {
            label: "Iteration",
            value: uniforms.uSmallWavesIteration,
            min: 1,
            max: 10,
            step: 1,
            onChange: (v) => (matRef.current.uSmallWavesIteration = v),
          },
        }),
        Directional_Light: folder({
          dColor: {
            label: "Color",
            value: "#".concat(
              uniforms.uDirectionalLightColor.getHexString(SRGBColorSpace)
            ),
            onChange: (v) =>
              matRef.current.uniforms.uDirectionalLightColor.value.set(v),
          },
          dIntensity: {
            label: "Intensity",
            value: uniforms.uDirectionalLightIntensity,
            min: 0.5,
            max: 5,
            step: 0.01,
            onChange: (v) => (matRef.current.uDirectionalLightIntensity = v),
          },
          dSpecularPower: {
            label: "Specular Power",
            value: uniforms.uSpecularPower,
            min: 2,
            max: 50,
            step: 2,
            onChange: (v) => (matRef.current.uSpecularPower = v),
          },
        }),
      }),
    }),
  });

  useFrame((state) => {
    matRef.current.uTime = state.clock.elapsedTime;
  });
  return (
    <mesh position={[pos.x, pos.y, pos.z]} rotation={[rot.x, rot.y, rot.z]}>
      <planeGeometry args={[2, 2, 512, 512]} />
      <ragingSeaShaderMaterial ref={matRef} key={RagingSeaShaderMaterial.key} />
    </mesh>
  );
}
