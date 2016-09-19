import Ember from 'ember';
import Validations from '../validations/second-step';
import FirstStepsData from '../mixins/first-steps-data';

const SecondStepMixin = Ember.Mixin.create(Validations, FirstStepsData);

export default Ember.Component.extend(SecondStepMixin, {
  data: Ember.Object.create({
    about: null
  }),

  actions: {
    next () {
      if (!this.get('validations.isValid')) {
        alert('noooo');
        return;
      }
      
      this.sendAction('nextAction');
    },

    back () {
      this.sendAction('backAction');
    }
  }
});
