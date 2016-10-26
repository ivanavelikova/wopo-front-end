import Ember from 'ember';
import BaseValidator from 'ember-cp-validations/validators/base';

const {
  inject: {
    service
  }
} = Ember;

const UniqueWopoSubdomain = BaseValidator.extend({
  network: service(),
  intl: service(),

  validate(value/*, options, model, attribute*/) {
    const intl = this.get('intl');
    const data = {
      subdomain: value
    };

    return this
      .get('network')
      .post('hosting/wopo/subdomain/check', data, true)
      .then(response => {
        if (response.exist) {
          return intl.t('errors.uniqueDomain');
        }

        return true;
      })
      .catch(() => {
        return intl.t('errors.serverFail');
      });
  }
});

UniqueWopoSubdomain.reopenClass({
  /**
   * Define attribute specific dependent keys for your validator
   *
   * @param {String}  attribute   The attribute being evaluated
   * @param {Unknown} options     Options passed into your validator
   * @return {Array}
   */
  getDependentsFor(/* attribute, options */) {
    return [];
  }
});

export default UniqueWopoSubdomain;
