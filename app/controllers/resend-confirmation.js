import Ember from 'ember';

const {
  inject: {
    service
  }
} = Ember;

export default Ember.Controller.extend({
  intl: service(),
  network: service(),

  disableForm: false,
  alert: {
    type: null,
    content: null
  },

  actions: {
    resendConfirmationLink() {
      const email = this.get('email');

      const success = () => {
        this.set('disableForm', false);
        this.set('alert', {
          type: 'success',
          content: this.get('intl').t('success.registration')
        });

        $('input').blur();
        this.set('email', null);
        this.set('didValidate', false);
      };

      const failure = (reason) => {
        this.set('disableForm', false);
        let alertContent = this.get('intl').t('errors.serverFail');

        if (reason.errors && reason.errors[0].detail) {
          alertContent = reason.errors[0].detail;
        }

        this.set('alert', {
          type: 'danger',
          content: alertContent
        });
      };

      this
        .get('network')
        .post('resend-confirmation', { email })
        .then(success)
        .catch(error => {
          if (!error.response) {
            failure(error);
            return;
          }

          error.response.json().then(function(reason) {
            failure(reason);
          });
        });
    }
  }
});
