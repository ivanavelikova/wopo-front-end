import DS from 'ember-data';

export default DS.Model.extend({
  profile_pic: DS.attr('string'),
  name: DS.attr('string'),
  email: DS.attr('string'),
  country: DS.attr('string'),
  language: DS.attr('string')
});
