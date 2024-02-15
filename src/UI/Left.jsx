import { CaretCircleRight } from "@phosphor-icons/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useFeatures } from "../common/FeaturesProvider";
import { normalizePlanetData } from "../common/normalizePlanetData";

const Left = () => {
  const [tempScale, setTempScale] = useState("C");
  const [planetData, setPlanetData] = useState({});
  const { currentPlanet } = useFeatures();

  useEffect(() => {
    if (currentPlanet) {
      setPlanetData(normalizePlanetData(currentPlanet));
    }
  }, [currentPlanet]);

  const formatTemp = (temp, decimals = 2) => {
    if (tempScale === "C") {
      return `${(temp - 273.15).toFixed(decimals)} °C`;
    } else if (tempScale === "F") {
      return `${(((temp - 273.15) * 9) / 5 + 32).toFixed(decimals)} °F`;
    }
    return `${temp} °${tempScale}`;
  };

  return currentPlanet ? (
    <div className='flex flex-col justify-between absolute bottom-4 top-[80px] left-4 w-full max-w-[300px]'>
      <div className='bg-gray-800/30 shadow-2xl shadow-gray-900/20 rounded-2xl border-2 border-white/10 backdrop-blur-2xl'>
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
            Jupiter is the fifth planet from the Sun and the largest in the
            Solar System. It is a gas giant with a mass more than two and a half
            times that of all the other planets in the Solar System combined,
            but slightly less than one-thousandth the mass of the Sun.
          </p>
          <div className='bg-white/10 w-full h-0.5' />
        </div>
        <div className='max-h-[calc(100vh-400px)] overflow-y-auto space-y-4 p-4 pb-0'>
          {Object.entries(planetData)
            .filter(([key]) => key !== "Temperature")
            .map(([key, value], i) => {
              return (
                <PlanetInfo
                  key={i}
                  k={key}
                  value={value}
                  className={i === Object.keys(planetData).length - 2 && "pb-4"}
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
    </div>
  ) : null;
};

export default Left;

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
