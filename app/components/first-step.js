import Ember from 'ember';
import Validations from '../validations/first-step';

const {
  computed,
  inject: { service }
} = Ember;

export default Ember.Component.extend(Validations, {
  intl: service(),

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
  
  isFirstTheme: computed('data.themeId', function () {
    if (this.get('data.themeId') === 1) {
      return true;
    }
  }),

  isSecondTheme: computed('data.themeId', function () {
    if (this.get('data.themeId') === 2) {
      return true;
    }
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
