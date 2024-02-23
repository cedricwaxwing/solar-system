import { Canvas } from "@react-three/fiber";
import { KeyboardControls, Loader } from "@react-three/drei";
import Experience from "./Experience";
import "./App.css";
import UI from "./UI";
import { Suspense, useMemo } from "react";

const controls = {
  up: "up",
  down: "down",
  left: "left",
  right: "right",
};

const App = () => {
  const map = useMemo(
    () => [
      { name: controls.up, keys: ["ArrowUp", "KeyW"] },
      { name: controls.down, keys: ["ArrowDown", "KeyS"] },
      { name: controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: controls.right, keys: ["ArrowRight", "KeyD"] },
    ],
    []
  );
  return (
    <>
      <KeyboardControls map={map}>
        <Suspense fallback={null}>
          <Canvas className='fixed left-0 top-0 !w-screen !h-screen !min-h-screen'>
            <Experience />
          </Canvas>
          <UI />
        </Suspense>
        <Loader />
      </KeyboardControls>
    </>
  );
};

export default App;
