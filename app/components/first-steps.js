import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    theme () {
      alert('theme selected');
      return true;
    },

    content () {
      alert('content enteredddd');
      return true;
    },

    finish () {
      alert('finisheddd');
      return true;
    }
  }
});
