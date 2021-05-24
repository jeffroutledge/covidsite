import express, { response } from "express";
import http from "https";
import axios from 'axios';

class Covid19Service {
    public async getCovidStatsByCountry (req: express.Request, res: express.Response, location: string): Promise<any>
    {
        const config = {
            baseURL: 'https://api.covid19api.com',
            url: `/dayone/country/${location}/status/confirmed/live`,
            timeout: 1000,
            headers: {
                'content-type': 'JSON',
                'X-Access-Token': '5cf9dfd5-3449-485e-b5ae-70a60e997864',
            }
        };

        let result = await axios.get(`/dayone/country/${location}/status/confirmed/live`, config)

        return result.data;
    }
}

export default Covid19Service;