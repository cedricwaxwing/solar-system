import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import Experience from "./Experience";
import "./App.css";
import UI from "./UI";
import { useMemo } from "react";

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
        <Canvas
          className='fixed inset-0'
          eventSource={document.getElementById("root")}>
          <Experience />
        </Canvas>
        <UI />
      </KeyboardControls>
    </>
  );
};

export default App;
