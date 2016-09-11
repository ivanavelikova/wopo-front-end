import Ember from 'ember';
import Validations from '../validations/login';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

const loginMixin = Ember.Mixin.create(Validations, UnauthenticatedRouteMixin);

export default Ember.Route.extend(loginMixin, {
  model () {
    return this;
  }
});
