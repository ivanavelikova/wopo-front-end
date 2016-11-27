import Ember from 'ember';
import Validations from '../validations/certificate';
import FormModal from '../mixins/form-modal';

const {
  inject: {
    service
  }
} = Ember;

const CertificateModalMixin = Ember.Mixin.create(Validations, FormModal);

export default Ember.Component.extend(CertificateModalMixin, {
  mediaManager: service('media-manager'),

  didInsertElement () {
    const setImageUrl = (function setImageUrl (e) {
      const data = e.originalEvent.data;

      this.set('data.image_url', data.media);
    }).bind(this);

    $(window).on('message', setImageUrl);
    
    this.set('setImageUrl', setImageUrl);
  },

  willDestroyElement () {
    $(window).off('message', this.get('setImageUrl'));
  },

  actions: {
    openMediaManager () {
      this.get('mediaManager').open();
    }
  }
});
