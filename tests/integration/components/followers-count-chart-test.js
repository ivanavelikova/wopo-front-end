import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('followers-count-chart', 'Integration | Component | followers count chart', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{followers-count-chart}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#followers-count-chart}}
      template block text
    {{/followers-count-chart}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
