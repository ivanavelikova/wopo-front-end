import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement () {
    const countryPicker = this.$('.countrypicker');
    countryPicker.select2({
      theme: "bootstrap"
    });
  }
});
