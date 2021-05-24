import App from './App';
import LocationController from './controllers/locationController';

const app = new App(
  [
    new LocationController(),
  ],
  3000,
);

app.listen();