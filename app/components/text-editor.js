import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    const editor = this.$('.summernote');
    editor.summernote();
    editor({
      popover: {
        image: [],
        link: [],
        air: []
      }
    });
  }
});
