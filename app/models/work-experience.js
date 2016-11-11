import DS from 'ember-data';

export default DS.Model.extend({
  position: DS.attr('string'),
  start_date: DS.attr('string'),
  end_date: DS.attr('string'),
  employer: DS.attr('string'),
  responsibilities: DS.attr('string')
});
