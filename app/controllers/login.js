import Ember from 'ember';

export default Ember.Controller.extend({
  intl: Ember.inject.service(),
  session: Ember.inject.service(),

  disableForm: false,
  alert: {
    type: null,
    content: null
  },

  actions: {
    login() {
      const loginAction = this;
      const email = loginAction.get('email');
      const password = loginAction.get('password');

      this.get('session')
        .authenticate('authenticator:jwt', email, password)
        .catch(failure);

      function failure (reason) {
        loginAction.set('disableForm', false);
        let alertContent = loginAction.get('intl').t('errors.serverFail');

        if (reason.responseJSON.errors[0].detail) {
          alertContent = reason.responseJSON.errors[0].detail;
        }

        loginAction.set('alert', {
          type: 'danger',
          content: alertContent
        });
      }
    }
  }
});
