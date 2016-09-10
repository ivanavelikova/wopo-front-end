import Ember from 'ember';
import Validations from '../validations/registration';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

const registrationMixin = Ember.Mixin.create(Validations, UnauthenticatedRouteMixin);

export default Ember.Route.extend(registrationMixin, {
  model () {
    return this;
  }
});
