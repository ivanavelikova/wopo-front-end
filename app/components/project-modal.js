import Ember from 'ember';
import Validations from '../validations/project';
import FormModal from '../mixins/form-modal';
import PeriodPicker from '../mixins/period-picker';
import MediaManager from '../mixins/media-manager';

const EducationModalMixin = Ember.Mixin.create(Validations, FormModal, PeriodPicker, MediaManager);

export default Ember.Component.extend(EducationModalMixin, {
});
