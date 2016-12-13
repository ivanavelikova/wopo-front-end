import Ember from 'ember';

const {
  computed,
  inject: {
    service
  }
} = Ember;

export default Ember.Controller.extend({
  store: service(),

  disableBtn: null,

  themes: computed.sort('model.store', function (a, b) {
    if (parseInt(a.id) > parseInt(b.id)) {
      return -1;
    }

    return 1;
  }),

  canUninstall: computed('model.portfolioTheme', function () {
    const themes = this.get('model.portfolioTheme').content;

    return Array.isArray(themes) && themes.length > 1;
  }),

  actions: {
    install (theme) {
      theme.set('installed', true);
      this.set('disableBtn', theme.id);

      theme
        .save()
        .then(() => {
          this.send('reloadModel');
          this.send('unloadThemes');

          this.set('disableBtn', null);
        })
        .catch(() => {
          this.send('reloadModel');
          this.send('unloadThemes');

          this.set('disableBtn', null);
        });
    },

    uninstall (theme) {
      theme.set('installed', false);
      this.set('disableBtn', theme.id);

      theme
        .save()
        .then(() => {
          this.send('reloadModel');
          this.send('unloadThemes');

          this.set('disableBtn', null);
        })
        .catch(() => {
          theme.set('installed', theme.data.installed);

          this.send('reloadModel');
          this.send('unloadThemes');

          this.set('disableBtn', null);
        });
    }
  }
});
