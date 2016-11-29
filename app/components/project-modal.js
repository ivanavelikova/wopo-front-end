import Ember from 'ember';
import Validations from '../validations/project';
import FormModal from '../mixins/form-modal';
import PeriodPicker from '../mixins/period-picker';

const {
  observer,
  inject: {
    service
  }
} = Ember;

const ProjectModalMixin = Ember.Mixin.create(Validations, FormModal, PeriodPicker);

export default Ember.Component.extend(ProjectModalMixin, {
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
