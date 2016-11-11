import DS from 'ember-data';

export default DS.Model.extend({
  organization: DS.attr('string'),
  start_date: DS.attr('string'),
  end_date: DS.attr('string')
});
