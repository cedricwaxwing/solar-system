export const { sunScale, planetOffset } = {
  sunScale: 0.25,
  planetOffset: 50,
  planetScale: 0.5,
};

export const planetsInfo = [
  {
    name: "Sun",
    scale: 109.2 * 0.75,
    distance: 0,
    orbitDuration: 1,
    rotationDuration: 0.01,
  },
  {
    name: "Mercury",
    distance: 120 * sunScale + planetOffset,
    scale: 0.383,
    orbitDuration: 88,
    rotationDuration: 58.6,
  },
  {
    name: "Venus",
    distance: 220 * sunScale + planetOffset,
    scale: 0.949,
    orbitDuration: 225,
    rotationDuration: -243,
  },
  {
    name: "Earth",
    distance: 320 * sunScale + planetOffset,
    scale: 1.0,
    orbitDuration: 365.25,
    rotationDuration: 1,
  },
  {
    name: "Mars",
    distance: 420 * sunScale + planetOffset,
    scale: 0.532,
    orbitDuration: 687,
    rotationDuration: 1.03,
  },
  {
    name: "Jupiter",
    distance: 620 * sunScale + planetOffset,
    scale: 11.21,
    orbitDuration: 4333,
    rotationDuration: 0.41,
  },
  {
    name: "Saturn",
    distance: 920 * sunScale + planetOffset,
    scale: 9.45,
    orbitDuration: 10759,
    rotationDuration: 0.45,
  },
  {
    name: "Uranus",
    distance: 1120 * sunScale + planetOffset,
    scale: 4.01,
    orbitDuration: 30688,
    rotationDuration: -0.72,
  },
  {
    name: "Neptune",
    distance: 1320 * sunScale + planetOffset,
    scale: 3.88,
    orbitDuration: 60182,
    rotationDuration: 0.67,
  },
  {
    name: "Pluto",
    distance: 1520 * sunScale + planetOffset,
    scale: 0.186,
    orbitDuration: 90560,
    rotationDuration: 6.39,
  },
];
