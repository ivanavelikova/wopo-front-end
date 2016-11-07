import Ember from 'ember';
import BaseRoute from 'front-end/routes/base';

const {
  inject: {
    service
  }
} = Ember;

export default BaseRoute.extend({
  store: service(),

  model () {
    return this.get('store').findAll('store');
  },

  actions: {
    reloadModel () {
      this.refresh();
    },

    unloadThemes () {
      this.get('store').unloadAll('portfolio-theme');
    }
  }
});
