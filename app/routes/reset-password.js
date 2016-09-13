import Ember from 'ember';
import Validations from '../validations/reset-password';

const {
  $: jQuery,
  inject: { service }
} = Ember;

export default Ember.Route.extend(Validations, {
  cookies: service(),
  store: service(),
  intl: service(),
  session: service(),

  model () {
    return this;
  },

  renderTemplate(controller) {
    const thisRoute = this;

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

    const csrfToken = this.get('cookies').read('XSRF-TOKEN');
    const host = this.get('store').adapterFor('application').get('host');
    const options = {
      url: `${host}/users/reset-password/check`,
      data: { email, resetCode },
      type: 'POST',
      dataType: 'json',
      contentType: 'application/x-www-form-urlencoded',
      headers: {
        'X-XSRF-TOKEN': decodeURIComponent(csrfToken),
        'X-Locale': this.get('intl').get('locale')[0]
      }
    };

    jQuery.ajax(options).then(success, failure);

    function success () {
      thisRoute.render('reset-password');
    }

    function failure () {
      thisRoute.render('errors/four-oh-four');
    }

    // check resetcode
  }
});
