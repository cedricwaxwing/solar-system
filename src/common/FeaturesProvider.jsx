import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { usePlanetData } from "../hooks/usePlanets";

export const FeaturesContext = createContext(null);

const FeaturesProvider = ({ children }) => {
  const getPlanetFromURL = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("planet") || "Mercury";
  };

  const [currentPlanet, setCurrentPlanet] = useState(getPlanetFromURL());
  const curPlanet = usePlanetData(currentPlanet);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPlanet(getPlanetFromURL());
    };

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const constantsData = useMemo(() => {
    return {
      currentPlanet: curPlanet,
      setCurrentPlanet: setCurrentPlanet,
    };
  }, [curPlanet]);

  return (
    <FeaturesContext.Provider value={constantsData}>
      {children}
    </FeaturesContext.Provider>
  );
};

export const useFeatures = () => useContext(FeaturesContext);

export default FeaturesProvider;
