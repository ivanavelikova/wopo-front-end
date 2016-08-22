import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement () {
    const editor = this.$('.summernote');
    editor.summernote({
      height: 200,
      popover: {
        image: [],
        link: [],
        air: []
      },
      fontNames: ['Arial', 'Helvetica', 'Roboto', 'Tahoma', 'Times New Roman', 'Verdana']
    });

    this.set('editor', editor);
  },

  willDestroyElement () {
    this.get('editor').summernote('destroy');
  }
});
