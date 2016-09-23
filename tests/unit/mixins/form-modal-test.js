import Ember from 'ember';
import FormModalMixin from 'front-end/mixins/form-modal';
import { module, test } from 'qunit';

module('Unit | Mixin | form modal');

// Replace this with your real tests.
test('it works', function(assert) {
  let FormModalObject = Ember.Object.extend(FormModalMixin);
  let subject = FormModalObject.create();
  assert.ok(subject);
});
