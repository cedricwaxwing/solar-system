import clsx from "clsx";
import { useEffect, useState } from "react";
import { useFeatures } from "../common/FeaturesProvider";
import { normalizePlanetData } from "../common/normalizePlanetData";
import { planetsInfo } from "../planets";
import { X } from "@phosphor-icons/react";
import { animated } from "react-spring";
import useIsMobile from "../hooks/useIsMobile";

const Sidebar = ({ fade, display, setShowInfo }) => {
  const { currentPlanet } = useFeatures();
  const isMobile = useIsMobile();
  const [tempScale, setTempScale] = useState("C");
  const [planetData, setPlanetData] = useState({});
  const [prevPlanet, setPrevPlanet] = useState({});
  const [nextPlanet, setNextPlanet] = useState({});

  const formatTemp = (temp, decimals = 2) => {
    if (tempScale === "C") {
      return `${(temp - 273.15).toFixed(decimals)} °C`;
    } else if (tempScale === "F") {
      return `${(((temp - 273.15) * 9) / 5 + 32).toFixed(decimals)} °F`;
    }
    return `${temp} °${tempScale}`;
  };

  const generatePlanetIndices = () => {
    const currentIndex = planetsInfo.findIndex(
      (planet) => planet.name === currentPlanet.name
    );
    const totalPlanets = planetsInfo.length;
    const prevIndex = (currentIndex - 1 + totalPlanets) % totalPlanets;
    const nextIndex = (currentIndex + 1) % totalPlanets;
    return { prev: prevIndex, next: nextIndex };
  };

  useEffect(() => {
    if (currentPlanet) {
      const indices = generatePlanetIndices();
      const prevPlanetInfo = planetsInfo[indices.prev];
      const nextPlanetInfo = planetsInfo[indices.next];

      setPrevPlanet(prevPlanetInfo);
      setNextPlanet(nextPlanetInfo);
    }
  }, [currentPlanet]);

  useEffect(() => {
    if (currentPlanet) {
      setPlanetData(normalizePlanetData(currentPlanet));
    }
  }, [currentPlanet]);

  return currentPlanet ? (
    <>
      <div className='flex flex-col justify-between absolute bottom-4 left-4 w-full md:w-[40vw] lg:max-w-[240px]'>
        <div className='flex max-md:space-x-2 md:flex-col md:space-y-2'>
          <a
            href={`/?planet=${prevPlanet.name}`}
            className='max-md:w-[calc(50%-28px)] flex bg-gray-800/30 shadow-2xl shadow-gray-900/20 rounded-2xl border-2 border-white/10 backdrop-blur-2xl space-x-1.5 md:space-x-4 flex items-center px-4 py-3 hover:bg-gray-600/30 cursor-pointer duration-300 transition-colors'>
            <img
              src={`/assets/images/${prevPlanet?.name?.toLowerCase()}.png`}
              alt={prevPlanet?.name?.toLowerCase()}
              className='w-6 h-6 md:w-10 md:h-10 drop-shadow-lg'
            />
            <div className='space-y-0'>
              <div className='text-[10px] sm:text-xs font-medium leading-none font-sans tracking-widest uppercase text-teal-400'>
                Previous
              </div>
              <div className='font-display uppercase leading-none tracking-widest uppercase max-sm:text-[3vmin] sm:text-md text-white'>
                {prevPlanet?.name}
              </div>
            </div>
          </a>
          <a
            href={`/?planet=${nextPlanet.name}`}
            className='max-md:w-[calc(50%-28px)] flex bg-gray-800/30 shadow-2xl shadow-gray-900/20 rounded-2xl border-2 border-white/10 backdrop-blur-2xl flex items-center space-x-1.5 md:space-x-4 px-4 py-3 hover:bg-gray-600/30 cursor-pointer duration-300 transition-colors'>
            <img
              src={`/assets/images/${nextPlanet?.name?.toLowerCase()}.png`}
              alt={nextPlanet?.name?.toLowerCase()}
              className='w-6 h-6 md:w-10 md:h-10 drop-shadow-lg'
            />
            <div className='space-y-0'>
              <div className='text-[10px] sm:text-xs font-medium leading-none font-sans tracking-widest uppercase text-teal-400'>
                Next
              </div>
              <div className='font-display uppercase leading-none tracking-widest uppercase max-sm:text-[3vmin] sm:text-md text-white'>
                {nextPlanet.name}
              </div>
            </div>
          </a>
        </div>
      </div>
      {isMobile && (
        <animated.div
          onClick={() => setShowInfo(false)}
          className='fixed inset-0 bg-gray-800/50 md:hidden backdrop-blur-2xl z-0'
          style={{
            ...fade,
            display: display,
          }}
        />
      )}
      <animated.div
        className='flex flex-col justify-center md:justify-between absolute bottom-4 right-4 md:w-full md:max-w-[300px] max-md:left-4 max-md:top-[80px]'
        style={{
          ...fade,
          display: display,
        }}>
        <div className='bg-gray-800/30 shadow-2xl shadow-gray-900/80 md:shadow-gray-900/20 rounded-2xl border-2 border-white/10 backdrop-blur-2xl max-h-[calc(100vh-80px)] md:flex md:flex-col md:flex-grow relative'>
          <X
            size={16}
            weight='bold'
            className='text-white absolute right-4 top-4'
            onClick={() => setShowInfo(false)}
          />
          <div className='space-y-6'>
            <div className='space-y-0 p-4 pb-0'>
              <div className='text-xs font-medium leading-none font-sans tracking-widest uppercase text-teal-400'>
                Planet
              </div>
              <div className='font-display uppercase leading-none tracking-widest uppercase text-2xl text-white'>
                {currentPlanet.name}
              </div>
            </div>
            <p className='text-xs text-white/80 leading-relaxed px-4'>
              {currentPlanet.description}
            </p>
            <div className='bg-white/10 w-full h-0.5' />
          </div>
          <div className='overflow-y-auto space-y-4 p-4 pb-0 flex flex-col flex-grow'>
            {Object.entries(planetData)
              .filter(([key]) => key !== "Temperature")
              .map(([key, value], i) => {
                return (
                  <PlanetInfo
                    key={i}
                    k={key}
                    value={value}
                    className={
                      i === Object.keys(planetData).length - 2 && "pb-4"
                    }
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
                  {formatTemp(planetData.Temperature)}
                </div>
                <div className='flex space-x-1 items-center'>
                  {["K", "F", "C"].map((scale, i) => (
                    <div
                      key={i}
                      onClick={() => setTempScale(scale)}
                      className={clsx(
                        " min-w-8 h-8 font-bold text-sm rounded-md flex items-center justify-center cursor-pointer",
                        tempScale === scale
                          ? "bg-teal-400/50 text-white"
                          : "bg-white/20 text-white/50 hover:bg-white/30 hover:text-white/80"
                      )}>
                      {`°${scale}`}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </animated.div>
    </>
  ) : null;
};

export default Sidebar;

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
