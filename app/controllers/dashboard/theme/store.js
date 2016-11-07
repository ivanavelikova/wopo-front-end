import Ember from 'ember';

const {
  computed,
  inject: {
    service
  }
} = Ember;

export default Ember.Controller.extend({
  store: service(),

  themes: computed.sort('model', function (a, b) {
    if (parseInt(a.id) > parseInt(b.id)) {
      return -1;
    }

    return 1;
  }),

  actions: {
    install (theme) {
      theme.set('installed', true);

      theme
        .save()
        .then(() => {
          this.send('reloadModel');
          this.send('unloadThemes');
        })
        .catch(console.error);
    },

    uninstall (theme) {
      theme.set('installed', false);

      theme
        .save()
        .then(() => {
          this.send('reloadModel');
          this.send('unloadThemes');
        })
        .catch(console.error);
    }
  }
});
