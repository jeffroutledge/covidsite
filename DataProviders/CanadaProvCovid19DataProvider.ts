import axios from 'axios';

class CanadaProvCovid19DataProvider {
        private config = {
        baseURL: 'https://services9.arcgis.com/pJENMVYPQqZZe20v/arcgis/rest/services/Join_Features_to_Enriched_Population_Case_Data_By_Province_Polygon/FeatureServer/0',
        timeout: 1000,
        headers: {
            'content-type': 'JSON',
        }
    };
    public async getDataForProv(provTerritory: String) {
        const result = await axios.get(`query?where=NAME%20%3D%20\'${provTerritory}\'&outFields=OBJECTID,NAME,Recovered,Tests,Last_Updated,SourceURL,ActiveCases,Hospitalized,ICU,ICUVent,Deaths,Case_Total,GlobalID_2,Vaccinated,Abbreviation&returnGeometry=false&outSR=&f=json`, this.config);
        return result.data;
    }
}
export default CanadaProvCovid19DataProvider;