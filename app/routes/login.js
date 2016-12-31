import Ember from 'ember';
import BaseRoute from 'front-end/routes/base';
import Validations from '../validations/login';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

const loginMixin = Ember.Mixin.create(Validations, UnauthenticatedRouteMixin);

const {
  inject: {
    service
  }
} = Ember;

export default BaseRoute.extend(loginMixin, {
  session: service(),
  intl: service(),

  model () {
    return this;
  },

  setupController (controller) {
    this._super(...arguments);

    if (this.get('session.data.emailUpdate')) {
      controller.set('alert', {
        type: 'info',
        content: this.get('intl').t('success.emailUpdateLogin')
      });
    }
  }
});
