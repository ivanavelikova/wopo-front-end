import Ember from 'ember';
import PeriodPickerMixin from 'front-end/mixins/period-picker';
import { module, test } from 'qunit';

module('Unit | Mixin | period picker');

// Replace this with your real tests.
test('it works', function(assert) {
  let PeriodPickerObject = Ember.Object.extend(PeriodPickerMixin);
  let subject = PeriodPickerObject.create();
  assert.ok(subject);
});
