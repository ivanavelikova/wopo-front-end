import BaseRoute from 'front-end/routes/base';

export default BaseRoute.extend({
  model () {
    return this.get('store').findRecord('portfolio', 1);
  }
});
