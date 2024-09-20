import { OrbitControls } from "@react-three/drei";
import RagingSea from "./components/RagingSea";
import { useControls } from "leva";
import usePerf from "./hooks/usePerf";
import { Perf } from "r3f-perf";

export default function Experience() {
  const { bgColor } = useControls("BG-Color", {
    bgColor: {
      label: "Background Color",
      value: "#000000",
    },
  });
  const { perfVisibility } = usePerf();
  return (
    <>
      {perfVisibility && <Perf position="top-left" />}
      <OrbitControls makeDefault />
      <color args={[bgColor]} attach="background" />

      <RagingSea />
    </>
  );
}
