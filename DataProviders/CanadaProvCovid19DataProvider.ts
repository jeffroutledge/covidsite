import axios from 'axios';
import Location from "../Models/Location"

class CanadaProvCovid19DataProvider {
        private config = {
        baseURL: 'https://services9.arcgis.com/pJENMVYPQqZZe20v/arcgis/rest/services',
        timeout: 1000,
        headers: {
            'content-type': 'JSON',
        }
    };
    public async getDataForProv(provTerritory: String) {
        const result = await axios.get(`Join_Features_to_Enriched_Population_Case_Data_By_Province_Polygon/FeatureServer/0/query?where=NAME%20%3D%20\'${provTerritory}\'&outFields=OBJECTID,NAME,Recovered,Tests,Last_Updated,SourceURL,ActiveCases,Hospitalized,ICU,ICUVent,Deaths,Case_Total,GlobalID_2,Vaccinated,Abbreviation&returnGeometry=false&outSR=&f=json`, this.config);
        return result.data;
    }
    public async getCanadaProvCovid19StatsForLastMonth(location: Location, dateFrom: string, dateTo: string) {
        const result = await axios.get(`province_daily_totals/FeatureServer/0/query?where=SummaryDate%20%3E%3D%20TIMESTAMP%20\'${dateFrom}%2000%3A00%3A00\'%20AND%20SummaryDate%20%3C%3D%20TIMESTAMP%20\'${dateTo}%2000%3A00%3A00\'AND%20Province%20%3D%20\'${location.Territory.toUpperCase()}\'&outFields=*&returnGeometry=false&outSR=4326&f=json`, this.config);
        return result.data;
    }
}

export default CanadaProvCovid19DataProvider;