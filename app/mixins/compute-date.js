import Ember from 'ember';
import moment from 'moment';

const { computed } = Ember;

export default Ember.Mixin.create({
  date: computed('data.startDate', 'data.endDate', 'data.start_date', 'data.end_date', function () {
    let startDate = this.get('data.startDate') ? this.get('data.startDate') : this.get('data.start_date');
    let endDate = this.get('data.endDate') ? this.get('data.endDate') : this.get('data.end_date');

    const isStartDateFormatted = moment(startDate, 'MM/DD/YYYY', true).isValid();
    const isEndDateFormatted = moment(endDate, 'MM/DD/YYYY', true).isValid();

    if (!isStartDateFormatted || !isEndDateFormatted) {
      startDate = moment(startDate).format('MM/DD/YYYY');

      if (endDate) {
        endDate = moment(endDate).format('MM/DD/YYYY');
      }
    }

    return (endDate) ? `${startDate} - ${endDate}` : startDate;
  })
});
