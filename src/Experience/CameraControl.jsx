import { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import { animated, easings, useSpring } from "@react-spring/three";
import { useFeatures } from "../common/FeaturesProvider";
import { planetsInfo } from "../planets";
import { OrbitControls } from "@react-three/drei";
import useIsMobile from "../hooks/useIsMobile";

const AnimatedOrbit = animated(OrbitControls);

const CameraControl = () => {
  const controls = useRef();
  const { camera, gl } = useThree();
  const isMobile = useIsMobile();
  const { currentPlanet, planetPositions, showSidebar } = useFeatures();
  const [targetPosition, setTargetPosition] = useState([0, 0, 0]);

  useEffect(() => {
    const validCurrentPlanet =
      currentPlanet && currentPlanet.name ? currentPlanet : { name: "Mercury" };
    const selectedPlanetInfo =
      planetsInfo.find((p) => p.name === validCurrentPlanet.name) ||
      planetsInfo[0];

    if (selectedPlanetInfo && planetPositions) {
      let newPosition;
      const adjustment =
        showSidebar && !isMobile ? -0.68 * selectedPlanetInfo.scale : 0;

      const planetPosition = planetPositions[selectedPlanetInfo.index];
      newPosition = [
        (planetPosition.x || selectedPlanetInfo.distance) + adjustment,
        0,
        (selectedPlanetInfo.scale + 0.018) * 2.8,
      ];
      setTargetPosition(newPosition);
    }
  }, [currentPlanet, planetPositions, showSidebar]);

  useSpring({
    to: { position: targetPosition },
    from: { position: camera.position.toArray() },
    config: {
      easing: easings.easeInOutQuad,
      duration: calculateDuration(
        camera.position.toArray(),
        targetPosition,
        [300, 6000]
      ),
    },
    onChange: ({ value }) => {
      camera.position.set(...value.position);
    },
  });

  const controlsConfig = useSpring({
    target: [targetPosition[0], 0, 0],
    config: {
      easing: easings.easeInOutQuad,
      delay: calculateDuration(
        camera.position.toArray(),
        targetPosition,
        [0, 300]
      ),
      duration: calculateDuration(
        camera.position.toArray(),
        targetPosition,
        [300, 3000]
      ),
    },
  });

  return (
    <>
      <AnimatedOrbit
        ref={controls}
        args={[camera, gl.domElement]}
        target={controlsConfig.target}
      />
    </>
  );
};

export default CameraControl;

function calculateDuration(currentPosition, targetPosition, range) {
  // Example calculation: Adjust this logic to suit your needs
  const distance = Math.sqrt(
    targetPosition.reduce(
      (acc, val, i) => acc + Math.pow(val - currentPosition[i], 2),
      0
    )
  );

  // Determine the duration based on the distance to travel
  // Smaller distance (sidebar opening) might have a shorter duration and vice versa
  return distance < 2 ? range[0] : range[1]; // Adjust `someThreshold` and durations as needed
}
