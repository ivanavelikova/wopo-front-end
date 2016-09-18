import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    finish () {
      alert('Donnnneee!!!');
    },

    back () {
      this.sendAction('backAction');
    }
  }
});
