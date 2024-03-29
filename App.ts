import express from 'express';
import cors from 'cors';
import Controller from './controllers/controller.interface';

class App {
    public app: express.Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(express.urlencoded({extended: true}));
      }

      private initializeControllers(controllers: any[]) {
        controllers.forEach((controller) => {
          this.app.use('/', controller.router);
        });
      }

      public listen() {
        this.app.listen(this.port, () => {
          console.log(`App listening on the port ${this.port}`);
        });
      }
}

export default App;