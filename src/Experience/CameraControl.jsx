import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { useFeatures } from "../common/FeaturesProvider";
import { planetsInfo } from "../planets";
import { OrbitControls } from "@react-three/drei";

const CameraControl = () => {
  const orbitControlsRef = useRef();
  const { camera } = useThree();
  const { currentPlanet } = useFeatures();

  useEffect(() => {
    const controls = orbitControlsRef.current;

    if (currentPlanet && controls) {
      const selectedPlanetInfo = planetsInfo.find(
        (p) => p.name === currentPlanet.name
      );
      if (!selectedPlanetInfo) return;

      const offset = 0.1;
      const newPosition = [
        selectedPlanetInfo.distance - offset,
        0,
        selectedPlanetInfo.scale * 2,
      ];

      camera.position.set(...newPosition);
      controls.target.set(selectedPlanetInfo.distance, 0, 0);
    }
  }, [currentPlanet, camera, orbitControlsRef]);

  return <OrbitControls ref={orbitControlsRef} />;
};

export default CameraControl;
