import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    if (window.innerWidth >= 768) {
      this.transitionTo('panel.statistics');
    }
  }
});
