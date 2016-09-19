import Ember from 'ember';
import FirstStepsDataMixin from 'front-end/mixins/first-steps-data';
import { module, test } from 'qunit';

module('Unit | Mixin | first steps data');

// Replace this with your real tests.
test('it works', function(assert) {
  let FirstStepsDataObject = Ember.Object.extend(FirstStepsDataMixin);
  let subject = FirstStepsDataObject.create();
  assert.ok(subject);
});
