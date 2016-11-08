import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  slug: DS.attr('string'),
  cover: DS.attr('string'),
  description: DS.attr('string'),
  installed: DS.attr('boolean')
});