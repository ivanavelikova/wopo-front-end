import Ember from 'ember';

export default Ember.Controller.extend({
  intl: Ember.inject.service(),
  session: Ember.inject.service(),

  queryParams: ['email', {
    resetCode: 'reset_code'
  }],
  email: null,
  resetCode: null,
  disableForm: false,
  alert: {
    type: null,
    content: null
  },

  actions: {
    resetPassword() {
      const thisAction = this;
      const email = this.get('email');
      const resetCode = this.get('resetCode');
      const password = this.get('password');

      this.get('session')
        .authenticate('authenticator:resetpassword-jwt', email, resetCode, password)
        .catch(failure);

      function failure (reason) {
        thisAction.set('disableForm', false);
        let alertContent = thisAction.get('intl').t('errors.serverFail');

        if (reason.responseJSON.errors[0].detail) {
          alertContent = reason.responseJSON.errors[0].detail;
        }

        thisAction.set('alert', {
          type: 'danger',
          content: alertContent
        });
      }
    }
  }
});
