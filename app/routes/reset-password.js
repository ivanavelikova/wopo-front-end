import Ember from 'ember';
import fetch from 'ember-network/fetch';
import Validations from '../validations/reset-password';

const { inject: { service } } = Ember;

export default Ember.Route.extend(Validations, {
  cookies: service(),
  store: service(),
  intl: service(),
  session: service(),

  model () {
    return this;
  },

  renderTemplate(controller) {
    const thisRoute = this;

    if (this.get('session.isAuthenticated')) {
      this.render('errors/four-oh-four');
      return;
    }

    const email = controller.get('email');
    const resetCode = controller.get('resetCode');

    if (!email || !resetCode) {
      this.render('errors/four-oh-four');
      return;
    }

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
      body: JSON.stringify({ email, resetCode })
    };

    fetch(`${host}/reset-password/check`, init)
      .then(checkStatus)
      .then(parseJSON)
      .then(() => {
        thisRoute.render('reset-password');
      })
      .catch(() => {
        thisRoute.render('errors/four-oh-four');
      });

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
});
