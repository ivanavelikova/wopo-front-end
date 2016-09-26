import Ember from 'ember';
import JWT from './jwt';

const { RSVP } = Ember;

export default JWT.extend({
  authenticate(email, confirmationCode) {
    return new RSVP.Promise((resolve, reject) => {
      const data = { email, confirmationCode };

      this
        .get('network')
        .post('confirmation', data)
        .then(response => {
          if (!this._validate(response)) {
            reject('token is missing in server response');
            return;
          }

          this.get('session').set('data.firstSteps', {});

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
