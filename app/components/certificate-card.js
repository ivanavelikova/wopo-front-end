import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  classNames: ['col-xl-4', 'col-md-6'],
  
  isImageUrlOrCover: computed('data.image_url', 'data.cover', function () {
    return (this.get('data.image_url')) ? true : false;
  })
});
