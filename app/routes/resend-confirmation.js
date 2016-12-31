import Ember from 'ember';
import BaseRoute from 'front-end/routes/base';
import Validations from '../validations/resend-confirmation';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

const ResendConfirmationMixin = Ember.Mixin.create(Validations, UnauthenticatedRouteMixin);

export default BaseRoute.extend(ResendConfirmationMixin, {
  model () {
    return this;
  }
});
