import { useRef, useEffect, useState, memo } from "react";
import {
  TextureLoader,
  MeshPhysicalMaterial,
  DoubleSide,
  MeshBasicMaterial,
} from "three";
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
  const [tempPlanet, setTempPlanet] = useState(currentPlanet?.name || null);
  const [currentSpeed, setCurrentSpeed] = useState(0.1);
  const [currentRotation, setCurrentRotation] = useState(0);
  const isMobile = useIsMobile();
  const planetRefs = useRef({});

  useEffect(() => {
    const loader = new TextureLoader();
    planetsInfo.forEach((planet) => {
      const texturePath = `/assets/textures/${planet.name.toLowerCase()}.jpg`;
      loader.load(texturePath, (texture) => {
        const planetMesh = planetRefs.current[planet.name];
        const currentPlanetMesh = planetMesh?.children[0];
        if (
          planetMesh &&
          currentPlanetMesh &&
          currentPlanetMesh.material &&
          planet.name === "Sun"
        ) {
          currentPlanetMesh.material = new MeshBasicMaterial({
            map: texture,
          });
        } else if (
          planetMesh &&
          currentPlanetMesh &&
          currentPlanetMesh.material
        ) {
          currentPlanetMesh.material = new MeshPhysicalMaterial({
            map: texture,
          });
        }
      });
    });
  }, [planetRefs.current]);

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
    setTimeout(() => {
      setTempPlanet(currentPlanet?.name);
    }, 4000);
  }, [currentPlanet?.name]);

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
      const currentPlanetMesh = planetRefs.current[curPlanet.name].children[0];
      currentPlanetMesh?.rotation.set(currentRotation, t * currentSpeed, 0);
    }
  });

  return (
    planetsInfo &&
    currentPlanet && (
      <>
        {planetsInfo.map((planet) => {
          return (
            <group
              name={planet.name}
              key={planet.name}
              ref={(el) => (planetRefs.current[planet.name] = el)}
              position={[planet.distance, isMobile ? planet.scale * 0.4 : 0, 0]}
              rotation={[0, 0, 0]}>
              <Icosahedron
                key={`planet-${planet.name}`}
                args={[planet.scale * (!isMobile ? 1.3 : 1), 32, 32]}>
                {planet.name === "Sun" ? (
                  <meshBasicMaterial attach='material' side={DoubleSide} />
                ) : (
                  <meshPhysicalMaterial
                    attach='material'
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
                {(tempPlanet === "Saturn" || currentPlanet.name === "Saturn") &&
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
                              Math.random() * 0.05,
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
