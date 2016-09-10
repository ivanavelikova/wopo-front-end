import Ember from 'ember';

export default Ember.Component.extend({
  options: [],
  
  didInsertElement () {
    const selectBox = this.$('.select2');
    selectBox.select2({
      theme: 'bootstrap',
      data: this.get('options')
    });
  }
});
