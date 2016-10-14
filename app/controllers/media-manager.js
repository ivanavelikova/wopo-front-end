import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({
  queryParams: ['CKEditor', 'CKEditorFuncNum', 'BrowseFuncNum'],
  CKEditor: null,
  CKEditorFuncNum: null,
  BrowseFuncNum: null,

  isCKEditor: computed('CKEditor', function () {
    return this.get('CKEditor') !== null && this.get('BrowseFuncNum') === null;
  }),

  funcNum: computed('CKEditorFuncNum', 'BrowseFuncNum', function () {
    return this.get('CKEditorFuncNum') || this.get('BrowseFuncNum');
  })
});
