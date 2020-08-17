// eslint-disable-next-line @typescript-eslint/no-var-requires
const DistanceCalculator = require('../calculator');

const mockCoordinates = (lat: number, long: number): { lat: number; long: number } => ({ lat, long });

const TOKYO = mockCoordinates(35.652832, 139.839478);
const LONDON = mockCoordinates(51.509865, -0.118092);
const NEW_YORK = mockCoordinates(40.730610, -73.935242);
const LOS_ANGELES = mockCoordinates(34.052235, -118.243683);

const METRES = [
  // Tokyo -> X
  [TOKYO, TOKYO, 0],
  [TOKYO, LONDON, 9567227],
  [TOKYO, NEW_YORK, 10847782],
  [TOKYO, LOS_ANGELES, 8806764],
  // London -> X
  [LONDON, TOKYO, 9567227],
  [LONDON, LONDON, 0],
  [LONDON, NEW_YORK, 5564885],
  [LONDON, LOS_ANGELES, 8755916],
  // New York -> X
  [NEW_YORK, TOKYO, 10847782],
  [NEW_YORK, LONDON, 5564885],
  [NEW_YORK, NEW_YORK, 0],
  [NEW_YORK, LOS_ANGELES, 3941566],
  // Los Angeles -> X
  [LOS_ANGELES, TOKYO, 8806764],
  [LOS_ANGELES, LONDON, 8755916],
  [LOS_ANGELES, NEW_YORK, 3941566],
  [LOS_ANGELES, LOS_ANGELES, 0],
];

test.each(METRES)('correctly calculates the distance between two coordinates (default = m) = %p, %p', (coordinates1, coordinates2, expected) => {
  expect(DistanceCalculator.calculate(coordinates1, coordinates2)).toBe(expected);
});

test.each([
  // Tokyo -> X
  [TOKYO, TOKYO, 0],
  [TOKYO, LONDON, 9567],
  [TOKYO, NEW_YORK, 10848],
  [TOKYO, LOS_ANGELES, 8807],
  // London -> X
  [LONDON, TOKYO, 9567],
  [LONDON, LONDON, 0],
  [LONDON, NEW_YORK, 5565],
  [LONDON, LOS_ANGELES, 8756],
  // New York -> X
  [NEW_YORK, TOKYO, 10848],
  [NEW_YORK, LONDON, 5565],
  [NEW_YORK, NEW_YORK, 0],
  [NEW_YORK, LOS_ANGELES, 3942],
  // Los Angeles -> X
  [LOS_ANGELES, TOKYO, 8807],
  [LOS_ANGELES, LONDON, 8756],
  [LOS_ANGELES, NEW_YORK, 3942],
  [LOS_ANGELES, LOS_ANGELES, 0],
])('correctly calculates the distance between two coordinates (km) = %p, %p', (coordinates1, coordinates2, expected) => {
  expect(DistanceCalculator.calculate(coordinates1, coordinates2, DistanceCalculator.SUPPORTED_UNIT.km)).toBe(expected);
});

test.each([
  // Tokyo -> X
  [TOKYO, TOKYO, 0],
  [TOKYO, LONDON, 5945],
  [TOKYO, NEW_YORK, 6740],
  [TOKYO, LOS_ANGELES, 5472],
  // London -> X
  [LONDON, TOKYO, 5945],
  [LONDON, LONDON, 0],
  [LONDON, NEW_YORK, 3458],
  [LONDON, LOS_ANGELES, 5441],
  // New York -> X
  [NEW_YORK, TOKYO, 6740],
  [NEW_YORK, LONDON, 3458],
  [NEW_YORK, NEW_YORK, 0],
  [NEW_YORK, LOS_ANGELES, 2449],
  // Los Angeles -> X
  [LOS_ANGELES, TOKYO, 5472],
  [LOS_ANGELES, LONDON, 5441],
  [LOS_ANGELES, NEW_YORK, 2449],
  [LOS_ANGELES, LOS_ANGELES, 0],
])('correctly calculates the distance between two coordinates (M) = %p, %p', (coordinates1, coordinates2, expected) => {
  expect(DistanceCalculator.calculate(coordinates1, coordinates2, DistanceCalculator.SUPPORTED_UNIT.M)).toBe(expected);
});

test.each([
  // Tokyo -> X
  [TOKYO, TOKYO, 0],
  [TOKYO, LONDON, 31388541],
  [TOKYO, NEW_YORK, 35589836],
  [TOKYO, LOS_ANGELES, 28893584],
  // London -> X
  [LONDON, TOKYO, 31388541],
  [LONDON, LONDON, 0],
  [LONDON, NEW_YORK, 18257496],
  [LONDON, LOS_ANGELES, 28726759],
  // New York -> X
  [NEW_YORK, TOKYO, 35589836],
  [NEW_YORK, LONDON, 18257496],
  [NEW_YORK, NEW_YORK, 0],
  [NEW_YORK, LOS_ANGELES, 12931648],
  // Los Angeles -> X
  [LOS_ANGELES, TOKYO, 28893584],
  [LOS_ANGELES, LONDON, 28726759],
  [LOS_ANGELES, NEW_YORK, 12931648],
  [LOS_ANGELES, LOS_ANGELES, 0],
])('correctly calculates the distance between two coordinates (ft) = %p, %p', (coordinates1, coordinates2, expected) => {
  expect(DistanceCalculator.calculate(coordinates1, coordinates2, DistanceCalculator.SUPPORTED_UNIT.ft)).toBe(expected);
});

test.each(METRES)('correctly calculates the distance between two coordinates when the given unit is not supported = %p, %p', (coordinates1, coordinates2, expected) => {
  expect(DistanceCalculator.calculate(coordinates1, coordinates2, 'yd')).toBe(expected);
});

test('should throw an error when no arguments were given or the arguments are not valid', () => {
  expect(() => {
    DistanceCalculator.calculate();
  }).toThrow();

  expect(() => {
    DistanceCalculator.calculate(TOKYO.lat, TOKYO.long, NEW_YORK.lat, NEW_YORK.long);
  }).toThrow();

  expect(() => {
    DistanceCalculator.calculate({ latitued: TOKYO.lat, longitude: TOKYO.long });
  }).toThrow();

  expect(() => {
    DistanceCalculator.calculate({ lat: TOKYO.lat, long: TOKYO.long });
  }).toThrow();
});
