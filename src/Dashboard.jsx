// import { useThree } from "@react-three/fiber";
import { Sphere, Center, Resize } from "@react-three/drei";
import { planets } from "./planets";
import { useEffect } from "react";
import { useState } from "react";
import { useThree } from "@react-three/fiber";

const Dashboard = () => {
  const { viewport } = useThree();
  const [loadedPlanets, setLoadedPlanets] = useState([]);

  useEffect(() => {
    planets.then((loaded) => {
      setLoadedPlanets(loaded);
    });
  }, [planets]);

  return loadedPlanets.length > 1 ? (
    <>
      <ambientLight intensity={1.3} />
      <color attach='background' args={["#222"]} />
      <Resize scale={viewport.width * 0.95}>
        <Center>
          <group>
            {loadedPlanets.map((planet, i) => {
              return (
                <>
                  <Sphere key={i} scale={0.25} position-x={i > 3 ? i + 2 : i}>
                    <meshBasicMaterial map={planet.texture} />
                  </Sphere>
                  {i === 3 && (
                    <Sphere key={i} scale={2.5} position-x={i}>
                      <meshBasicMaterial color='#fff' />
                    </Sphere>
                  )}
                </>
              );
            })}
          </group>
        </Center>
      </Resize>
    </>
  ) : null;
};

export default Dashboard;
