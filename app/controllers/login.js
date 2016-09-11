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
        .then(success)
        .catch(failure);

      function success () {
        $('input').blur();
        loginAction.set('email', null);
        loginAction.set('password', null);
        loginAction.set('didValidate', false);

        if (loginAction.get('session.data.portfolioDone') === false) {
          loginAction.transitionToRoute('welcome');
          return;
        }

        loginAction.transitionToRoute('dashboard');
      }

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
