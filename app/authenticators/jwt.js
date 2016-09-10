import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';

const {
  RSVP,
  isEmpty
} = Ember;

export default Base.extend({
  restore(data) {
    return new RSVP.Promise((resolve, reject) => {
      if (!this._validate(data)) {
        reject();
        return;
      }

      resolve(data);
    });
  },

  authenticate(/*args*/) {
  },

  invalidate(/*data*/) {
  },

  _validate(data) {
    return !isEmpty(data['token']);
  }
});
