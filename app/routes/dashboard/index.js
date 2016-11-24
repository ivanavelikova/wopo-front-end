import BaseRoute from 'front-end/routes/base';

export default BaseRoute.extend({
  model () {
    return this.get('store').findRecord('statistic', 1);
  },

  beforeModel () {
    const model = this.modelFor(this.routeName);
    
    if (model) {
      model.reload();
    }
  }
});
