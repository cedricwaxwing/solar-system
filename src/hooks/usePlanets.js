import { useState, useEffect } from "react";
import { planetsInfo } from "../planets";

export const usePlanetData = (planetName) => {
  const PLANETS_ENDPOINT = `https://api.api-ninjas.com/v1/planets?name=${planetName}`;
  const [planetData, setPlanetData] = useState(null);

  useEffect(() => {
    const fetchPlanetData = async () => {
      try {
        const response = await fetch(PLANETS_ENDPOINT, {
          headers: { "X-Api-Key": "PjNUUs81Z76Ifgjn5jvCHjYverdrqFQmp3wsRo5i" },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const planetInfo = planetsInfo.find(
          (planet) => planet.name === planetName
        );
        setPlanetData({
          ...data[0],
          rotationDuration: planetInfo["rotationDuration"],
        });
      } catch (error) {
        console.error("could not fetch planet data: ", error);
      }
    };

    fetchPlanetData();
  }, [planetName]);

  return planetData;
};
