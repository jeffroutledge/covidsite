import express from 'express';
import Covid19Service from '../services/Covid19Service';
import Controller from './controller.interface';

class WorldController implements Controller {
  public path = '/world';
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getWorldStatsForLastWeek);
  }

  getWorldStatsForLastWeek = async(req: express.Request, res: express.Response) => {
      try {
        let please: any = req.header('set-cookie')?.toString();
        console.log(please);
        const worldCovidStats = await new Covid19Service().getWorldCovidStatsForMonth();
        res.status(200).json(worldCovidStats);
      }
      catch (e) {
        //console.log(e.message);
        res.status(500).json(e.message);
      }
  }
}

export default WorldController;