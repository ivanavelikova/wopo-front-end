import BaseRoute from 'front-end/routes/base';

export default BaseRoute.extend({
  model () {
    return this.get('store').findRecord('portfolio', 1);
  },

  afterModel(portfolio) {
    const controller = this.controllerFor('dashboard.settings.portfolio');
    
    controller.set('title', portfolio.get('title'));
    controller.set('description', portfolio.get('description'));
    controller.set('keywords', portfolio.get('keywords'));
    controller.set('jobOffers', portfolio.get('job_offers'));
  }
});
