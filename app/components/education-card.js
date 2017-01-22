import Ember from 'ember';
import ComputeDate from '../mixins/compute-date';

export default Ember.Component.extend(ComputeDate, {
  classNames: ['col-xl-4', 'col-md-6']
});
