import BaseRoute from 'front-end/routes/base';

const {
  RSVP
} = Ember;

export default BaseRoute.extend({
  model () {
    const store = this.get('store');

    return RSVP.hash({
      store: store.findAll('store'),
      portfolioTheme: store.findAll('portfolio-theme')
    });
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
