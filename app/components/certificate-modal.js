import Ember from 'ember';
import Validations from '../validations/certificate';
import FormModal from '../mixins/form-modal';

const {
  observer,
  inject: {
    service
  }
} = Ember;

const CertificateModalMixin = Ember.Mixin.create(Validations, FormModal);

export default Ember.Component.extend(CertificateModalMixin, {
  mediaManager: service('media-manager'),

  onModalVisibleChange: observer('modalVisible', function () {
    const setImageUrl = (function (e) {
      const data = e.originalEvent.data;

      this.set('data.image_url', data.media);
    }).bind(this);

    if (this.get('modalVisible')) {
      $(window).on('message', setImageUrl);
    } else {
      $(window).off('message');
    }
  }),

  actions: {
    openMediaManager () {
      this.get('mediaManager').open();
    }
  }
});
