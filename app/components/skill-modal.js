import Ember from 'ember';
import Validations from '../validations/skill';
import FormModal from '../mixins/form-modal';

const SkillModalMixin = Ember.Mixin.create(Validations, FormModal);

export default Ember.Component.extend(SkillModalMixin, {
});
