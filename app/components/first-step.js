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

  alert: {
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
      if (!this.get('validations.isValid')) {
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
    }
  }
});
