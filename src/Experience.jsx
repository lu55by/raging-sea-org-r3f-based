import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import RagingSea from "./components/RagingSea";
import { useControls } from "leva";

export default function Experience() {
  const { bgColor } = useControls("BG-Color", {
    bgColor: {
      label: "Background Color",
      value: "#000000",
    },
  });
  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />
      <color args={[bgColor]} attach="background" />

      <RagingSea />
    </>
  );
}
