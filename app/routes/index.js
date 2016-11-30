import BaseRoute from 'front-end/routes/base';
import ENV from '../config/environment';

export default BaseRoute.extend({
  BASE_URL: `http://${ENV.URI}`
});
