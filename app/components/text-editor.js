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

  onUpdateValue: observer('updateValue', function () {
    const value = this.get('value');
    const editor = CKEDITOR.instances[this.get('editorId')];

    if (this.get('updateValue') && editor && value) {
      editor.setData(value);
    }
  }),

  didInsertElement () {
    $.fn.modal.Constructor.prototype._enforceFocus = function () {};

    CKEDITOR.addCss( 'img { width: 100% }' );

    const config = {
      toolbarGroups: [
        { name: 'tools' },
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
        { name: 'links' },
        { name: 'insert' },
        { name: 'styles' },
        { name: 'others' }
      ],
      removeButtons: 'Underline,Subscript,Superscript,Strike,Styles,Table,Anchor',
      format_tags: 'p;h1;h2;h3;pre',
      filebrowserBrowseUrl: '/media-manager',
      disallowedContent: 'img{width,height,border*,margin*,float*}'
    };
    const editor = CKEDITOR.replace(this.get('editorId'), config);
    editor.setData(this.get('value'));

    editor.on('change', () => {
      if (this.get('updateOnChange')) {
        this.set('value', editor.getData());
      }
    });
  }
});
