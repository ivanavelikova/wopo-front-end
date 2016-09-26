import Ember from 'ember';
import JWT from './jwt';

const { RSVP } = Ember;

export default JWT.extend({
  authenticate(email, resetCode, password) {
    return new RSVP.Promise((resolve, reject) => {
      const data = { email, resetCode, password };

      this
        .get('network')
        .post('reset-password', data)
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
  }
});
