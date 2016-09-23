import Ember from 'ember';
import Validations from '../validations/work-experience';
import FormModal from '../mixins/form-modal';
import PeriodPicker from '../mixins/period-picker';

const WorkExperienceModalMixin = Ember.Mixin.create(Validations, FormModal, PeriodPicker);

export default Ember.Component.extend(WorkExperienceModalMixin, {
});
