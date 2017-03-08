import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import AuthConfiguration from 'ember-simple-auth/configuration';

const { inject: { service } } = Ember;

export default Ember.Route.extend(ApplicationRouteMixin, {
  intl: service(),
  session: service(),

  beforeModel () {
    if (window.cookieconsent) {
      window.cookieconsent.initialise({
        "palette": {
          "popup": {
            "background": "#efefef",
            "text": "#404040"
          },
          "button": {
            "background": "#4b81e8",
            "text": "#ffffff"
          }
        },
        "theme": "classic",
        "position": "bottom-right",
        "content": {
          "message": "Този сайт използва \"бисквитки\", за да оптимизира опита на потребителите в сърфирането.",
          "dismiss": "Разбрах!",
          "link": "Научи повече"
        }
      });
    }

    if (this.get('session.data.firstSteps')) {
      AuthConfiguration.routeAfterAuthentication = 'welcome';
      AuthConfiguration.routeIfAlreadyAuthenticated = 'welcome';
    }

    return this.get('intl').setLocale('bg-bg');
  },

  sessionAuthenticated () {
    if (this.get('session.data.firstSteps')) {
      AuthConfiguration.routeAfterAuthentication = 'welcome';
      AuthConfiguration.routeIfAlreadyAuthenticated = 'welcome';
    }

    this._super();
  },

  sessionInvalidated () {
    if (this.get('session.skipRedirectOnInvalidation')) {
      return;
    }

    this._super(...arguments);
  }
});
