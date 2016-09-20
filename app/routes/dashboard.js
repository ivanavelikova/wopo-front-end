import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { inject: { service } } = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: service(),

  beforeModel () {
    this._super(...arguments);

    if (this.get('session.data.firstSteps')) {
      this.transitionTo('welcome');
    }
  },
});
