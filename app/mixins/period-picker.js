import Ember from 'ember';

const {
  computed,
  observer
} = Ember;

export default Ember.Mixin.create({
  isOngoing: false,
  period: null,

  startDateValidation: computed.oneWay('validations.attrs.data.startDate'),
  endDateValidation: computed.oneWay('validations.attrs.data.endDate'),

  periodIsValid: computed('startDateValidation.isValid', 'endDateValidation.isValid', function () {
    const startDateIsValid = this.get('startDateValidation.isValid');
    const endDateIsValid = this.get('endDateValidation.isValid');

    return startDateIsValid && endDateIsValid;
  }),

  periodShowErrorMessage: computed('startDateValidation.isInvalid', 'endDateValidation.isInvalid', function () {
    const startDateInvalid = this.get('startDateValidation.isInvalid');
    const startDateIsDirty = this.get('startDateValidation.isDirty');
    const endDateInvalid = this.get('endDateValidation.isInvalid');
    const endDateIsDirty = this.get('endDateValidation.isDirty');

    return (startDateInvalid && startDateIsDirty) || (endDateInvalid && endDateIsDirty);
  }),

  periodMessage: computed('startDateValidation.messages', 'endDateValidation.messages', function () {
    const startDate = this.get('startDateValidation.messages');

    if (startDate.length) {
      return startDate[0];
    }

    const endDate = this.get('endDateValidation.messages');

    if (endDate.length) {
      return endDate[0];
    }
  }),

  updatePeriod: observer('period', function () {
    const period = this.get('period');
    const dates = period.split(' - ');
    
    if (!dates[0]) {
      dates[0] = '';
    }
    
    if (!dates[1]) {
      dates[1] = null;
    }

    this.set('data.startDate', dates[0]);
    this.set('data.endDate', dates[1]);
  }),

  switchDates: observer('isOngoing', function () {
    if (this.get('isOngoing')) {
      this.set('data.endDate', null);
      return;
    }

    const startDate = this.get('data.startDate');

    if (!startDate) {
      return;
    }

    const period = this.get('period') || '';
    let endDate = period.split(' - ')[1];
    
    if (endDate) {
      this.set('data.endDate', endDate);
    }

    if (!startDate || !endDate) {
      this.set('period', '');
    }

    if (startDate && !endDate) {
      endDate = startDate;
    }

    this.set('period', `${startDate} - ${endDate}`);
  }),

  updateWhenModalVisible: observer('modalVisible', function () {
    if (!this.get('modalVisible')) {
      this.set('isOngoing', false);
      this.set('period', '');
      this.set('data.startDate', null);
      return;
    }

    const startDate = this.get('data.startDate');
    const endDate = this.get('data.endDate');

    if (endDate) {
      this.set('period', `${startDate} - ${endDate}`);
      return;
    }

    if (startDate) {
      this.set('isOngoing', this.get('data.endDate') === null);
    }
  })
});
