import Ember from 'ember';
import Validations from '../validations/third-step';

const {
  computed,
  inject: { service }
} = Ember;

export default Ember.Component.extend(Validations, {
  intl: service(),

  alert: {
    type: null,
    content: null
  },

  jobOffersNotNull: computed('data.jobOffers', function () {
    return this.get('data.jobOffers') !== null;
  }),

  showAlert: Ember.computed('alert.{type,content}', function() {
    if (this.get('alert.type') !== null && this.get('alert.content') !== null) {
      $('html, body').animate({ scrollTop: 0 });
      return true;
    }

    return false;
  }),

  actions: {
    finish () {
      if (!this.get('validations.isValid')) {
        this.set('alert', {
          type: 'info',
          content: this.get('intl').t('errors.fill')
        });
        return;
      }

      this.set('alert', {
        type: null,
        content: null
      });

      alert('Donnnneee!!!');
    },

    back () {
      this.sendAction('backAction');
    }
  }
});
