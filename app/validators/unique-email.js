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
    const checkEmail = () => {
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
    };

    return this
      .get('network')
      .getData('profiles/1', true)
      .then(response => {
        if (response.profile.email === value) {
          return true;
        }

        return checkEmail();
      })
      .catch(checkEmail);
  }
});

export default UniqueEmail;
