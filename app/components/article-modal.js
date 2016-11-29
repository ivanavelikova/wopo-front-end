import Ember from 'ember';
import Validations from '../validations/article';
import FormModal from '../mixins/form-modal';

const {
  observer,
  inject: {
    service
  }
} = Ember;

const ArticleModalMixin = Ember.Mixin.create(Validations, FormModal);

export default Ember.Component.extend(ArticleModalMixin, {
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
