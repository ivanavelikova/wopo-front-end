import Ember from 'ember';
import Validations from '../validations/work-experience';
import FormModal from '../mixins/form-modal';
import PeriodPicker from '../mixins/period-picker';

const WorkExperienceModalMixin = Ember.Mixin.create(Validations, FormModal, PeriodPicker);
const { observer } = Ember;

export default Ember.Component.extend(WorkExperienceModalMixin, {
  updateWhenModalVisible: observer('modalVisible', function () {
    if (!this.get('modalVisible')) {
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
