import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    addTheme () {
      this.send('reloadModel');
    }
  }
});
