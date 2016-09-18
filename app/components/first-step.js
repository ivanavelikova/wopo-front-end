import Ember from 'ember';
import Validations from '../validations/first-step';

const { computed, inject: { service } } = Ember;

export default Ember.Component.extend(Validations, {
  storage: service(),

  themeId: computed.reads('storage.themeId'),

  isFirstTheme: computed('themeId', function () {
    if (this.get('themeId') === 1) {
      return true;
    }
  }),

  isSecondTheme: computed('themeId', function () {
    if (this.get('themeId') === 2) {
      return true;
    }
  }),

  actions: {
    next () {
      if (!this.get('validations.isValid')) {
        alert('noooo');
        return;
      }

      this.sendAction('nextAction');
    },

    selectTheme (id) {
      this.set('storage.themeId', id);
    }
  }
});
