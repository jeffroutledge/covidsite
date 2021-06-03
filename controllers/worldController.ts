import express from 'express';
import Covid19Service from '../services/Covid19Service';
import Controller from './controller.interface';

class WorldController implements Controller {
  public path = '/api/v1/world';
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getWorldStatsForLastWeek);
  }

  getWorldStatsForLastWeek = async(_req: express.Request, res: express.Response) => {
      try {
        const worldCovidStats = await new Covid19Service().getWorldCovidStatsForMonth();
        res.status(200).json(worldCovidStats);
      }
      catch (e) {
        res.status(500).json(e.message);
      }
  }
}

export default WorldController;