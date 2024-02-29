import { useRef, useEffect, useState, memo } from "react";
import { TextureLoader, DoubleSide } from "three";
import { Icosahedron, Torus } from "@react-three/drei";
import FakeGlowMaterial from "../FakeGlowMaterial";
import { planetsInfo } from "../planets";
import { useFeatures } from "../common/FeaturesProvider";
import { useFrame } from "@react-three/fiber";
import useIsMobile from "../hooks/useIsMobile";
import { mapValue, calculateSpeed, degreesToRadians } from "../common/helpers";
import { LayerMaterial, Noise } from "lamina";

const Planets = () => {
  const { setPlanetPositions, currentPlanet } = useFeatures();
  const [currentSpeed, setCurrentSpeed] = useState(0.1);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [texturesLoaded, setTexturesLoaded] = useState(false);
  const isMobile = useIsMobile();
  const planetRefs = useRef({});

  useEffect(() => {
    if (planetsInfo) {
      const loader = new TextureLoader();
      planetsInfo.forEach((planet, i) => {
        const texturePath = `/assets/textures/${planet.name.toLowerCase()}.jpg`;
        loader.load(texturePath, (texture) => {
          planet.texture = texture;
          if (i === planetsInfo.length - 1) {
            setTimeout(() => {
              setTexturesLoaded(true);
            }, 500);
          }
        });
      });
    }
  }, [planetsInfo, planetRefs.current]);

  useEffect(() => {
    if (currentPlanet) {
      setCurrentSpeed(calculateSpeed(currentPlanet.rotationDuration));
      setCurrentRotation(
        degreesToRadians(
          currentPlanet.semi_major_axis ? currentPlanet.semi_major_axis : 0
        )
      );
    }
  }, [currentPlanet]);

  useEffect(() => {
    const planetPositions = [];
    Object.values(planetRefs.current).forEach((planet) => {
      planetPositions.push(planet.children[0].position);
    });
    setPlanetPositions(planetPositions);
  }, [planetRefs]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const curPlanet = planetsInfo.find(
      (planet) => planet.index === currentPlanet?.index
    ); // only animate current planet to be more performant
    if (curPlanet) {
      const currentPlanetMesh = planetRefs.current[curPlanet.name]?.children[0];
      currentPlanetMesh?.rotation.set(currentRotation, t * currentSpeed, 0);
    }
  });

  return (
    planetsInfo &&
    currentPlanet && (
      <>
        {planetsInfo.map((planet) => {
          return (
            <>
              {texturesLoaded && (
                <group
                  name={planet.name}
                  key={`group-${planet.name}`}
                  ref={(el) => (planetRefs.current[planet.name] = el)}
                  position={[
                    planet.distance,
                    isMobile ? planet.scale * 0.4 : 0,
                    0,
                  ]}
                  rotation={[0, 0, 0]}>
                  <Icosahedron
                    key={`planet-${planet.name}`}
                    args={[planet.scale * (!isMobile ? 1.3 : 1), 32, 32]}>
                    {planet.name === "Sun" ? (
                      <meshBasicMaterial
                        map={planet.texture}
                        side={DoubleSide}
                      />
                    ) : (
                      <meshPhysicalMaterial
                        map={planet.texture}
                        side={DoubleSide}
                        toneMapped={false}
                      />
                    )}
                    {planet.name === "Sun" && (
                      <>
                        <Icosahedron
                          args={[planet.scale * 2.5, 32, 32]}
                          position={[0, 0, 0]}>
                          <FakeGlowMaterial
                            attach='material'
                            glowColor='#ff8c00'
                            glowInternalRadius={2}
                            falloff={1.9}
                            opacity={0.3}
                          />
                        </Icosahedron>
                      </>
                    )}
                    {planet.name === "Saturn" &&
                      planet.ringColors &&
                      planet.ringColors.map((color, index) => {
                        const radius = mapValue(
                          index,
                          0,
                          planet.ringColors.length,
                          planet.scale * 1.7,
                          planet.scale * 2.3
                        );
                        const positions = [...Array(6)].map(() => [
                          Math.min(planet.scale * 2, radius) *
                            Math.cos(Math.random() * 2 * Math.PI),
                          Math.random() * 0.3 - 0.15,
                          Math.max(planet.scale * 2.01, radius) *
                            Math.sin(Math.random() * 2 * Math.PI),
                        ]);
                        return (
                          <>
                            {positions.map((position, posI) => (
                              <Icosahedron
                                key={posI}
                                position={position}
                                args={[
                                  Math.random() * 0.05 + 0.01,
                                  Math.ceil(Math.random()) * 4 + 1,
                                  Math.ceil(Math.random()) * 4 + 1,
                                ]}>
                                <RingMaterial color={color} />
                              </Icosahedron>
                            ))}
                            <Torus
                              name={`${planet.name}-ring`}
                              key={index}
                              scale-z={0.15}
                              position={[0, 0, 0]}
                              args={[radius, Math.random() * 0.1 + 0.05, 5, 56]}
                              rotation-x={-Math.PI / 2}>
                              <RingMaterial color={color} />
                            </Torus>
                          </>
                        );
                      })}
                  </Icosahedron>
                </group>
              )}
            </>
          );
        })}
      </>
    )
  );
};

export default Planets;

const RingMaterial = memo(({ color }) => {
  return (
    <LayerMaterial
      lighting='standard'
      color={color}
      emissive={color}
      emissiveIntensity={0.7}
      envMapIntensity={3.5}>
      <Noise
        colorA='#fff'
        colorB='#000'
        colorC='#fff'
        colorD='#000'
        mode='overlay'
        alpha={1}
        scale={Math.random() * 10 + 25}
      />
    </LayerMaterial>
  );
});

RingMaterial.displayName = "RingMaterial";
