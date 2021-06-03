import express from 'express';
import Covid19Service from '../services/Covid19Service';
import LocationService from '../services/LocationService';
import Controller from './controller.interface';
import Location from '../Models/Location';
import TerritoryStats from '../Models/TerritoryStats';
import CanadaNationalStats from '../Models/CanadaNationalStats';

class LocationController implements Controller{
    public path = 'api/v1/location';
    public router = express.Router();
    public nationalStatsPath = '/location/natstats';
    public provGraphPath = '/location/provgraph';
    public provStatsPath = '/location/provstats';

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get(this.path, this.getLocationDataJSON);
        this.router.get(this.provGraphPath, this.getProvGraphData);
        this.router.get(this.provStatsPath, this.getProvStatsData);
        this.router.get(this.nationalStatsPath, this.getNationalStatsData);
    }

    private async getLocationFromCoordinatesForMethods(longitude: number, latitude: number): Promise<Location> {
        let results: any[] = (await new LocationService().getLocationByCoordinates(longitude, latitude)).features;
        let location: Location = {
            City: results.filter((i: { id: string; }) => i.id.includes('place'))[0].text,
            Territory: results.filter((i: { id: string; }) => i.id.includes('region'))[0].text,
            Country: results.filter((i: { id: string; }) => i.id.includes('country'))[0].text,
            Longitude: longitude,
            Latitude: latitude
        }
        return location;
    }

    getLocationDataJSON = async(req: express.Request, res: express.Response) => {
        try {
            if (req.query && req.query.longitude && req.query.latitude) {
                const userLocation: Location = await this.getLocationFromCoordinatesForMethods(parseFloat((req.query as any).longitude), parseFloat((req.query as any).latitude));
                res.status(200).json(userLocation);
            }
        }catch (e) {
            console.log(e.message);
            res.status(500).json(e.message);
        }

    }

    getProvGraphData = async(req: express.Request, res: express.Response) => {
        try {
            if (req.query && req.query.longitude && req.query.latitude) {
                const userLocation: Location = await this.getLocationFromCoordinatesForMethods(parseFloat((req.query as any).longitude), parseFloat((req.query as any).latitude));
                if (userLocation.Country == 'Canada') {
                    const provCovidStats = await new Covid19Service().getCovidStatsByCanadaProvTerritoryForMonth(userLocation);
                    res.status(200).json(provCovidStats);
                }
            }
        } catch (e) {
            console.log(e.message);
            res.status(500).json(e.message);
        }
    }

    getProvStatsData = async(req: express.Request, res: express.Response) => {
        try {
            if (req.query && req.query.longitude && req.query.latitude) {
                const userLocation: Location = await this.getLocationFromCoordinatesForMethods(parseFloat((req.query as any).longitude), parseFloat((req.query as any).latitude));
                    if (userLocation.Country == 'Canada'){                        
                        const resultTerritory  = await new Covid19Service().getCovidStatsByCanadaProvTerritory(userLocation);
                        const covidStatsTerritory: TerritoryStats = {
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
                        res.status(200).json(covidStatsTerritory);
                    }
            }
        } catch (e) {
            console.log(e.message);
            res.status(500).json(e.message);
        }
    }

    getNationalStatsData = async(req: express.Request, res: express.Response) => {
        try {
            if (req.query && req.query.longitude && req.query.latitude) {
                const userLocation: Location = await this.getLocationFromCoordinatesForMethods(parseFloat((req.query as any).longitude), parseFloat((req.query as any).latitude));
                    if (userLocation.Country == 'Canada'){
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
                    res.status(200).json(covidStatsNational);
                    }
            }
        } catch (e) {
            console.log(e.message);
            res.status(500).json(e.message);
        }
    }
}


export default LocationController;