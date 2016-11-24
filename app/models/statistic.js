import DS from 'ember-data';

export default DS.Model.extend({
  todaysVisitsCount: DS.attr('number'),
  articlesCount: DS.attr('number'),
  projectsCount: DS.attr('number'),
  workExperiencesCount: DS.attr('number'),
  visitsMonth: DS.attr()
});
