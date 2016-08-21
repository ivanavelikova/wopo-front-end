import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('attendance-count-chart', 'Integration | Component | attendance count chart', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{attendance-count-chart}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#attendance-count-chart}}
      template block text
    {{/attendance-count-chart}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
