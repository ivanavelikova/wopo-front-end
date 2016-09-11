import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';

const {
  RSVP,
  $: jQuery,
  isEmpty,
  inject: { service }
} = Ember;

export default Base.extend({
  cookies: service(),
  store: service(),
  intl: service(),
  session: service(),

  restore(data) {
    return new RSVP.Promise((resolve, reject) => {
      if (!this._validate(data)) {
        reject();
        return;
      }

      const headers = {
        'Authorization': `Bearer ${data.token}`
      };

      this.makeRequest('users/session/check', {}, headers).then(success, failure);

      function success () {
        resolve(data);
      }

      function failure (reason) {
        reject(reason.responseJSON.errors[0].detail);
      }
    });
  },

  authenticate(email, password) {
    return new RSVP.Promise((resolve, reject) => {
      const data = { email, password };

      this.makeRequest('users/session', data).then(response => {
        if (!this._validate(response)) {
          reject('token is missing in server response');
          return;
        }

        if (!this._validate(response, 'portfolioDone')) {
          reject('portfolioDone is missing in server response');
          return;
        }

        resolve(response);
      }, reject);
    });
  },

  invalidate(/*data*/) {
  },

  _validate(data, property = 'token') {
    return !isEmpty(data[property]);
  },

  makeRequest(path, data, assignHeaders) {
    const csrfToken = this.get('cookies').read('XSRF-TOKEN');
    const host = this.get('store').adapterFor('application').get('host');
    let headers = {
      'X-XSRF-TOKEN': decodeURIComponent(csrfToken),
      'X-Locale': this.get('intl').get('locale')[0]
    };

    if (assignHeaders) {
      headers = Object.assign(assignHeaders, headers);
    }

    const options = {
      url: `${host}/${path}`,
      data,
      type: 'POST',
      dataType: 'json',
      contentType: 'application/x-www-form-urlencoded',
      headers
    };

    return jQuery.ajax(options);
  }
});
