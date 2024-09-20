import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { Leva } from "leva";

const levaTheme = {
  sizes: {
    rootWidth: "400px",
  },
};

export default function MainCanvas() {
  return (
    <>
      <Leva theme={levaTheme} />
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [0.7, 2.5, 2],
        }}
        gl={{ antialias: true }}
      >
        <Experience />
      </Canvas>
    </>
  );
}
