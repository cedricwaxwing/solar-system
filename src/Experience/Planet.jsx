import { Icosahedron, Resize } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { FrontSide, TextureLoader } from "three";
import FakeGlowMaterial from "../FakeGlowMaterial";
import { useFrame, useThree } from "@react-three/fiber";
import { useFeatures } from "../common/FeaturesProvider";

const Planet = () => {
  const ref = useRef();
  const { currentPlanet } = useFeatures();
  const [texture, setTexture] = useState(null);
  const [bumpMap, setBumpMap] = useState(null);
  const [specularMap, setSpecularMap] = useState(null);
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
      const planetName = currentPlanet.name.toLowerCase();
      const loader = new TextureLoader();

      // Load main texture
      loader
        .loadAsync(`/assets/textures/${planetName}.jpg`)
        .then(setTexture)
        .catch((error) => console.error("Error loading main texture:", error));

      // Attempt to load bump map
      loader
        .loadAsync(`/assets/textures/${planetName}_bump.jpg`)
        .then(setBumpMap)
        .catch(() => setBumpMap(null)); // Fail silently

      // Attempt to load specular map
      loader
        .loadAsync(`/assets/textures/${planetName}_spec.jpg`)
        .then(setSpecularMap)
        .catch(() => setSpecularMap(null)); // Fail silently
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
          <meshBasicMaterial map={texture} side={FrontSide} />
        ) : (
          <meshPhysicalMaterial
            bumpMap={bumpMap ? bumpMap : texture}
            bumpScale={bumpMap ? 10 : 1}
            map={texture}
            toneMapped={false}
            specularIntensityMap={specularMap}
          />
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
