import Ember from 'ember';
import Validations from '../validations/third-step';

const {
  computed,
  observer,
  inject: { service }
} = Ember;

export default Ember.Component.extend(Validations, {
  intl: service(),

  alert: {
    type: null,
    content: null
  },

  finishDisabled: true,
  hostingIsInvalid: true,

  onHostingIsInvalidChange: observer('hostingIsInvalid', function () {
    this.set('finishDisabled', this.get('hostingIsInvalid'));
  }),

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
      this.set('finishDisabled', true);

      setTimeout(() => {
        const jobOffers = this.get('validations.attrs.data.jobOffers.isInvalid');
        const selectedHosting = this.get('validations.attrs.data.selectedHosting.isInvalid');

        if (jobOffers || selectedHosting || this.get('hostingIsInvalid')) {
          this.set('finishDisabled', false);

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
      }, 1000);
    },

    back () {
      this.sendAction('backAction');
    }
  }
});
