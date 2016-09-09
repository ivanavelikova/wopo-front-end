import Ember from 'ember';

export default Ember.Controller.extend({
  intl: Ember.inject.service(),

  disableForm: false,
  alert: {
    type: null,
    content: null
  },

  actions: {
    register() {
      const registerAction = this;

      const user = this.get('store').createRecord('user', {
        name: registerAction.get('name'),
        email: registerAction.get('email'),
        password: registerAction.get('password')
      });

      user
        .save()
        .then(success)
        .catch(failure);

      function success () {
        registerAction.set('disableForm', false);
        registerAction.set('alert', {
          type: 'success',
          content: registerAction.get('intl').t('success.registration')
        });

        $('input').blur();
        registerAction.set('name', null);
        registerAction.set('email', null);
        registerAction.set('password', null);
        registerAction.set('didValidate', false);
      }

      function failure (reason) {
        registerAction.set('disableForm', false);
        let alertContent = registerAction.get('intl').t('errors.serverFail');

        if (reason.errors[0].detail) {
          alertContent = reason.errors[0].detail;
        }

        registerAction.set('alert', {
          type: 'danger',
          content: alertContent
        });
      }
    }
  }
});
