import Ember from 'ember';
import Validations from '../validations/first-step';

const {
  inject: {
    service
  }
} = Ember;

export default Ember.Component.extend(Validations, {
  intl: service(),
  store: service(),
  network: service(),

  alert: {
    type: null,
    content: null
  },

  disableSubmit: false,
  disableRemove: false,

  addThemeModalVisible: false,
  addThemeAlert: {
    type: null,
    content: null
  },

  showAlert: Ember.computed('alert.{type,content}', function() {
    if (this.get('alert.type') !== null && this.get('alert.content') !== null) {
      $('html, body').animate({ scrollTop: 0 });
      return true;
    }

    return false;
  }),

  actions: {
    next () {
      if (this.get('validations.isInvalid')) {
        this.set('alert', {
          type: 'info',
          content: this.get('intl').t('errors.selectTheme')
        });
        return;
      }

      this.set('alert', {
        type: null,
        content: null
      });
      this.sendAction('nextAction');
    },

    selectTheme (id) {
      this.set('data.themeId', id);
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
            this.sendAction('reloadModelAfterAddTheme');
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

      if (this.get('data.themeId') === theme.id) {
        this.set('data.themeId', null);
      }

      theme
        .destroyRecord()
        .then(() => {
          this.sendAction('reloadModelAfterAddTheme');

          this.set('disableRemove', false);
        })
        .catch(() => {
          this.sendAction('reloadModelAfterAddTheme');

          this.set('disableRemove', false);
        });
    }
  }
});
