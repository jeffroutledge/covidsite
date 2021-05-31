import Covid19DataProvider from '../DataProviders/Covid19DataProvider';
import CanadaCovid19DataProvider from '../DataProviders/CanadaCovid19DataProvider';
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
        const dateTo = moment().subtract(1, 'hour').utc(); // api can't function within an hour of current time, feex
        const dateFrom = moment().subtract(1, 'month').subtract(1, 'hour').utc();

        const result = await new Covid19DataProvider().getWorldCovid19StatsForLastWeek(dateFrom.format(), dateTo.format());
        
        return result;
    }
    public async getCovidStatsByCanadaProvTerritory (location: Location): Promise<any>
    {
        const result = await new CanadaCovid19DataProvider().getDataForProv(location.Territory);
        return result;
    }
    public async getCovidStatsForCanada(): Promise<any> {
        const currentDay = moment().format('YYYY-MM-DD').toString();
        const previousDay = moment().subtract(1, 'day').format('YYYY-MM-DD').toString();
        const result = await new CanadaCovid19DataProvider().getDataForCountry(currentDay, previousDay);
        return result;
    }
}

export default Covid19Service;