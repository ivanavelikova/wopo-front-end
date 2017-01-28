import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  slug: DS.attr('string'),
  description: DS.attr('string'),
  cover: DS.attr('string'),
  demo_url: DS.attr('string'),
  uid: DS.attr('string')
});
