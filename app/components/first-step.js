import Ember from 'ember';
import Validations from '../validations/first-step';

const { computed } = Ember;

export default Ember.Component.extend(Validations, {
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
        alert('noooo');
        return;
      }

      this.sendAction('nextAction');
    },

    selectTheme (id) {
      this.set('data.themeId', id);
    }
  }
});
