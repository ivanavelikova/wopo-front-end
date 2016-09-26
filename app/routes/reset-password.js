import Ember from 'ember';
import BaseRoute from 'front-end/routes/base';
import Validations from '../validations/reset-password';

const { inject: { service } } = Ember;

export default BaseRoute.extend(Validations, {
  session: service(),
  network: service(),

  model () {
    return this;
  },

  renderTemplate(controller) {
    if (this.get('session.isAuthenticated')) {
      this.render('errors/four-oh-four');
      return;
    }

    const email = controller.get('email');
    const resetCode = controller.get('resetCode');

    if (!email || !resetCode) {
      this.render('errors/four-oh-four');
      return;
    }

    this
      .get('network')
      .post('reset-password/check', { email, resetCode })
      .then(() => {
        this.render('reset-password');
      })
      .catch(() => {
        this.render('errors/four-oh-four');
      });
  }
});
