import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement () {
    const datePicker = this.$('#datepicker');
    datePicker.daterangepicker();

    this.set('datePicker', datePicker);
  },

  willDestroyElement () {
    const instance = this.get('datePicker').data('daterangepicker');
    instance.remove();
  }
});
