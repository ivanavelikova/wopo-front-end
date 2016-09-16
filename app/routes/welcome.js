import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const routeMixin = Ember.Mixin.create(AuthenticatedRouteMixin);

export default Ember.Route.extend(routeMixin, {
});
