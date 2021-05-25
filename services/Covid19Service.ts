import Covid19DataProvider from '../DataProviders/Covid19DataProvider';
import Location from '../Models/Location';
import moment from 'moment';

class Covid19Service {
    public async getCovidStatsByLocation (location: Location): Promise<any>
    {
        const result = await new Covid19DataProvider().getCovid19StatsByCountry(location.Country);

        console.log(result)

        return result;  
    }
    public async getWorldCovidStatsForWeek() {
        const dateTo = moment();
        const dateFrom = dateTo.subtract(1, "week");

        const result = await new Covid19DataProvider().getWorldCovid19StatsForLastWeek(dateFrom.format(), dateTo.format());
        
        return result;
    }
}

export default Covid19Service;