import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    next () {
      this.sendAction('nextAction');
    },

    back () {
      this.sendAction('backAction');
    }
  }
});
