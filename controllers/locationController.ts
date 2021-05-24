import * as express from "express";
import Covid19Service from "../services/Covid19Service";
import asyncWrapper from "async-wrapper-express-ts";

class LocationController {
    public path = '/location';
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get(this.path, this.getStatsForLocation);
    }

    getStatsForLocation = async(req: express.Request, res: express.Response) => {
        try {
            const location = req?.query?.location?.toString() ?? 'canada';
            const covidStats = await new Covid19Service().getCovidStatsByCountry(req, res, location);
            res.status(200).json(covidStats);
            // const covid19Service = new Covid19Service();
            // await covid19Service.getCovidStatsByCountry(req, res, location)
            //     .then((covidStats) => {
            //         console.log(covidStats);
            //         res.status(200).json(covidStats);
            //     });
            // console.log("here: ", result.then);
            // res.send(result);
        } catch (e) {
            console.log(e.message);
            res.status(500).json(e);
        }
    }
}

export default LocationController;