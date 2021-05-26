import express from 'express';
import Covid19Service from '../services/Covid19Service';
import Controller from './controller.interface';
import Location from '../Models/Location';

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
            const location: Location = {
                City : '',
                Territory : 'MANITOBA',
                Country : req?.query?.location?.toString() ?? 'canada',
                XCoord : 0.00,
                YCoord : 0.00
            }
            const covidStats = await new Covid19Service().getCovidStatsByCanadaProvTerritory(location);
            console.log(covidStats);
            res.status(200).json(covidStats);
        } catch (e) {
            console.log(e.message);
            res.status(500).json(e.message);
        }
    }
}

export default LocationController;