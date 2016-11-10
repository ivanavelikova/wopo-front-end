import DS from 'ember-data';

export default DS.Model.extend({
  cover: DS.attr('string'),
  name: DS.attr('string'),
  description: DS.attr('string'),
  start_date: DS.attr('string'),
  end_date: DS.attr('string')
});
