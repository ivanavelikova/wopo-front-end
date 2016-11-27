import Ember from 'ember';
import Validations from '../validations/project';
import FormModal from '../mixins/form-modal';
import PeriodPicker from '../mixins/period-picker';

const {
  inject: {
    service
  }
} = Ember;

const EducationModalMixin = Ember.Mixin.create(Validations, FormModal, PeriodPicker);

export default Ember.Component.extend(EducationModalMixin, {
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
