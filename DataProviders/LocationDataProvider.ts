import axios from 'axios';
import Location from '../Models/Location'

class LocationDataProvider {
    private config = {
        baseURL: 'https://api.mapbox.com',
        timeout: 2000,
    };

    public async getLocationDataFromCoordinates(location : Location) {
        const url = `/geocoding/v5/mapbox.places/${location.Longitude},${location.Latitude}.json?access_token=pk.eyJ1IjoiZGV4dGVyaGFydmV5IiwiYSI6ImNrcDhtY2p1dDBhMHIyd28xNHVnaXVxMjMifQ.sQgjJ-2E64Kz9zw2mfv-Kw`;
        console.log(url);
        const result = await axios.get(url, this.config);
        return result.data;
    }
}
export default LocationDataProvider;