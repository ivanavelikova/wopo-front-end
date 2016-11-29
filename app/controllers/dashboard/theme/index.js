import Ember from 'ember';

const {
  computed,
  inject: {
    service
  }
} = Ember;

export default Ember.Controller.extend({
  store: service(),

  disableRemove: false,

  themes: computed.sort('model', function (a, b) {
    if (parseInt(a.id) > parseInt(b.id)) {
      return -1;
    }

    return 1;
  }),

  canUninstall: computed('themes', function () {
    const themes = this.get('themes');

    return Array.isArray(themes) && themes.length > 1;
  }),

  haveThemes: computed('themes', function () {
    const themes = this.get('themes');

    return Array.isArray(themes) && themes.length > 0;
  }),

  actions: {
    select (theme) {
      if (theme.get('active') === true) {
        return;
      }

      theme.set('active', true);

      theme
        .save()
        .then(() => {
          this.send('reloadModel');
        })
        .catch(console.error);
    },

    remove (theme) {
      this.set('disableRemove', true);

      theme
        .destroyRecord()
        .then(() => {
          this.send('reloadModel');
          this.set('disableRemove', false);
        })
        .catch(() => {
          this.send('reloadModel');
          this.set('disableRemove', false);
        });
    },
  }
});
