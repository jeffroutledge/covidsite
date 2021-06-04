import LocationDataProvider from '../DataProviders/LocationDataProvider';


class LocationService {
    public async getLocationByCoordinates(longitude: number, latitude: number): Promise<any> {
        const result = await new LocationDataProvider().getLocationDataFromCoordinates(latitude, longitude);
        return result;
    }
}

export default LocationService;