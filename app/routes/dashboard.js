import Ember from 'ember';
import BaseRoute from 'front-end/routes/base';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
  RSVP,
  inject: {
    service
  }
} = Ember;

export default BaseRoute.extend(AuthenticatedRouteMixin, {
  session: service(),

  model () {
    const store = this.get('store');

    return RSVP.hash({
      portfolio: store.findRecord('portfolio', 1),
      profile: store.findRecord('profile', 1)
    });
  },

  beforeModel () {
    this._super(...arguments);

    if (this.get('session.data.firstSteps')) {
      this.transitionTo('welcome');
    }
  },
});
