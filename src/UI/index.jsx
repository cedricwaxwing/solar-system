import { useState } from "react";
import { Info } from "@phosphor-icons/react";
import Logo from "./Logo";
import Sidebar from "./Sidebar";
import { useSpring } from "react-spring";
import { easings } from "react-spring";
import useIsMobile from "../hooks/useIsMobile";

const UI = () => {
  const isMobile = useIsMobile();
  const [showInfo, setShowInfo] = useState(!isMobile);
  const [display, setDisplay] = useState(isMobile ? "none" : "flex");

  const fade = useSpring({
    to: {
      opacity: showInfo ? 1 : 0,
      transform: showInfo ? "translateY(0)" : "translateY(-1%)",
    },
    from: {
      opacity: showInfo ? 0 : 1,
      transform: showInfo ? "translateY(-3%)" : "translateY(0)",
    },
    config: {
      duration: showInfo ? 1000 : 250,
      easing: easings.easeInOutCubic,
    },
    onStart: () => {
      if (showInfo) {
        setDisplay("flex");
      }
    },
    onResolve: () => {
      if (!showInfo) {
        setDisplay("none");
      }
    },
  });

  return (
    <>
      <header className='fixed top-0 left-0 w-screen flex justify-between items-center p-4 z-10'>
        <Logo className='text-white hover:text-white/60 duration-300 ease-in-out cursor-pointer' />
        <Info
          size={24}
          className='text-white hover:text-white/60 duration-300 ease-in-out cursor-pointer'
          onClick={() => setShowInfo(true)}
        />
      </header>
      <main>
        <Sidebar fade={fade} display={display} setShowInfo={setShowInfo} />
      </main>
    </>
  );
};

export default UI;
