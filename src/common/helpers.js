export const mapValue = (n, start1, stop1, start2, stop2) => {
  return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};

export const formatTemp = (temp, tempScale, decimals = 2) => {
  if (tempScale === "C") {
    return `${(temp - 273.15).toFixed(decimals)} °C`;
  } else if (tempScale === "F") {
    return `${(((temp - 273.15) * 9) / 5 + 32).toFixed(decimals)} °F`;
  }
  return `${temp} °${tempScale}`;
};

export const generatePlanetIndices = (planetsInfo, currentPlanet) => {
  const currentIndex = planetsInfo.findIndex(
    (planet) => planet.name === currentPlanet.name
  );
  const totalPlanets = planetsInfo.length;
  const prevIndex = (currentIndex - 1 + totalPlanets) % totalPlanets;
  const nextIndex = (currentIndex + 1) % totalPlanets;
  return { prev: prevIndex, next: nextIndex };
};

export const degreesToRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

export const calculateSpeed = (rotationDuration) => {
  let speed = Math.abs(rotationDuration ? 0.2 / rotationDuration : 0.5);
  speed = mapValue(speed, 0.5, 0.0008, 1, 0.08);
  return speed;
};
