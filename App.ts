import express from 'express';
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

// const locationRouter = require('./routes/locationRouter');

// // let bodyParser = require('body-parser');
// const { callbackify } = require('util');

// app.use(express.json());

// app.use('/api/location', locationRouter)

// // app.get('/', (req, res) => {
// //     //TODO implement main app route
// //     var result;
// //     var options = {
// //         host: 'api.covid19api.com',
// //         // path: '/country/canada/status/confirmed',
// //         path: '/dayone/country/canada/status/confirmed/live',
// //         headers: {
// //             'X-Access-Token': '5cf9dfd5-3449-485e-b5ae-70a60e997864',
// //         }
// //     };

// //     var callback = function(response) {
// //     response.on('data', function (chunk) {
// //         result += chunk;
// //     });

// //     response.on('end', function () {
// //         //console.log(result);
// //         res.json(result); // SEND ACTUAL RESPONSE HERE
// //     });
// //     }
// //     var req = http.request(options, callback);
// //     req.end();
// // });

// // app.get('/location', locationController.getStatsForLocation);

// app.get('/all', (req, res) => {
//     res.send("oh no the covids real bad");
// })

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));