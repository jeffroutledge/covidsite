import App from './App';
import LocationController from './controllers/locationController';
import WorldController from './controllers/worldController';

const app = new App(
  [
    new LocationController(),
    new WorldController(),
  ],
  8080,
);

app.listen();