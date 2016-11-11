import DS from 'ember-data';

export default DS.Model.extend({
  cover: DS.attr('string'),
  name: DS.attr('string')
});
