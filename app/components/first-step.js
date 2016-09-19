import Ember from 'ember';
import Validations from '../validations/first-step';
import FirstStepsData from '../mixins/first-steps-data';

const { computed } = Ember;

const FirstStepMixin = Ember.Mixin.create(Validations, FirstStepsData);

export default Ember.Component.extend(FirstStepMixin, {
  data: Ember.Object.create({
    themeId: null
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
