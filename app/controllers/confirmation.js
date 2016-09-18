import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['email', {
    confirmationCode: 'confirmation_code'
  }],
  email: null,
  confirmationCode: null
});
