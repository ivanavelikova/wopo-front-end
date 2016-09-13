import Ember from 'ember';

const {
  $: jQuery,
  inject: { service }
} = Ember;

export default Ember.Controller.extend({
  cookies: service(),
  store: service(),
  intl: service(),
  session: service(),

  disableForm: false,
  alert: {
    type: null,
    content: null
  },

  actions: {
    sendForgotPasswordLink() {
      const thisAction = this;
      const email = this.get('email');
      const csrfToken = this.get('cookies').read('XSRF-TOKEN');
      const host = this.get('store').adapterFor('application').get('host');

      const options = {
        url: `${host}/users/forgot-password`,
        data: { email },
        type: 'POST',
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        headers: {
          'X-XSRF-TOKEN': decodeURIComponent(csrfToken),
          'X-Locale': this.get('intl').get('locale')[0]
        }
      };

      jQuery.ajax(options).then(success, failure);

      function success () {
        thisAction.set('disableForm', false);
        thisAction.set('alert', {
          type: 'success',
          content: thisAction.get('intl').t('success.forgotPassword')
        });

        $('input').blur();
        thisAction.set('email', null);
        thisAction.set('didValidate', false);
      }

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
