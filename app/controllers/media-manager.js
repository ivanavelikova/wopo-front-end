import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({
  queryParams: ['CKEditor', 'CKEditorFuncNum'],
  CKEditor: null,
  CKEditorFuncNum: null,

  isCKEditor: computed('CKEditor', function () {
    return this.get('CKEditor') !== null;
  })
});
