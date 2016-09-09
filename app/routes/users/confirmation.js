import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Route.extend({
  session: service(),

  renderTemplate() {
    const email = 'asd@asd.com';
    const confirmationCode = 'asd';

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
