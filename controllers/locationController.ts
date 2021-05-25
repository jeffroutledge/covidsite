import * as express from "express";
import Covid19Service from "../services/Covid19Service";
import Controller from "./controller.interface";

class LocationController implements Controller{
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
            const covidStats = await new Covid19Service().getCovidStatsByCountry(location);
            res.status(200).json(covidStats);
        } catch (e) {
            console.log(e.message);
            res.status(500).json(e);
        }
    }
}

export default LocationController;