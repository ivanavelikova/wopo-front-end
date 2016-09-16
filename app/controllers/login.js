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
      const email = this.get('email');
      const password = this.get('password');

      this.get('session')
        .authenticate('authenticator:jwt', email, password)
        .catch(failure);

      function failure (reason) {
        loginAction.set('disableForm', false);
        let alertContent = loginAction.get('intl').t('errors.serverFail');

        if (reason.errors[0].detail) {
          alertContent = reason.errors[0].detail;
        }

        loginAction.set('alert', {
          type: 'danger',
          content: alertContent
        });
      }
    }
  }
});
