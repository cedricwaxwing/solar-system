const JUPITER_MASS = 1.898e27; // in kilograms
const JUPITER_RADIUS = 69911; // in kilometers

export const normalizePlanetData = (planetData) => {
  const mass = planetData.mass * JUPITER_MASS;
  const radius = planetData.radius * JUPITER_RADIUS;
  return {
    Mass: [
      `${formatNumberWithScale(mass)} Kg`,
      `${Number(mass).toLocaleString()} Kg`,
    ],
    Radius: `${formatNumberWithScale(radius)} Km`,
    Rotation:
      planetData.name === "Sun" ? null : `${planetData.semi_major_axis}°`,
    "Distance From Earth":
      planetData.name === "Sun"
        ? null
        : lightYearsToKilometers(planetData.distance_light_year),
    "Rotation Duration":
      planetData.name === "Sun"
        ? null
        : `${Math.abs(
            Number(planetData.rotationDuration.toFixed(2))
          ).toLocaleString()} Day${
            planetData.rotationDuration === 1 ? "" : "s"
          }`,
    "Orbit Duration":
      planetData.name === "Sun"
        ? null
        : `${Number(planetData.period.toFixed(2)).toLocaleString()} Days`,
    Temperature: planetData.temperature,
  };
};

function getScaleName(exponent) {
  const scales = {
    3: "Thousand",
    6: "Million",
    9: "Billion",
    12: "Trillion",
    15: "Quadrillion",
    18: "Quintillion",
    21: "Sextillion",
    24: "Septillion",
    27: "Octillion",
    30: "Nonillion",
    33: "Decillion",
    36: "Undecillion",
    39: "Duodecillion",
    42: "Tredecillion",
    45: "Quattuordecillion",
    48: "Quindecillion",
    51: "Sexdecillion",
    54: "Septemdecillion",
    57: "Octodecillion",
    60: "Novemdecillion",
    63: "Vigintillion",
    66: "Unvigintillion",
    69: "Duovigintillion",
    72: "Trevigintillion",
    75: "Quattuorvigintillion",
    78: "Quinvigintillion",
    81: "Sexvigintillion",
    84: "Septvigintillion",
    87: "Octovigintillion",
    90: "Nonvigintillion",
    93: "Trigintillion",
    96: "Untrigintillion",
    99: "Duotrigintillion",
    100: "Googol",
  };

  // Find the closest scale name based on the exponent, without exceeding it
  let scaleName = "";
  for (const scaleExponent of Object.keys(scales).sort((a, b) => a - b)) {
    if (exponent >= scaleExponent) {
      scaleName = scales[scaleExponent];
    } else {
      break;
    }
  }

  return scaleName;
}

function formatNumberWithScale(number) {
  if (number >= 1000000) {
    // Convert number to scientific notation to easily extract exponent
    const exponent = Math.floor(Math.log10(Math.abs(number)));
    const scaleName = getScaleName(exponent);
    const divisor = Math.pow(10, exponent - (exponent % 3)); // Normalize to the closest thousand multiplier
    const scaledNumber = (number / divisor).toFixed(2); // Keep two decimal places
    return `${scaledNumber} ${scaleName}`.trim();
  } else {
    return Number(number.toFixed(2)).toLocaleString();
  }
}

function lightYearsToKilometers(lightYears) {
  const kilometersPerLightYear = 9.461e12;
  return `${Number(
    (lightYears * kilometersPerLightYear).toFixed(2)
  ).toLocaleString()} Km`;
}
