import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('index-reviews', 'Integration | Component | index reviews', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{index-reviews}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#index-reviews}}
      template block text
    {{/index-reviews}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
