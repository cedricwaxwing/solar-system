import { useRef, useEffect } from "react";
import { TextureLoader, MeshPhysicalMaterial, FrontSide } from "three";
import { Icosahedron } from "@react-three/drei";
import FakeGlowMaterial from "../FakeGlowMaterial";
import { planetsInfo } from "../planets";

const Planets = () => {
  const planetRefs = useRef({});

  useEffect(() => {
    const loader = new TextureLoader();
    planetsInfo.forEach((planet) => {
      const texturePath = `/assets/textures/${planet.name.toLowerCase()}.jpg`;
      loader.load(texturePath, (texture) => {
        const planetMesh = planetRefs.current[planet.name];
        if (planetMesh) {
          planetMesh.material = new MeshPhysicalMaterial({
            map: texture,
            toneMapped: false,
          });
        }
      });
    });
  }, []);

  return (
    <group>
      {planetsInfo.map((planet) => {
        return (
          <Icosahedron
            key={planet.name}
            ref={(el) => (planetRefs.current[planet.name] = el)}
            name={planet.name}
            args={[planet.scale, 64, 64]}
            position={[planet.distance, 0, 0]}
            rotation={[0, -0.3, 0]}>
            <meshPhysicalMaterial
              attach='material'
              side={FrontSide}
              toneMapped={false}
            />
            {planet.name === "Sun" && (
              <Icosahedron
                args={[planet.scale * 2.5, 64, 64]}
                position={[0, 0, 0]}>
                <FakeGlowMaterial
                  attach='material'
                  glowColor='#ff8c00'
                  glowInternalRadius={2}
                  falloff={1.9}
                  opacity={0.6}
                />
              </Icosahedron>
            )}
          </Icosahedron>
        );
      })}
    </group>
  );
};

export default Planets;
