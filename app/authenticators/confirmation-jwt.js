import Ember from 'ember';
import JWT from './jwt';

const {
  RSVP,
  inject: { service }
} = Ember;

export default JWT.extend({
  session: service(),

  authenticate(email, confirmationCode) {
    return new RSVP.Promise((resolve, reject) => {
      const data = { email, confirmationCode };

      this.makeRequest('confirmation', data)
        .then(response => {
          if (!this._validate(response)) {
            reject('token is missing in server response');
            return;
          }

          response.portfolioDone = false;

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
  }
});
