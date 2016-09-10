import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement () {
    const languagePicker = this.$('.languagepicker');
    languagePicker.select2({
      theme: "bootstrap"
    });
  }
});
