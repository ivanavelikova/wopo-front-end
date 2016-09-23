import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement () {
    const editor = this.$('.summernote');

    editor.summernote({
      placeholder: this.get('placeholder'),
      height: 200,
      toolbar: [
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['font', ['fontname' , 'strikethrough', 'superscript', 'subscript']],
        ['fontsize', ['fontsize']],
        ['height', ['height']],
        ['color', ['color']],
        ['para', ['style', 'ul', 'ol', 'paragraph', 'heigth']],
        ['insert', ['picture', 'link', 'video', 'table', 'hr']]
      ],
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
