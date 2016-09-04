import { moduleFor, test } from 'ember-qunit';

moduleFor('route:content/articles/index', 'Unit | Route | content/articles/index', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
