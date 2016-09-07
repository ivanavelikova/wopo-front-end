import Ember from 'ember';

export default Ember.Component.extend({
  intl: Ember.inject.service(),

  content: { isContent: true },
  bottom: { isBottom: true },

  disableForm: false,
  alert: {
    type: null,
    content: null
  },

  showAlert: Ember.computed('alert.{type,content}', function() {
    if (this.get('alert.type') !== null && this.get('alert.content') !== null) {
      $('html, body').animate({ scrollTop: 0 });
      return true;
    }

    return false;
  }),

  actions: {
    submitForm () {
      const intl = this.get('intl');

      // ------
      // Validation fail
      // ------

      if (!this.get('model.validations.isValid')) {
        this.set('alert', {
          type: 'info',
          content: intl.t('errors.fill')
        });
        return;
      }

      // ------
      // Validation success
      // ------

      this.set('disableForm', true);
      this.set('alert', { type: null, content: null });

      this.sendAction('formAction');
    }
  }
});
