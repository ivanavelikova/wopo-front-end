import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  slug: DS.attr('string'),
  description: DS.attr('string'),
  cover: DS.attr('string'),
  uid: DS.attr('string'),
  custom: DS.attr('boolean'),
  demo_url: DS.attr('string')
});
