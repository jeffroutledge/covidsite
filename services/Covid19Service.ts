import Covid19DataProvider from '../DataProviders/Covid19DataProvider';
import Location from '../Models/Location';

class Covid19Service {
    public async getCovidStatsByLocation (location: Location): Promise<any>
    {
        const result = await new Covid19DataProvider().getCovid19StatsByCountry(location.Country);

        return result;
    }
}

export default Covid19Service;