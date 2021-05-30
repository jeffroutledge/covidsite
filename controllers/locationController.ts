import express from 'express';
import Covid19Service from '../services/Covid19Service';
import LocationService from '../services/LocationService';
import Controller from './controller.interface';
import Location from '../Models/Location';
import TerritoryStats from '../Models/TerritoryStats';

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
                let reverseGeocodedData: any[] = (await new LocationService().getLocationByCoordinates(location)).features;
                //potentially use place_type[0] === place instead of the id.includes
                location.City = reverseGeocodedData.filter((i: { id: string; }) => i.id.includes('place'))[0].text;
                location.Territory = (reverseGeocodedData.filter((i: {id: string;}) => i.id.includes('region'))[0].text).toUpperCase();
                location.Country = reverseGeocodedData.filter((i: {id: string;}) => i.id.includes('country'))[0].text;
                if (location.Country == 'Canada'){
                        const result  = await new Covid19Service().getCovidStatsByCanadaProvTerritory(location);
                        const covidStats: TerritoryStats = {
                            ObjectID : result['features'][0]['attributes']['OBJECTID'],
                            Name : result['features'][0]['attributes']['NAME'],
                            Recovered : result['features'][0]['attributes']['Recovered'],
                            Tests : result['features'][0]['attributes']['Tests'],
                            LastUpdated : result['features'][0]['attributes']['Last_Updated'],
                            SourceURL : result['features'][0]['attributes']['SourceURL'],
                            ActiveCases : result['features'][0]['attributes']['ActiveCases'],
                            Hospitalized : result['features'][0]['attributes']['Hospitalized'],
                            ICU : result['features'][0]['attributes']['ICU'],
                            ICUVentilator : result['features'][0]['attributes']['ICUVents'],
                            Deaths : result['features'][0]['attributes']['Deaths'],
                            CaseTotal : result['features'][0]['attributes']['Case_Total'],
                            Vaccinated : result['features'][0]['attributes']['Vaccinated'],
                        }
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