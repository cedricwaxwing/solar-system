import { View, OrbitControls } from "@react-three/drei";
import Planet from "./Planet";
import { Lighting } from "./Lighting";

const Experience = () => {
  return (
    <>
      <View className='absolute inset-0'>
        <directionalLight
          position={[-5, 0, 3]}
          scale={100}
          intensity={4}
          color='#fff'
        />
        <ambientLight intensity={0.15} />
        <Lighting />
        <Planet />
        <OrbitControls />
      </View>
    </>
  );
};

export default Experience;
