import { useRef, useEffect } from "react";
import { TextureLoader, MeshPhysicalMaterial, FrontSide } from "three";
import { Icosahedron } from "@react-three/drei";
import FakeGlowMaterial from "../FakeGlowMaterial";
import { planetsInfo } from "../planets";
import { useFeatures } from "../common/FeaturesProvider";
import { useFrame } from "@react-three/fiber";
import useIsMobile from "../hooks/useIsMobile";
import { degreesToRadians } from "../common/helpers";

const Planets = () => {
  const { setPlanetPositions, currentPlanet } = useFeatures();
  console.log(currentPlanet);
  const isMobile = useIsMobile();
  const planetRefs = useRef({});
  const speed = currentPlanet?.rotationDuration
    ? 0.2 / currentPlanet.rotationDuration
    : 0.5;
  const rotationZ = currentPlanet?.semi_major_axis
    ? degreesToRadians(currentPlanet.semi_major_axis)
    : 0;

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

  console.log(speed);

  useEffect(() => {
    const planetPositions = [];
    Object.values(planetRefs.current).forEach((planet) => {
      planetPositions.push(planet.position);
    });
    setPlanetPositions(planetPositions);
  }, [planetRefs]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    planetsInfo.forEach((planet) => {
      planetRefs.current[planet.name].rotation.set(0, t * speed, rotationZ);
    });
  });

  return (
    <group>
      {planetsInfo.map((planet) => {
        return (
          <Icosahedron
            key={planet.name}
            ref={(el) => (planetRefs.current[planet.name] = el)}
            name={planet.name}
            args={[planet.scale * (!isMobile ? 1.3 : 1), 64, 64]}
            position={[planet.distance, isMobile ? planet.scale * 0.25 : 0, 0]}
            rotation={[0, 0, 0]}>
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
