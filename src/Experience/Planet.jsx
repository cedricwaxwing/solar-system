import { Icosahedron, Resize } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { DoubleSide, TextureLoader } from "three";
import FakeGlowMaterial from "../FakeGlowMaterial";
import { useFrame, useThree } from "@react-three/fiber";
import { useFeatures } from "../common/FeaturesProvider";

const Planet = () => {
  const ref = useRef();
  const { currentPlanet } = useFeatures();
  const [texture, setTexture] = useState(null);
  const { viewport } = useThree();
  const vMin = Math.min(viewport.height, viewport.width);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.02;
    }
  });

  useEffect(() => {
    if (currentPlanet) {
      const loader = new TextureLoader();
      loader
        .loadAsync(`/assets/textures/${currentPlanet.name.toLowerCase()}.jpg`)
        .then((loadedTexture) => {
          setTexture(loadedTexture);
        })
        .catch((error) => {
          console.error("Error loading texture:", error);
          setTexture(null);
        });
    }
  }, [currentPlanet]);

  return currentPlanet && texture ? (
    <Resize scale={vMin * 0.7}>
      <Icosahedron
        ref={ref}
        name={currentPlanet.name}
        args={[1, 64, 64]}
        scale={1}
        position={[0, 0, 0]}
        rotation={[0, -0.3, 0]}>
        {currentPlanet.name === "sun" ? (
          <meshBasicMaterial map={texture} side={DoubleSide} />
        ) : (
          <meshStandardMaterial bumpMap={texture} bumpScale={1} map={texture} />
        )}
      </Icosahedron>
      {currentPlanet.name === "sun" && (
        <Icosahedron args={[1, 64, 64]} scale={30} position={[0, 0, 0]}>
          <FakeGlowMaterial
            glowColor='orange'
            glowInternalRadius={3}
            falloff={0.99}
            opacity={0.5}
          />
        </Icosahedron>
      )}
    </Resize>
  ) : null;
};

export default Planet;
