import axios from 'axios';

class Covid19DataProvider {
    private config = {
        baseURL: 'https://api.covid19api.com',
        timeout: 1000,
        headers: {
            'content-type': 'JSON',
            'X-Access-Token': '5cf9dfd5-3449-485e-b5ae-70a60e997864',
        }
    };

    public async getCovid19StatsByCountry(country : string) {
        const result = await axios.get(`/dayone/country/${country}/status/confirmed/live`, this.config);
        return result.data;
    }
    public async getCovid19StatsByTerritory(territory: string) {
        const result = await axios.get(`/URL/${territory}`);
        return result.data;
    }
    public async getCovid19StatsByCity(city: string) {
        const result = await axios.get(`URL/${city}`);
        return result.data;
    }
    public async getCovid19StatsByCoords(xCoord: number, yCoord: number) {
        const result = await axios.get(`URL/${xCoord}/${yCoord}`);
        return result.data;
    }
}

export default Covid19DataProvider;