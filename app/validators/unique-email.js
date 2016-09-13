import Ember from 'ember';
import BaseValidator from 'ember-cp-validations/validators/base';

const UniqueEmail = BaseValidator.extend({
  store: Ember.inject.service(),
  intl: Ember.inject.service(),

  validate(value, options) {
    let condition = true;

    if (options.unique === false) {
      condition = false;
    }

    return this.get('store')
      .queryRecord('user', { email: value })
      .then(result => {
        if (Ember.isEmpty(result) !== condition && condition === true) {
          return this.get('intl').t('errors.uniqueEmail');
        }

        if (Ember.isEmpty(result) !== condition && condition === false) {
          return this.get('intl').t('errors.notUniqueEmail');
        }

        return true;
      });
  }
});

export default UniqueEmail;
