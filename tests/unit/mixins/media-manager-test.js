import Ember from 'ember';
import MediaManagerMixin from 'front-end/mixins/media-manager';
import { module, test } from 'qunit';

module('Unit | Mixin | media manager');

// Replace this with your real tests.
test('it works', function(assert) {
  let MediaManagerObject = Ember.Object.extend(MediaManagerMixin);
  let subject = MediaManagerObject.create();
  assert.ok(subject);
});
