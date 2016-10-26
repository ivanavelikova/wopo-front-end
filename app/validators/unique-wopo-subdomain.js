import Ember from 'ember';
import BaseValidator from 'ember-cp-validations/validators/base';

const {
  inject: {
    service
  }
} = Ember;

const UniqueWopoSubdomain = BaseValidator.extend({
  network: service(),

  validate(value/*, options, model, attribute*/) {
    // TODO: validation
    return true;
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
