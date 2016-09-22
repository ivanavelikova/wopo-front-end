import Ember from 'ember';
import BaseRoute from 'front-end/routes/base';

const { inject: { service } } = Ember;

export default BaseRoute.extend({
  session: service(),

  renderTemplate(controller) {
    if (this.get('session.isAuthenticated')) {
      this.render('errors/four-oh-four');
      return;
    }

    const email = controller.get('email');
    const confirmationCode = controller.get('confirmationCode');

    if (!email || !confirmationCode) {
      this.render('errors/four-oh-four');
      return;
    }

    this.get('session')
      .authenticate('authenticator:confirmation-jwt', email, confirmationCode)
      .catch(() => {
        this.render('errors/four-oh-four');
      });
  }
});
