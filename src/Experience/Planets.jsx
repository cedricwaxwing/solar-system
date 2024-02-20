import { useRef, useEffect } from "react";
import {
  TextureLoader,
  MeshPhysicalMaterial,
  FrontSide,
  DoubleSide,
} from "three";
import { Icosahedron, Ring, useTexture } from "@react-three/drei";
import FakeGlowMaterial from "../FakeGlowMaterial";
import { planetsInfo } from "../planets";
import { useFeatures } from "../common/FeaturesProvider";
import { useFrame } from "@react-three/fiber";
import useIsMobile from "../hooks/useIsMobile";
import { degreesToRadians } from "../common/helpers";

const Planets = () => {
  const { setPlanetPositions, currentPlanet } = useFeatures();
  const isMobile = useIsMobile();
  const planetRefs = useRef({});
  const saturnRings = useTexture("/assets/textures/saturn_ring.png");
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
        if (planetMesh && planetMesh.children[0]) {
          planetMesh.children[0].material = new MeshPhysicalMaterial({
            map: texture,
            toneMapped: false,
          });
        }
      });
    });
  }, []);

  useEffect(() => {
    const planetPositions = [];
    Object.values(planetRefs.current).forEach((planet) => {
      planetPositions.push(planet.position);
    });
    setPlanetPositions(planetPositions);
    console.log(planetRefs.current);
  }, [planetRefs]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    planetsInfo.forEach((planet) => {
      planetRefs.current[planet.name].rotation.set(0, t * speed, rotationZ);
    });
  });

  return (
    <>
      {planetsInfo.map((planet) => {
        return (
          <group
            name={planet.name}
            key={planet.name}
            ref={(el) => (planetRefs.current[planet.name] = el)}
            position={[planet.distance, isMobile ? planet.scale * 0.25 : 0, 0]}
            rotation={[0, 0, 0]}>
            <Icosahedron args={[planet.scale * (!isMobile ? 1.3 : 1), 64, 64]}>
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
              {planet.name === "Saturn" && (
                <>
                  <Ring
                    args={[planet.scale * 1.5, planet.scale * 2.5, 64, 8]}
                    rotation-x={-Math.PI / 2}
                    position={[0, 0, 0]}>
                    <meshBasicMaterial
                      alphaMap={saturnRings}
                      map={saturnRings}
                      side={DoubleSide}
                    />
                  </Ring>
                </>
              )}
            </Icosahedron>
          </group>
        );
      })}
    </>
  );
};

export default Planets;
