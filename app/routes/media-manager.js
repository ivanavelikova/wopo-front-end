import Ember from 'ember';
import BaseRoute from 'front-end/routes/base';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default BaseRoute.extend(AuthenticatedRouteMixin, {
  isFastBoot: Ember.computed.reads('fastboot.isFastBoot'),

  renderTemplate () {
    if (this.get('isFastBoot') || !window.opener) {
      this.render('errors/four-oh-four');
      return;
    }

    this.render('media-manager');
  }
});
