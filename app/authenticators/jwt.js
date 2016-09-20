import Ember from 'ember';
import fetch from 'ember-network/fetch';
import Base from 'ember-simple-auth/authenticators/base';

const {
  RSVP,
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

      const failure = (reason) => {
        if (reason.errors && reason.errors[0].detail) {
          reject(reason.errors[0].detail);
          return;
        }

        reject(reason);
      };

      this
        .makeRequest('session/check', {}, headers)
        .then(() => {
          resolve(data);
        })
        .catch(error => {
          if (!error.response) {
            failure(error);
            return;
          }

          error.response.json().then(function(reason) {
            failure(reason);
          });
        });
    });
  },

  authenticate(email, password) {
    return new RSVP.Promise((resolve, reject) => {
      const data = { email, password };

      this.makeRequest('session', data)
        .then(response => {
          if (!this._validate(response)) {
            reject('token is missing in server response');
            return;
          }

          if (this._validate(response, 'firstSteps')) {
            this.get('session').set('data.firstSteps', response.firstSteps);
            delete response.firstSteps;
          }

          resolve(response);
        })
        .catch(error => {
          if (!error.response) {
            reject(error);
            return;
          }

          error.response.json().then(function(reason) {
            reject(reason);
          });
        });
    });
  },

  invalidate(data) {
    return new RSVP.Promise((resolve, reject) => {
      let sessionData = this.get('session.data');

      if (!this._validate(sessionData, 'firstSteps')) {
        resolve();
        return;
      }

      const firstSteps = sessionData.firstSteps;
      const headers = {
        'Authorization': `Bearer ${data.token}`
      };

      this.makeRequest('session/first-steps', { firstSteps }, headers)
        .then(() => {
          delete sessionData.firstSteps;
          this.set('session.data', sessionData);
          resolve();
        })
        .catch(error => {
          if (!error.response) {
            reject(error);
            return;
          }

          error.response.json().then(function(reason) {
            if (!reason.errors && !reason.errors[0].detail) {
              console.error(error);
              reject();
              return;
            }

            console.error(reason.errors[0].detail);
            reject();
          });
        });
    });
  },

  _validate(data, property = 'token') {
    return !isEmpty(data[property]);
  },

  makeRequest(path, data, assignHeaders) {
    const csrfToken = this.get('cookies').read('XSRF-TOKEN');
    const host = this.get('store').adapterFor('application').get('host');
    let headers = {
      'X-XSRF-TOKEN': decodeURIComponent(csrfToken),
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    if (this.get('intl').get('locale')) {
      headers['X-Locale'] = this.get('intl').get('locale')[0];
    }

    if (assignHeaders) {
      headers = Object.assign(assignHeaders, headers);
    }

    const init = {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    };

    return fetch(`${host}/${path}`, init)
      .then(checkStatus)
      .then(parseJSON);

    function checkStatus (response) {
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    }

    function parseJSON (response) {
      return response.json();
    }
  }
});
