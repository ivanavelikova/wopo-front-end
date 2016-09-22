import Ember from 'ember';
import BaseRoute from 'front-end/routes/base';
import Validations from '../validations/registration';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

const registrationMixin = Ember.Mixin.create(Validations, UnauthenticatedRouteMixin);

export default BaseRoute.extend(registrationMixin, {
  model () {
    return this;
  }
});
