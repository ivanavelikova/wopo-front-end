import DS from 'ember-data';

export default DS.Model.extend({
  message: DS.attr('string'),
  image_url: DS.attr('string'),
  url: DS.attr('string'),
  seen: DS.attr('boolean'),
  created_at: DS.attr('date')
});
