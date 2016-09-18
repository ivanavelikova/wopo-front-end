import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { computed, inject: { service } } = Ember;
const routeMixin = Ember.Mixin.create(AuthenticatedRouteMixin);

export default Ember.Route.extend(routeMixin, {
  storage: service(),
  fastboot: service(),
  isFastBoot: computed.reads('fastboot.isFastBoot'),

  setupController (controller, model) {
    this._super(controller, model);

    if (!this.get('isFastBoot')) {
      if (this.get('storage.currentStep')) {
        this.controller.set('currentStep', this.get('storage.currentStep'));
      }
    }
  }
});
