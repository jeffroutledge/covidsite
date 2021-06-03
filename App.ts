import express from 'express';
import cors from 'cors';
import path from 'path';
import Controller from './controllers/controller.interface';

class App {
    public app: express.Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeHome();
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

      private initializeHome() {
        if (process.env.NODE_ENV === 'production') {
          this.app.use(express.static(path.join(__dirname, 'client/build')));
      
          this.app.get('*', function (req, res) {
            console.log(req.baseUrl);
            res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
          });
        }
      }

      public listen() {
        this.app.listen(this.port, () => {
          console.log(`App listening on the port ${this.port}`);
        });
      }
}

export default App;