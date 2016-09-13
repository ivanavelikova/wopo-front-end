import Ember from 'ember';
import JWT from './jwt';

const {
  RSVP,
  inject: { service }
} = Ember;

export default JWT.extend({
  session: service(),

  authenticate(email, resetCode, password) {
    return new RSVP.Promise((resolve, reject) => {
      const data = { email, resetCode, password };

      this.makeRequest('users/reset-password', data).then(response => {
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
  }
});
