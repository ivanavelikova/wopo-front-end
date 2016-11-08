import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  keywords: DS.attr('string'),
  job_offers: DS.attr('boolean'),
  about: DS.attr('string')
});
