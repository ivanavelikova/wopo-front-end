import Ember from 'ember';
import BaseValidator from 'ember-cp-validations/validators/base';

const UniqueEmail = BaseValidator.extend({
  store: Ember.inject.service(),
  intl: Ember.inject.service(),

  validate(value) {
    return this.get('store')
      .queryRecord('user', { email: value })
      .then(result => {
        return Ember.isEmpty(result) ? true : this.get('intl').t('errors.uniqueEmail');
      });
  }
});

export default UniqueEmail;
