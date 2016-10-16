import Ember from 'ember';
import Validations from '../validations/education';
import FormModal from '../mixins/form-modal';
import PeriodPicker from '../mixins/period-picker';

const EducationModalMixin = Ember.Mixin.create(Validations, FormModal, PeriodPicker);

export default Ember.Component.extend(EducationModalMixin, {
});
