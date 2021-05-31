import axios from 'axios';

class CanadaCovid19DataProvider {
        private config = {
        baseURL: 'https://services9.arcgis.com/pJENMVYPQqZZe20v/arcgis/rest/services',
        timeout: 1000,
        headers: {
            'content-type': 'JSON',
        }
    };
    public async getDataForProv(provTerritory: string) {
        const result = await axios.get(`Join_Features_to_Enriched_Population_Case_Data_By_Province_Polygon/FeatureServer/0/query?where=NAME%20%3D%20\'${provTerritory}\'&outFields=OBJECTID,NAME,Recovered,Tests,Last_Updated,SourceURL,ActiveCases,Hospitalized,ICU,ICUVent,Deaths,Case_Total,GlobalID_2,Vaccinated,Abbreviation&returnGeometry=false&outSR=&f=json`, this.config);
        return result.data;
    }
    public async getDataForCountry(currentDay: string, previousDay: string) {
        const result = await axios.get(`covid19_accum/FeatureServer/0/query?where=Date%20%3E%3D%20TIMESTAMP%20\'${previousDay}%2000%3A00%3A00\'%20AND%20Date%20%3C%3D%20TIMESTAMP%20\'${currentDay}%2000%3A00%3A00\'&outFields=*&returnGeometry=false&outSR=4326&f=json`, this.config);
        return result.data;
    }
}
export default CanadaCovid19DataProvider;