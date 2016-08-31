import Ember from 'ember';

export default Ember.Controller.extend({
  intl: Ember.inject.service(),

  disableForm: false,
  alerts: {
    success: null,
    danger: null
  },

  showSuccessAlert: Ember.computed('alerts.success', function() {
    return (this.get('alerts.success') !== null);
  }),
  showDangerAlert: Ember.computed('alerts.danger', function() {
    return (this.get('alerts.danger') !== null);
  }),

  actions: {
    register() {
      // ------
      // Validation fail
      // ------

      if (!this.get('model').get('validations.isValid')) {
        $('html, body').animate({ scrollTop: 0 });

        this.set('alerts.success', null);
        this.set('alerts.danger', this.get('intl').t('errors.fill'));
        return;
      }

      // ------
      // Validation success
      // ------

      this.set('disableForm', true);
      this.set('alerts.success', null);
      this.set('alerts.danger', null);

      var registerAction = this;
      var user = this.get('store').createRecord('user', {
        name: registerAction.get('name'),
        email: registerAction.get('email'),
        password: registerAction.get('password')
      });

      function showSuccessAlert() {
        registerAction.set('disableForm', false);
        $('html, body').animate({ scrollTop: 0 });

        registerAction
          .set('alerts.success', registerAction.get('intl').t('success.registration', {
            email: registerAction.get('email')
          }));

        // Reset form
        $('input').blur();
        registerAction.set('name', null);
        registerAction.set('email', null);
        registerAction.set('password', null);
        registerAction.set('didValidate', false);
        registerAction.send('dismissAlert');
      }

      function failure(reason) {
        registerAction.set('disableForm', false);
        $('html, body').animate({ scrollTop: 0 });

        registerAction.set('alerts.success', null);
        
        if (!reason.errors[0].detail) {
          registerAction.set('alerts.danger', registerAction.get('intl').t('errors.serverFail'));
          return;
        }

        registerAction.set('alerts.danger', reason.errors[0].detail);
      }

      user.save().then(showSuccessAlert).catch(failure);
    }
  }
});
