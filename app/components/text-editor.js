import Ember from 'ember';

const { observer } = Ember;

export default Ember.Component.extend({
  updateOnChange: true,

  updateData: observer('value', function () {
    const value = this.get('value');
    const editor = CKEDITOR.instances[this.get('editorId')];
    
    if (value === null) {
      this.set('updateOnChange', false);

      editor.setData('', {
        callback: () => {
          if (editor.getData() === '') {
            this.set('updateOnChange', true);
          }
        }
      });
    }
  }),

  didInsertElement () {
    const config = {
      toolbarGroups: [
        { name: 'tools' },
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
        { name: 'styles' },
        { name: 'others' }
      ],
      removeButtons: 'Underline,Subscript,Superscript,Strike,Styles',
      extraPlugins: 'markdown',
      format_tags: 'p;h1;h2;h3;pre'
    };
    const editor = CKEDITOR.replace(this.get('editorId'), config);

    editor.on('change', () => {
      if (this.get('updateOnChange')) {
        this.set('value', toMarkdown(editor.getData()));
      }
    });
  },

  willDestroyElement () {
    CKEDITOR.instances[this.get('editorId')].destroy();
  }
});
