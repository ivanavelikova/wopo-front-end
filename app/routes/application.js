import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import AuthConfiguration from 'ember-simple-auth/configuration';

const { inject: { service } } = Ember;

export default Ember.Route.extend(ApplicationRouteMixin, {
  intl: service(),
  session: service(),

  beforeModel() {
    if (this.get('session.data.portfolioDone') === false) {
      AuthConfiguration.routeAfterAuthentication = 'welcome';
      AuthConfiguration.routeIfAlreadyAuthenticated = 'welcome';
    }

    return this.get('intl').setLocale('bg-bg');
  }
});
