import clsx from "clsx";
import { useEffect, useState } from "react";
import { useFeatures } from "../common/FeaturesProvider";
import { normalizePlanetData } from "../common/normalizePlanetData";
import { planetsInfo } from "../planets";
import { ArrowLeft, ArrowRight, CaretDown } from "@phosphor-icons/react";
import { animated, useTransition } from "react-spring";
import useIsMobile from "../hooks/useIsMobile";
import { useKeyboardControls } from "@react-three/drei";
import { formatTemp, generatePlanetIndices } from "../common/helpers";

const Sidebar = () => {
  const { currentPlanet, showSidebar, setShowSidebar } = useFeatures();
  const isMobile = useIsMobile();
  const [planets, setPlanets] = useState([]);
  const [planetData, setPlanetData] = useState({});
  const [prevPlanet, setPrevPlanet] = useState({});
  const [nextPlanet, setNextPlanet] = useState({});

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const containerTransition = useTransition(showSidebar, {
    from: { opacity: 0, height: 0 },
    enter: { opacity: 1, height: "auto" },
    leave: { opacity: 0, height: 0 },
    reverse: showSidebar,
  });

  useEffect(() => {
    if (currentPlanet) {
      const indices = generatePlanetIndices(planetsInfo, currentPlanet);
      const prevPlanetInfo = planetsInfo[indices.prev];
      const nextPlanetInfo = planetsInfo[indices.next];

      setPrevPlanet(prevPlanetInfo);
      setNextPlanet(nextPlanetInfo);
      setPlanetData(normalizePlanetData(currentPlanet));
    }
  }, [currentPlanet]);

  useEffect(() => {
    if (planetData) {
      setPlanets(
        Object.entries(planetData).filter(
          ([key, value]) => key !== "Temperature" && value
        )
      );
    }
  }, [planetData]);

  return currentPlanet ? (
    <>
      {isMobile ? (
        <>
          <div
            className={clsx(
              "fixed bottom-0 w-full left-0 space-y-3 right-0 p-4 z-1",
              showSidebar && "top-4 justify-end flex flex-col"
            )}>
            <div className='bg-gray-800/30 shadow-2xl shadow-gray-900/80 md:shadow-gray-900/20 w-full rounded-2xl border-2 border-white/10 backdrop-blur-2xl max-h-[calc(100vh-140px)] flex flex-col flex-grow relative'>
              <div
                className='flex items-center justify-between p-4'
                onClick={toggleSidebar}>
                <div className='space-y-0'>
                  <div className='text-xs font-medium leading-none font-sans tracking-widest uppercase text-teal-400'>
                    {currentPlanet.name === "Sun" ? "Star" : "Planet"}
                  </div>
                  <div className='font-display uppercase leading-none tracking-widest uppercase text-2xl text-white'>
                    {currentPlanet.name}
                  </div>
                </div>
                <CaretDown
                  size={16}
                  weight='bold'
                  className={clsx(
                    "text-white cursor-pointer hover:opacity-60 transition-opacity transition-transform transform duration-300 ease-in-out",
                    !showSidebar && "rotate-180"
                  )}
                />
              </div>
              {containerTransition((style, item) => (
                <>
                  {item && (
                    <animated.div
                      style={style}
                      className='overflow-y-hidden flex flex-col flex-grow'>
                      <PlanetStats
                        currentPlanet={currentPlanet}
                        planets={planets}
                        planetData={planetData}
                      />
                    </animated.div>
                  )}
                </>
              ))}
            </div>
            <PlanetNavigation
              prevPlanet={prevPlanet.name}
              nextPlanet={nextPlanet.name}
            />
          </div>
        </>
      ) : (
        <div className='flex space-y-4 flex-col justify-between md:justify-between absolute bottom-4 left-4 md:w-full md:max-w-[400px] top-16'>
          <div
            className={clsx(
              "bg-gray-800/30 shadow-2xl shadow-gray-900/80 md:shadow-gray-900/20 rounded-2xl border-2 border-white/10 backdrop-blur-2xl max-h-[calc(100vh-250px)] relative transition-colors duration-300 ease-in-out",
              !showSidebar && "hover:bg-gray-700/30"
            )}>
            <div
              className='flex items-center justify-between p-4 cursor-pointer group'
              onClick={toggleSidebar}>
              <div className='space-y-0'>
                <div className='text-xs font-medium leading-none font-sans tracking-widest uppercase text-teal-400'>
                  Planet
                </div>
                <div className='font-display uppercase leading-none tracking-widest uppercase text-2xl text-white'>
                  {currentPlanet.name}
                </div>
              </div>
              <CaretDown
                size={16}
                weight='bold'
                className={clsx(
                  "text-white group-hover:opacity-60 transition-opacity transition-transform transform duration-300 ease-in-out",
                  showSidebar && "rotate-180"
                )}
              />
            </div>
            {containerTransition((style, item) => (
              <>
                {item && (
                  <animated.div
                    className='container overflow-y-hidden'
                    style={!isMobile ? style : {}}>
                    <PlanetStats
                      currentPlanet={currentPlanet}
                      planets={planets}
                      planetData={planetData}
                    />
                  </animated.div>
                )}
              </>
            ))}
          </div>
          <PlanetNavigation
            prevPlanet={prevPlanet.name}
            nextPlanet={nextPlanet.name}
          />
        </div>
      )}
    </>
  ) : null;
};

export default Sidebar;

