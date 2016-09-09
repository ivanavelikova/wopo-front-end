import Ember from 'ember';
import JWT from './jwt';

const {
  RSVP,
  $: jQuery,
  inject: { service }
} = Ember;

export default JWT.extend({
  store: service(),
  cookies: service(),
  intl: service(),

  authenticate(email, confirmationCode) {
    return new RSVP.Promise((resolve, reject) => {
      const data = { email, confirmationCode };

      this.makeRequest(data).then(resolve, reject);
    });
  },

  makeRequest(data) {
    const csrfToken = this.get('cookies').read('XSRF-TOKEN');
    const host = this.get('store').adapterFor('application').get('host');

    const options = {
      url: `${host}/users/confirmation`,
      data,
      type: 'POST',
      dataType: 'json',
      contentType: 'application/x-www-form-urlencoded',
      headers: {
        'X-XSRF-TOKEN': decodeURIComponent(csrfToken),
        'X-Locale': this.get('intl').get('locale')[0]
      }
    };

    return jQuery.ajax(options);
  }
});
