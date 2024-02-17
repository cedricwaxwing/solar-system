import { Environment, Sphere, Stars } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { RGBELoader } from "three-stdlib";
import { BackSide } from "three";

const PROJECT_SCALE = 800;

export const Lighting = () => {
  const nebulaMap = useLoader(RGBELoader, "./assets/hdri/nebula.hdr");
  return (
    <>
      <Stars factor={0.9} saturation={1} speed={1} />
      <Environment background blur={0.08}>
        <color attach='background' args={["#181818"]} />
        <Sphere scale={PROJECT_SCALE}>
          <meshBasicMaterial
            opacity={0.03}
            transparent
            map={nebulaMap}
            side={BackSide}
          />
        </Sphere>
      </Environment>
    </>
  );
};