const PlanetStats = ({ currentPlanet, planets, planetData }) => {
  const [tempScale, setTempScale] = useState("C");
  return currentPlanet ? (
    <>
      <div className='space-y-6'>
        <p className='text-xs text-white/80 leading-relaxed px-4'>
          {currentPlanet.description}
        </p>
        <div className='bg-white/10 w-full h-0.5' />
      </div>
      <div className='overflow-y-scroll space-y-4 p-4 pb-0 flex flex-col flex-grow md:max-h-[calc(100vh-490px)]'>
        {planets.map(([key, value], i) => {
          return (
            <PlanetInfo
              key={i}
              k={key}
              value={value}
              className={i === planets.length - 1 && "pb-4"}
            />
          );
        })}
      </div>
      <div className='p-4 pt-0 space-y-4'>
        <div className='bg-white/10 w-full h-0.5' />
        <div className='space-y-0.5'>
          <div className='text-xs font-medium leading-none font-sans tracking-widest uppercase text-teal-400'>
            Temperature
          </div>
          <div className='space-x-2 flex items-center w-full justify-between '>
            <div className='text-white text-xl font-semibold leading-none font-sans'>
              {formatTemp(planetData.Temperature, tempScale)}
            </div>
            <div className='flex space-x-1 items-center'>
              {["K", "F", "C"].map((scale, i) => (
                <div
                  key={i}
                  onClick={() => setTempScale(scale)}
                  className={clsx(
                    " min-w-8 h-8 font-bold text-sm rounded-md flex items-center justify-center transition-colors duration-300 ease-in-out",
                    tempScale === scale
                      ? "bg-teal-400/50 text-white cursor-default"
                      : "bg-white/10 text-white/20 hover:bg-white/30 hover:text-white/80 cursor-pointer"
                  )}>
                  {`°${scale}`}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

const PlanetInfo = ({ k, value, className }) => {
  return (
    <div className={clsx("space-y-0.5", className)}>
      <div className='text-xs font-medium leading-none font-sans tracking-widest uppercase text-teal-400'>
        {k}
      </div>
      <div className='text-white text-xl font-semibold leading-none font-sans'>
        {Array.isArray(value) ? (
          <>
            {value[0]} <div className='text-xs text-white/60'>{value[1]}</div>
          </>
        ) : (
          value
        )}
      </div>
    </div>
  );
};

const PlanetNavigation = ({ prevPlanet, nextPlanet }) => {
  const { setCurrentPlanet } = useFeatures();
  const [, get] = useKeyboardControls();

  const handlePlanetChange = (planetName) => {
    setCurrentPlanet(planetName);
    window.history.pushState(null, "", `/?planet=${planetName}`);
  };

  useEffect(() => {
    const handleKeyboard = () => {
      const { left, right } = get();
      if (left) {
        handlePlanetChange(prevPlanet);
      }
      if (right) {
        handlePlanetChange(nextPlanet);
      }
    };
    const interval = setInterval(handleKeyboard, 100);
    return () => clearInterval(interval);
  }, [get, prevPlanet, nextPlanet]);

  return (
    <div className='flex md:flex-col md:space-y-2 max-md:space-x-2'>
      <button
        onClick={() => handlePlanetChange(prevPlanet)}
        className='max-md:w-1/2 max-md:flex-row-reverse flex bg-gray-800/30 shadow-2xl shadow-gray-900/20 rounded-2xl border-2 border-white/10 backdrop-blur-2xl md:space-x-1.5 justify-end md:justify-between md:space-x-4 flex items-center px-2 md:px-4 py-3 hover:bg-gray-600/30 cursor-pointer duration-300 transition-colors'>
        <div className='space-x-1 flex items-center'>
          <img
            src={`/assets/images/${prevPlanet?.toLowerCase()}.png`}
            alt={prevPlanet?.toLowerCase()}
            className='w-6 h-6 md:w-10 md:h-10 drop-shadow-lg'
          />
          <div className='space-y-0'>
            <div className='text-[10px] sm:text-xs font-medium leading-none font-sans text-left tracking-widest uppercase text-teal-400'>
              Previous
            </div>
            <div className='font-display uppercase leading-none tracking-widest uppercase max-sm:text-[2.5vmin] sm:text-md text-white'>
              {prevPlanet}
            </div>
          </div>
        </div>
        <ArrowLeft
          weight='bold'
          className='text-teal-400 w-4 h-4 md:w-8 md:h-8 max-md:mr-2'
        />
      </button>
      <button
        onClick={() => handlePlanetChange(nextPlanet)}
        className='max-md:w-1/2 flex bg-gray-800/30 shadow-2xl shadow-gray-900/20 rounded-2xl border-2 border-white/10 backdrop-blur-2xl flex items-center space-x-1.5 justify-between md:space-x-4 px-2 md:px-4 py-3 hover:bg-gray-600/30 cursor-pointer duration-300 transition-colors'>
        <div className='space-x-1 flex items-center'>
          <img
            src={`/assets/images/${nextPlanet?.toLowerCase()}.png`}
            alt={nextPlanet?.toLowerCase()}
            className='w-6 h-6 md:w-10 md:h-10 drop-shadow-lg'
          />
          <div className='space-y-0'>
            <div className='text-[10px] sm:text-xs font-medium leading-none font-sans text-left tracking-widest uppercase text-teal-400'>
              Next
            </div>
            <div className='font-display uppercase leading-none tracking-widest uppercase max-sm:text-[2.5vmin] sm:text-md text-white'>
              {nextPlanet}
            </div>
          </div>
        </div>
        <ArrowRight
          weight='bold'
          className='text-teal-400 w-4 h-4 md:w-8 md:h-8'
        />
      </button>
    </div>
  );
};
