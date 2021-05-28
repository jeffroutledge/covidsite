import Location from '../Models/Location';
import LocationDataProvider from '../DataProviders/LocationDataProvider';


class LocationService {
    public async getLocationByCoordinates(location: Location): Promise<any> {
        const result = await new LocationDataProvider().getLocationDataFromCoordinates(location);
        return result;
    }
}
export default LocationService;