import Ember from 'ember';
import ComputeDate from '../mixins/compute-date';

const {
  computed
} = Ember;

export default Ember.Component.extend(ComputeDate, {
  classNames: ['col-xl-4', 'col-md-6'],

  isImageUrlOrCover: computed('data.image_url', 'data.cover', function () {
    return (this.get('data.image_url')) ? true : false;
  })
});
