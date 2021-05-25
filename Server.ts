import App from './App';
import LocationController from './controllers/locationController';
import WorldController from './controllers/worldController';

const app = new App(
  [
    new LocationController(),
    new WorldController(),
  ],
  3000,
);

app.listen();