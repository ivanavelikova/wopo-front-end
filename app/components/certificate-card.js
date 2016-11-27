import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  isImageUrlOrCover: computed('data.image_url', 'data.cover', function () {
    return (this.get('data.image_url')) ? true : false;
  })
});
