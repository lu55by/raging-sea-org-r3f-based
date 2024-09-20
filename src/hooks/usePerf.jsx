import { useControls } from "leva";
import { Perf } from "r3f-perf";

export default function usePerf() {
  const { perfVisibility } = useControls("Perf Visibility", {
    perfVisibility: {
      label: "Visibility",
      value: false,
    },
  });
  return { perfVisibility };
}
