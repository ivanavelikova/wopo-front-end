import Ember from 'ember';
import Validations from '../validations/second-step';

export default Ember.Component.extend(Validations, {
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
