import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('others-work-experiences', 'Integration | Component | others work experiences', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{others-work-experiences}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#others-work-experiences}}
      template block text
    {{/others-work-experiences}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
