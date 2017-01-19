import Ember from 'ember';
import BaseRoute from 'front-end/routes/base';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { RSVP } = Ember;

export default BaseRoute.extend(AuthenticatedRouteMixin, {
  model () {
    const store = this.get('store');

    return RSVP.hash({
      profile: store.findRecord('profile', 1)
    });
  }
});
