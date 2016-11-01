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

  beforeModel () {
    this._super(...arguments);

    if (!this.get('session.data.firstSteps')) {
      this.transitionTo('dashboard');
    }
  },

  model () {
    return RSVP.hash({
      themes: this.get('store').findAll('theme')
    });
  }
});
