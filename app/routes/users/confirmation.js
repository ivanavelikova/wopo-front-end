import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Route.extend({
  session: service(),

  queryParams: {
    email: {
      refreshModel: true
    },
    confirmationCode: {
      refreshModel: true
    }
  },

  renderTemplate(controller) {
    const email = controller.get('email');
    const confirmationCode = controller.get('confirmationCode');

    if (!email || !confirmationCode) {
      this.render('errors/four-oh-four');
      return;
    }

    this.get('session')
      .authenticate('authenticator:confirmation-jwt', email, confirmationCode)
      .then(() => {
        this.transitionTo('dashboard');
      })
      .catch(() => {
        this.render('errors/four-oh-four');
      });
  }
});
