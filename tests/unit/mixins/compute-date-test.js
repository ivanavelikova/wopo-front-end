import Ember from 'ember';
import ComputeDateMixin from 'front-end/mixins/compute-date';
import { module, test } from 'qunit';

module('Unit | Mixin | compute date');

// Replace this with your real tests.
test('it works', function(assert) {
  let ComputeDateObject = Ember.Object.extend(ComputeDateMixin);
  let subject = ComputeDateObject.create();
  assert.ok(subject);
});
