import Ember from 'ember';
import BaseRoute from 'front-end/routes/base';

const {
  inject: {
    service
  }
} = Ember;

export default BaseRoute.extend({
  session: service(),
  network: service(),

  renderTemplate (controller) {
    const email = controller.get('email');
    const confirmationCode = controller.get('confirmationCode');

    if (!email || !confirmationCode) {
      this.render('errors/four-oh-four');
      return;
    }

    const data = {
      email,
      confirmationCode
    };

    const transitionToLogin = () => {
      this.set('session.data.emailUpdate', true);
      this.transitionTo('login');
    };

    this
      .get('network')
      .put('profiles/email', data)
      .then(() => {
        if (this.get('session.isAuthenticated')) {
          this.set('session.skipRedirectOnInvalidation', true);

          this
            .get('session')
            .invalidate()
            .then(transitionToLogin);

          return;
        }

        transitionToLogin();
      })
      .catch(() => {
        this.render('errors/four-oh-four');
      });
  }
});
