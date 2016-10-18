import Ember from 'ember';
import Validations from '../validations/certificate';
import FormModal from '../mixins/form-modal';
import MediaManager from '../mixins/media-manager';

const CertificateModalMixin = Ember.Mixin.create(Validations, FormModal, MediaManager);

export default Ember.Component.extend(CertificateModalMixin, {
});
