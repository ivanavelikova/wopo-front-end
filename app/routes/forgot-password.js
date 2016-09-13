import Ember from 'ember';
import Validations from '../validations/forgot-password';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

const forgotPassMixin = Ember.Mixin.create(Validations, UnauthenticatedRouteMixin);

export default Ember.Route.extend(forgotPassMixin, {
  model () {
    return this;
  }
});
