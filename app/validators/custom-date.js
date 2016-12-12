import Ember from 'ember';
import BaseValidator from 'ember-cp-validations/validators/base';
import moment from 'moment';

const {
  inject: {
    service
  }
} = Ember;

const CustomDate = BaseValidator.extend({
  intl: service(),

  validate(value/*, options, model, attribute*/) {
    if (value === null || value === '') {
      return true;
    }

    const intl = this.get('intl');

    const date = moment(value, 'MM/DD/YYYY', true);
    const dateAfter = moment('12/31/1899', 'MM/DD/YYYY', true);

    if (date.isValid() && date.isAfter(dateAfter)) {
      return true;
    }

    return intl.t('errors.date', {
      description: intl.t('errors.description')
    });
  }
});

CustomDate.reopenClass({
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

export default CustomDate;
