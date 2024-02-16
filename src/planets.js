export const { sunScale, planetOffset, planetScale } = {
  sunScale: 0.25,
  planetOffset: 50,
  planetScale: 0.2,
};

const translateX = (1520 * sunScale + planetOffset * planetScale) / 2;

export const planetsInfo = [
  {
    index: 0,
    name: "Sun",
    description:
      "The Sun is the star at the center of the Solar System. It's a nearly perfect sphere of hot plasma, radiating energy through nuclear fusion that converts hydrogen into helium. The Sun provides the necessary light and heat to sustain life on Earth and drives the climate and weather patterns across the Solar System. It contains 99.8% of the total mass of the Solar System, making it the largest object in our cosmic neighborhood.",
    scale: 109.2 * 0.75 * planetScale,
    distance: 0 * planetScale - translateX,
    orbitDuration: 1,
    rotationDuration: 0.01,
  },
  {
    index: 1,
    name: "Mercury",
    description:
      "The closest planet to the Sun, Mercury is the smallest and fastest orbiting planet in the Solar System. It's a rocky body with extreme temperature variations and virtually no atmosphere.",
    distance: 120 * sunScale + planetOffset * planetScale - translateX,
    scale: 0.383 * planetScale,
    orbitDuration: 88,
    rotationDuration: 58.6,
  },
  {
    index: 2,
    name: "Venus",
    description:
      "Second from the Sun, Venus is similar in size and structure to Earth but with a toxic atmosphere and extreme surface temperatures. It's the hottest planet in our Solar System due to its thick, greenhouse gas-rich atmosphere.",
    distance: 220 * sunScale + planetOffset * planetScale - translateX,
    scale: 0.949 * planetScale,
    orbitDuration: 225,
    rotationDuration: -243,
  },
  {
    index: 3,
    name: "Earth",
    description:
      "The third planet from the Sun and the only known planet to support life. Earth has a diverse atmosphere, vast oceans, and a unique ability to maintain water in all three states: solid, liquid, and gas.",
    distance: 320 * sunScale + planetOffset * planetScale - translateX,
    scale: 1.0 * planetScale,
    orbitDuration: 365.25,
    rotationDuration: 1,
  },
  {
    index: 4,
    name: "Mars",
    description:
      "Known as the Red Planet, Mars is the fourth planet from the Sun. It's a cold desert world with a thin atmosphere, featuring surface conditions that include valleys, deserts, and polar ice caps.",
    distance: 420 * sunScale + planetOffset * planetScale - translateX,
    scale: 0.532 * planetScale,
    orbitDuration: 687,
    rotationDuration: 1.03,
  },
  {
    index: 5,
    name: "Jupiter",
    description:
      "The fifth planet from the Sun and the largest in the Solar System. It's a gas giant with a mass more than two and a half times that of all other planets combined, but slightly less than one-thousandth the mass of the Sun.",
    distance: 620 * sunScale + planetOffset * planetScale - translateX,
    scale: 11.21 * planetScale,
    orbitDuration: 4333,
    rotationDuration: 0.41,
  },
  {
    index: 6,
    name: "Saturn",
    description:
      "The sixth planet from the Sun and the second-largest in the Solar System. Known for its prominent ring system, Saturn is a gas giant with a composition similar to Jupiter's, but with a less dense core.",
    distance: 920 * sunScale + planetOffset * planetScale - translateX,
    scale: 9.45 * planetScale,
    orbitDuration: 10759,
    rotationDuration: 0.45,
  },
  {
    index: 7,
    name: "Uranus",
    description:
      "The seventh planet from the Sun, Uranus is a gas giant with a unique sideways rotation. It has a blue-green color due to methane in its atmosphere and is known for its cold temperatures and complex ring system.",
    distance: 1120 * sunScale + planetOffset * planetScale - translateX,
    scale: 4.01 * planetScale,
    orbitDuration: 30688,
    rotationDuration: -0.72,
  },
  {
    index: 8,
    name: "Neptune",
    description:
      "The eighth and farthest known planet from the Sun in the Solar System. Neptune is a gas giant, similar to Uranus, with a deep blue color due to atmospheric methane. It's known for strong wind storms and has a very active climate.",
    distance: 1320 * sunScale + planetOffset * planetScale - translateX,
    scale: 3.88 * planetScale,
    orbitDuration: 60182,
    rotationDuration: 0.67,
  },
  {
    index: 9,
    name: "Pluto",
    description:
      "Once considered the ninth planet, Pluto is now classified as a dwarf planet in the Kuiper Belt, a region of the Solar System beyond Neptune filled with icy bodies and remnants from its formation. Pluto is known for its complex surface, with regions of stark contrast, including vast plains, towering mountains, and a large heart-shaped glacier. Despite its small size and distant location, Pluto has five known moons, with Charon being the largest and closest, sharing a unique gravitational relationship.",
    distance: 1520 * sunScale + planetOffset * planetScale - translateX,
    scale: 0.186 * planetScale,
    orbitDuration: 90560,
    rotationDuration: 6.39,
  },
];
