import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:unique-wopo-subdomain', 'Unit | Validator | unique-wopo-subdomain', {
  needs: ['validator:messages']
});

test('it works', function(assert) {
  var validator = this.subject();
  assert.ok(validator);
});
