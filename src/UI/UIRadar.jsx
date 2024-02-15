import { useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { mapValue } from "../common/utils";
import { UIPowerDial } from "./UIPowerDial";

export const UIRadar = ({ ...props }) => {
  const radarDotRef = useRef();

  const [, get] = useKeyboardControls();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const speed = useRef();
  const maxRadius = 7;
  const controlIncrement = 0.2;
  const revertIncrement = 0.2;

  useEffect(() => {
    const handlePosition = () => {
      const { up, down, left, right } = get();
      let directionX = left ? -controlIncrement : right ? controlIncrement : 0;
      let directionY = up ? -controlIncrement : down ? controlIncrement : 0;

      // Incremental move back to center when no keys are pressed
      if (!up && !down && !left && !right) {
        directionX =
          position.x > 0
            ? -revertIncrement
            : position.x < 0
            ? revertIncrement
            : 0;
        directionY =
          position.y > 0
            ? -revertIncrement
            : position.y < 0
            ? revertIncrement
            : 0;
      }

      let newX = position.x + directionX;
      let newY = position.y + directionY;

      // Calculate distance to center and adjust if necessary
      let distance = Math.sqrt(newX * newX + newY * newY);
      if (distance > maxRadius) {
        let angle = Math.atan2(newY, newX);
        newX = Math.cos(angle) * maxRadius;
        newY = Math.sin(angle) * maxRadius;
      } else if (
        distance < revertIncrement &&
        !left &&
        !right &&
        !up &&
        !down
      ) {
        // If very close to the center and no input, just reset to 0
        newX = 0;
        newY = 0;
      }

      setPosition({ x: newX, y: newY });
    };

    const interval = setInterval(handlePosition, 100);
    return () => clearInterval(interval);
  }, [get, position]);

  useEffect(() => {
    if (radarDotRef.current) {
      const threshold = 0.05; // Adjust the threshold as needed
      const translateX =
        Math.abs(position.x) > threshold ? Math.round(position.x * 10) / 10 : 0;
      const translateY =
        Math.abs(position.y) > threshold ? Math.round(position.y * 10) / 10 : 0;
      const translate = `translate(${translateX}%, ${translateY}%)`;
      radarDotRef.current.setAttribute("style", `transform: ${translate};`);
    }

    speed.current = mapValue(
      Math.sqrt(position.x * position.x + position.y * position.y),
      0,
      maxRadius,
      0,
      1
    );
  }, [position]);

  return (
    <svg
      width='214'
      height='213'
      viewBox='0 0 214 213'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <g>
        <circle cx='107' cy='106.669' r='96' fillOpacity='0.2' />
        <circle
          cx='107'
          cy='106.669'
          r='96'
          className='stroke-primary'
          strokeWidth='3'
        />
      </g>
      <circle cx='107' cy='106.669' r='105.836' className='stroke-primary' />
      <circle
        cx='107'
        cy='106.669'
        r='60.5323'
        className='fill-primary'
        fillOpacity='0.05'
      />
      <UIPowerDial speed={speed.current} />
      <g style={{ mixBlendMode: "plus-lighter" }} opacity='0.1'>
        <circle cx='107' cy='106.669' r='31.7522' className='stroke-primary' />
        <circle cx='107' cy='106.669' r='40.4762' className='stroke-primary' />
        <circle cx='107' cy='106.669' r='49.2001' className='stroke-primary' />
        <circle cx='107' cy='106.669' r='58.9647' className='stroke-primary' />
        <path
          d='M175.665 106.669C175.665 144.592 144.923 175.334 107 175.334C69.0772 175.334 38.3347 144.592 38.3347 106.669C38.3347 68.7461 69.0772 38.0036 107 38.0036C144.923 38.0036 175.665 68.7461 175.665 106.669Z'
          className='stroke-primary'
        />
        <circle cx='107' cy='106.669' r='77.7526' className='stroke-primary' />
        <circle cx='107' cy='106.669' r='86.4766' className='stroke-primary' />
      </g>
      <g style={{ position: "relative" }}>
        <circle
          cx='107'
          cy='106.669'
          r='20'
          fill='#00FFD1'
          fillOpacity='0.4'
          name='radar-wrapper'
        />
      </g>
      <g style={{}}>
        <circle
          ref={radarDotRef}
          cx='107'
          cy='106.669'
          r='5'
          fill='#00FFD1'
          fillOpacity='0.9'
          name='radar-dot'
          className='absolute left-1/2 top-1/2 transition-transform duration-150 ease-in-out'
        />
      </g>
    </svg>
  );
};
