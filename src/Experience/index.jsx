import Planets from "./Planets";
import { Lighting } from "./Lighting";
import CameraControl from "./CameraControl";

const Experience = () => {
  return (
    <>
      <directionalLight
        position={[-5, 0, 3]}
        scale={100}
        intensity={4}
        color='#fff'
      />
      <ambientLight intensity={0.15} />
      <Lighting />
      <Planets />
      <CameraControl />
    </>
  );
};

export default Experience;
