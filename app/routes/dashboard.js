import Ember from 'ember';
import BaseRoute from 'front-end/routes/base';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { inject: { service } } = Ember;

export default BaseRoute.extend(AuthenticatedRouteMixin, {
  session: service(),

  model () {
    return this.get('store').findRecord('profile', 1);
  },

  beforeModel () {
    this._super(...arguments);

    if (this.get('session.data.firstSteps')) {
      this.transitionTo('welcome');
    }
  },
});
