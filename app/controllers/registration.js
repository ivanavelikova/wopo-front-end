import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    register() {
      var registerAction = this;

      var user = this.get('store').createRecord('user', {
        name: registerAction.get('name'),
        email: registerAction.get('email'),
        password: registerAction.get('password')
      });

      user.save();
    }
  }
});
