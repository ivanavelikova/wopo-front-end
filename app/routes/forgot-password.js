import Ember from 'ember';
import BaseRoute from 'front-end/routes/base';
import Validations from '../validations/forgot-password';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

const forgotPassMixin = Ember.Mixin.create(Validations, UnauthenticatedRouteMixin);

export default BaseRoute.extend(forgotPassMixin, {
  model () {
    return this;
  }
});
