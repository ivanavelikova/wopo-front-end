import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    tinymce.init({
      selector: '.text-editor',
      language: 'bg_BG',
      language_url: 'tinymce/langs/bg_BG.js'
    });
  }
});
