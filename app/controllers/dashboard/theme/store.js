import Ember from 'ember';

const {
  computed,
  inject: {
    service
  }
} = Ember;

export default Ember.Controller.extend({
  store: service(),
  intl: service(),
  network: service(),

  disableBtn: null,
  disableSubmit: false,
  disableRemove: false,

  addThemeModalVisible: false,
  addThemeAlert: {
    type: null,
    content: null
  },

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
    },

    addTheme (theme) {
      const failure = (reason) => {
        let alertContent = this.get('intl').t('errors.serverFail');

        if (reason.errors[0].detail) {
          alertContent = reason.errors[0].detail;
        }

        this.set('disableSubmit', false);

        this.set('addThemeAlert', {
          type: 'danger',
          content: alertContent
        });
      };

      this
        .get('network')
        .post('themes/custom', { theme }, true)
        .then(() => {
          setTimeout(() => {
            this.set('addThemeModalVisible', false);
            this.send('reloadModel');
          }, 500);
        })
        .catch(error => {
          if (!error.response) {
            failure(error);
            return;
          }

          error.response.json().then(function(reason) {
            failure(reason);
          });
        });
    },

    remove (theme) {
      this.set('disableRemove', true);
      this.set('disableBtn', theme.id);

      theme
        .destroyRecord()
        .then(() => {
          this.send('reloadModel');
          this.send('unloadThemes');

          this.set('disableBtn', null);
          this.set('disableRemove', false);
        })
        .catch(() => {
          this.send('reloadModel');
          this.send('unloadThemes');

          this.set('disableBtn', null);
          this.set('disableRemove', false);
        });
    }
  }
});
