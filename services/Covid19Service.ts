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
        const dateTo = moment().subtract(1, "hour").utc(); // api can't function within an hour of current time, feex
        const dateFrom = moment().subtract(1, "month").subtract(1, "hour").utc();

        const result = await new Covid19DataProvider().getWorldCovid19StatsForLastWeek(dateFrom.format(), dateTo.format());
        
        return result;
    }
}

export default Covid19Service;