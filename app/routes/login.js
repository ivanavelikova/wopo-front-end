import Ember from 'ember';
import BaseRoute from 'front-end/routes/base';
import Validations from '../validations/login';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

const loginMixin = Ember.Mixin.create(Validations, UnauthenticatedRouteMixin);

export default BaseRoute.extend(loginMixin, {
  model () {
    return this;
  }
});
