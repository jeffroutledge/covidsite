import express, { response } from "express";
import http from "https";
import axios from 'axios';

class Covid19Service {
    public async getCovidStatsByCountry (req: express.Request, res: express.Response, location: string): Promise<any>
    {
        console.log('we got the covid19 service working');

        const config = {
            baseURL: 'https://api.covid19api.com',
            // path: '/country/canada/status/confirmed',
            url: `/dayone/country/${location}/status/confirmed/live`,
            timeout: 1000,
            headers: {
                'content-type': 'JSON',
                'X-Access-Token': '5cf9dfd5-3449-485e-b5ae-70a60e997864',
            }
        };

        // console.log(config.baseURL + config.url);

        let result = await axios.get(`/dayone/country/${location}/status/confirmed/live`, config)

        return result.data;
            // .then((response) => {
            //     // console.log(response.data);
            //     return response;
            //     // console.log(response.status);
            //     // console.log(response.statusText);
            //     // console.log(response.headers);
            //     // console.log(response.config);
            //     // return response.data;
            // })
            // .catch((e) => {
            //     return e;
            // })

        // const callback = async (response: any) => {
        // response.on('data', (chunk: any) => {
        //     result += chunk;
        // });

        // response.on('end', () => {
        //     res.status(200).json(result); // SEND ACTUAL RESPONSE HERE
        // });
        // }

        // req = http.request(options, callback);
        // req.end();
        console.log("done in service: ", response);
        // return response.data;
    }
}

export default Covid19Service;