import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';

const {
  RSVP,
  isEmpty,
  inject: { service }
} = Ember;

export default Base.extend({
  session: service(),
  network: service(),

  restore(data) {
    return new RSVP.Promise((resolve, reject) => {
      if (!this._validate(data)) {
        reject();
        return;
      }

      const failure = (reason) => {
        if (reason.errors && reason.errors[0].detail) {
          reject(reason.errors[0].detail);
          return;
        }

        reject(reason);
      };

      this
        .get('network')
        .post('session/check', {}, data.token)
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

      this
        .get('network')
        .post('session', data)
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

  invalidate() {
    return new RSVP.Promise((resolve, reject) => {
      let sessionData = this.get('session.data');

      if (!this._validate(sessionData, 'firstSteps')) {
        resolve();
        return;
      }

      const data = {
        firstSteps: sessionData.firstSteps
      };

      this.
        get('network')
        .post('session/first-steps', data, true)
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
  }
});
