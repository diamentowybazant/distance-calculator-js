# distance-calculator-js

Calculate the distance between two coordinates (points).

## Introduction

This library uses _Haversine formula_ to calculate the distance between two coordinates (points).

## Installing

Using yarn.

```
$ yarn add distance-calculator-js
```

Using npm.

```
$ npm install distance-calculator-js
```

## Getting Started

Using import.

```javascript
import DistanceCalculator from 'distance-calculator-js';
```

Using require.

```javascript
const DistanceCalculator = require('distance-calculator-js');
```

### Examples

calculate(coordinates1, coordinates2, [unit]).

Using import.

```javascript
import DistanceCalculator from 'distance-calculator-js';

// => Signed decimal degrees without compass direction
const Tokyo = { lat: 35.652832, long: 139.839478 };
const NewYork = { lat: 40.730610, long: -73.935242 };

const m = DistanceCalculator.calculate(Tokyo, NewYork);
// => 10847782 (in metres)
```

If you want to use a different unit, just simply pass it as a third argument of the calculate method.

Using import.

```javascript
import DistanceCalculator, { SUPPORTED_UNIT } from 'distance-calculator-js';

// => Signed decimal degrees without compass direction
const Tokyo = { lat: 35.652832, long: 139.839478 };
const NewYork = { lat: 40.730610, long: -73.935242 };

const km = DistanceCalculator.calculate(Tokyo, NewYork, 'km');
// => 10848 (in kilometres)

const ft = DistanceCalculator.calculate(Tokyo, NewYork, SUPPORTED_UNIT.ft);
// => 35589836 (in feet)
```

Using require.

```javascript
const DistanceCalculator = require('distance-calculator-js');

// => Signed decimal degrees without compass direction
const Tokyo = { lat: 35.652832, long: 139.839478 };
const NewYork = { lat: 40.730610, long: -73.935242 };

const km = DistanceCalculator.calculate(Tokyo, NewYork, 'km');
// => 10848 (in kilometres)

const ft = DistanceCalculator.calculate(Tokyo, NewYork, DistanceCalculator.SUPPORTED_UNIT.ft);
// => 35589836 (in feet)
```

Warning! All values are rounded, so the distance between Tokyo and New York will be _10847782.01587274 metres_ and will be rounded to _10847782 metres_ and _10847.7820159 kilometres_ will be rounded to _10848 kilometres_.

### Supported units

This is the list of all supported units. If you want to use a different unit, just simply pass it as a third argument of the calculate method.

- **m** (metre) - default
- km (kilometre)
- M (mile)
- ft (foot)

## License

This library is licensed under the [MIT License](LICENSE).

## Acknowledgments

* Inspiration by [Chris Veness / Movable Type](https://www.movable-type.co.uk/scripts/latlong.html).
