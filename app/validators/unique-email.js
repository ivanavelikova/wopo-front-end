import Ember from 'ember';
import BaseValidator from 'ember-cp-validations/validators/base';

const {
  inject: {
    service
  }
} = Ember;

const UniqueEmail = BaseValidator.extend({
  store: service(),
  intl: service(),
  network: service(),

  validate(value, options) {
    const intl = this.get('intl');
    let condition = true;

    if (options.unique === false) {
      condition = false;
    }

    return this
      .get('store')
      .queryRecord('user', { email: value })
      .then(result => {
        if (Ember.isEmpty(result) !== condition && condition === true) {
          return intl.t('errors.uniqueEmail');
        }

        if (Ember.isEmpty(result) !== condition && condition === false) {
          return intl.t('errors.notUniqueEmail');
        }

        return true;
      }, () => intl.t('errors.serverFail'));
  }
});

export default UniqueEmail;
