import Ember from 'ember';
import Validations from '../validations/second-step';

const {
  computed,
  inject: { service }
} = Ember;

export default Ember.Component.extend(Validations, {
  storage: service(),

  about: computed.alias('storage.about'),

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
