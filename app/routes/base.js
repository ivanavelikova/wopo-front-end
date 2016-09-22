import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    this._super();
    window.scrollTo(0,0);
  }
});
