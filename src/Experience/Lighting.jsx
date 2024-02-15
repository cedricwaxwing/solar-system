import { Environment, Sphere, Stars } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { RGBELoader } from "three-stdlib";
import { BackSide } from "three";

export const Lighting = () => {
  const nebulaMap = useLoader(RGBELoader, "./assets/hdri/nebula.hdr");
  return (
    <>
      <Stars factor={1.2} saturation={1} speed={1} opacity={0.1} transparent />
      <Environment background blur={0.08}>
        <color attach='background' args={["#181818"]} />
        <Sphere scale={1000}>
          <meshBasicMaterial
            opacity={0.05}
            transparent
            map={nebulaMap}
            side={BackSide}
          />
        </Sphere>
      </Environment>
    </>
  );
};
