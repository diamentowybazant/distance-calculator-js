/**
 * Signed decimal degrees without compass direction.
 */
interface Coordinates {
  lat: number;
  long: number;
}

/**
 * List of all supported units.
 * 
 * m - metre
 * M - mile
 * km - kilometre
 * ft - foot
 */
const SUPPORTED_UNIT = {
  m: 'm',
  M: 'M',
  km: 'km',
  ft: 'ft',
}

/**
 * Earth radius = 6 371 km.
 */
const R = 6371e3;

/**
 * Degrees to radians.
 */
const degToRad = (deg: number): number => deg * (Math.PI / 180);

/**
 * Calculate the distance between two coordinates to metres.
 */
const calculateDistance = (coordinates1: Coordinates, coordinates2: Coordinates): number => {
  if (coordinates1.lat === coordinates2.lat && coordinates1.long === coordinates2.long) {
    return 0;
  }

  const a = Math.pow(Math.sin(degToRad(coordinates2.lat - coordinates1.lat) / 2), 2)
    + Math.cos(degToRad(coordinates1.lat)) * Math.cos(degToRad(coordinates2.lat))
    * Math.pow(Math.sin(degToRad(coordinates2.long - coordinates1.long) / 2), 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return R * c;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const instanceOfCoordinates = (object: any): object is Coordinates => 'lat' in object && 'long' in object;

/**
 * Calculate the distance between two coordinates to the given unit.
 * Default unit is metre.
 */
const calculate = (coordinates1: Coordinates, coordinates2: Coordinates, unit: string = SUPPORTED_UNIT.m): number => {
  if (typeof coordinates1 !== 'object' || !instanceOfCoordinates(coordinates1)) {
    throw new Error('[distance-calculator-js]: coordinates1 is not an instance of Coordinates');
  }

  if (typeof coordinates2 !== 'object' || !instanceOfCoordinates(coordinates2)) {
    throw new Error('[distance-calculator-js]: coordinates2 is not an instance of Coordinates');
  }

  const m = calculateDistance(coordinates1, coordinates2);
  switch (unit) {
    case SUPPORTED_UNIT.km:
      return Math.round(m * 0.001);
    case SUPPORTED_UNIT.M:
      return Math.round(m * 0.000621371192);
    case SUPPORTED_UNIT.ft:
      return Math.round(m * 3.2808399);
    default:
      return Math.round(m);
  }
};

module.exports = {
  calculate,
  SUPPORTED_UNIT,
}
