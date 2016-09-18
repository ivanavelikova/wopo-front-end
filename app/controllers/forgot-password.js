import Ember from 'ember';
import fetch from 'ember-network/fetch';

const { inject: { service } } = Ember;

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

      const init = {
        method: 'POST',
        headers: {
          'X-XSRF-TOKEN': decodeURIComponent(csrfToken),
          'X-Locale': this.get('intl').get('locale')[0],
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      };

      fetch(`${host}/forgot-password`, init)
        .then(checkStatus)
        .then(parseJSON)
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

        if (reason.errors && reason.errors[0].detail) {
          alertContent = reason.errors[0].detail;
        }

        thisAction.set('alert', {
          type: 'danger',
          content: alertContent
        });
      }

      function checkStatus (response) {
        if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          let error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
      }

      function parseJSON (response) {
        return response.json();
      }
    }
  }
});
