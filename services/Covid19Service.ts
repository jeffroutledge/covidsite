import Covid19DataProvider from '../DataProviders/Covid19DataProvider';
import CanadaCovid19DataProvider from '../DataProviders/CanadaCovid19DataProvider';
import CanadaProvCovid19DataProvider from '../DataProviders/CanadaProvCovid19DataProvider'
import Location from '../Models/Location';
import moment from 'moment';

class Covid19Service {
    public async getCovidStatsByLocation (location: Location): Promise<any>
    {
        const result = await new Covid19DataProvider().getCovid19StatsByCountry(location.Country);

        console.log(result)

        return result;  
    }
    public async getWorldCovidStatsForMonth() {
        const dateTo = moment().subtract(1, 'hour').utc(); // api can't function within an hour of current time, feex
        const dateFrom = moment().subtract(1, 'month').subtract(1, 'hour').utc();

        const result = await new Covid19DataProvider().getWorldCovid19StatsForLastMonth(dateFrom.format(), dateTo.format());
        
        return result;
    }
    public async getCovidStatsByCanadaProvTerritoryForMonth (location: Location) {
        const dateTo = moment().format('YYYY-MM-DD').toString();
        const dateFrom = moment().subtract(1, 'month').format('YYYY-MM-DD').toString();
        const result = await new CanadaProvCovid19DataProvider().getCanadaProvCovid19StatsForLastMonth(location, dateFrom, dateTo);
        
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