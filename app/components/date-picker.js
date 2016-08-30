import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement () {
    const datePicker = this.$('#datepicker');
    datePicker.daterangepicker({});
  }
});
