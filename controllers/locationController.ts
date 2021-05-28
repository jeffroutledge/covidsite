import express from 'express';
import Covid19Service from '../services/Covid19Service';
import LocationService from '../services/LocationService';
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
            if (req.query && req.query.longitude && req.query.latitude) {
                let querylongitude = (req.query as any).longitude;
                let querylatitude = (req.query as any).latitude;        
                let location: Location = {

                    City : '',
                    Territory : '',
                    Country : '',
                    Longitude : querylongitude,
                    Latitude : querylatitude
                };
                let reverseGeocodedData = await new LocationService().getLocationByCoordinates(location);
                location.City = reverseGeocodedData['features'][2]['text'];
                location.Territory = (reverseGeocodedData['features'][3]['text']).toUpperCase();
                location.Country = reverseGeocodedData['features'][4]['text'];
                if (location.Country == 'Canada'){
                        const covidStats = await new Covid19Service().getCovidStatsByCanadaProvTerritory(location);
                        res.status(200).json(covidStats);
                }
            }
        } catch (e) {
            console.log(e.message);
            res.status(500).json(e.message);
        }
    }
}

export default LocationController;