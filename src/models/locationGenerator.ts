import {LatLon} from "geolocation-utils";
const randomLocation = require('random-location');

const radius = 1200; // 1.2 km is estimated comfortable walking distance for 15 min
export function getRandomLocation(loc: LatLon): LatLon {
    const location = {
        latitude: loc.lat,
        longitude: loc.lon
    }
    const randomPoint = randomLocation.randomCirclePoint(location, radius);
    return {
        lat: randomPoint.latitude,
        lon: randomPoint.longitude
    }
}
