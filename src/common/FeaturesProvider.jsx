import { createContext, useContext, useMemo, useState } from "react";
import { registerFeatures } from "../fxhash";
import { random_choice } from "./utils";
import { usePlanetData } from "../hooks/usePlanets";

export const FeaturesContext = createContext(null);

const themes = {
  Minimal: {
    lighting: ["#eaecd2", "#fbf7e0"],
    colors: ["red", "green", "blue"],
  },
};

const FeaturesProvider = ({ children }) => {
  const choice = useMemo(() => random_choice(Object.keys(themes)), []);
  const lighting = useMemo(() => random_choice(themes[choice].lighting), []);
  const [currentPlanet, setCurrentPlanet] = useState("Jupiter");
  const curPlanet = usePlanetData(currentPlanet);

  const constantsData = useMemo(() => {
    return {
      name: choice,
      theme: themes[choice],
      lighting: lighting,
      currentPlanet: curPlanet,
      setCurrentPlanet: setCurrentPlanet,
    };
  }, [choice, curPlanet]);

  registerFeatures({
    theme: choice,
  });

  return (
    <FeaturesContext.Provider value={constantsData}>
      {children}
    </FeaturesContext.Provider>
  );
};

export const useFeatures = () => useContext(FeaturesContext);

export default FeaturesProvider;
