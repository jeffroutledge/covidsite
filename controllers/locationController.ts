import express from 'express';
import Covid19Service from '../services/Covid19Service';
import LocationService from '../services/LocationService';
import Controller from './controller.interface';
import Location from '../Models/Location';
import CovidStatsModel from '../Models/TerritoryStats';
import CanadaNationalStats from '../Models/CanadaNationalStats';

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
                        const resultsNational = await new Covid19Service().getCovidStatsForCanada();
                        const covidStatsNational: CanadaNationalStats = {
                            CasesNew : resultsNational['features'][0]['attributes']['FREQUENCY'],
                            CasesTotal : resultsNational['features'][0]['attributes']['Cases'],
                            Recovered : resultsNational['features'][0]['attributes']['Recovered'],
                            DailyRecovered : resultsNational['features'][0]['attributes']['DailyRecovered'],
                            TotalDeaths : resultsNational['features'][0]['attributes']['TotalDeaths'],
                            DailyDeaths : resultsNational['features'][0]['attributes']['DailyDeaths'],
                            TotalTested : resultsNational['features'][0]['attributes']['TotalTested'],
                            DailyTested : resultsNational['features'][0]['attributes']['DailyTested'],
                            TotalActive : resultsNational['features'][0]['attributes']['TotalActive'],
                            DailyActive : resultsNational['features'][0]['attributes']['DailyActive'],
                            TotalHospitalized : resultsNational['features'][0]['attributes']['TotalHospitalized'],
                            DailyHospitalized : resultsNational['features'][0]['attributes']['DailyHospitalized'],
                            TotalICU : resultsNational['features'][0]['attributes']['TotalICU'],
                            DailyICU : resultsNational['features'][0]['attributes']['DailyICU'],
                            TotalVaccinated : resultsNational['features'][0]['attributes']['TotalVaccinated'],
                            DailyVaccinated : resultsNational['features'][0]['attributes']['DailyVaccinated'],
                        }
                        const covidStatsNationalJson = JSON.stringify(covidStatsNational); 
                        const resultTerritory  = await new Covid19Service().getCovidStatsByCanadaProvTerritory(location);
                        const covidStatsTerritory: CovidStatsModel = {
                            ObjectID : resultTerritory['features'][0]['attributes']['OBJECTID'],
                            Name : resultTerritory['features'][0]['attributes']['NAME'],
                            Recovered : resultTerritory['features'][0]['attributes']['Recovered'],
                            Tests : resultTerritory['features'][0]['attributes']['Tests'],
                            LastUpdated : resultTerritory['features'][0]['attributes']['Last_Updated'],
                            SourceURL : resultTerritory['features'][0]['attributes']['SourceURL'],
                            ActiveCases : resultTerritory['features'][0]['attributes']['ActiveCases'],
                            Hospitalized : resultTerritory['features'][0]['attributes']['Hospitalized'],
                            ICU : resultTerritory['features'][0]['attributes']['ICU'],
                            ICUVentilator : resultTerritory['features'][0]['attributes']['ICUVents'],
                            Deaths : resultTerritory['features'][0]['attributes']['Deaths'],
                            CaseTotal : resultTerritory['features'][0]['attributes']['Case_Total'],
                            Vaccinated : resultTerritory['features'][0]['attributes']['Vaccinated'],
                        }
                        const covidStatsTerritoryJSON = JSON.stringify(covidStatsTerritory);
                        console.log(covidStatsTerritoryJSON);
                        const returnJSON = JSON.stringify([covidStatsNationalJson, covidStatsTerritoryJSON]);
                        console.log(returnJSON);
                        res.status(200).json(covidStatsTerritory);
                }
            }
        } catch (e) {
            console.log(e.message);
            res.status(500).json(e.message);
        }
    }
}

export default LocationController;