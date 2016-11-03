import Ember from 'ember';
import Validations from '../validations/third-step';

const {
  computed,
  observer,
  inject: { service }
} = Ember;

export default Ember.Component.extend(Validations, {
  intl: service(),
  session: service(),
  network: service(),
  _routing: service('-routing'),

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

        const portfolioData = {
          portfolio: this.get('session.data.firstSteps')
        };

        const failure = (reason) => {
          let error = reason;

          if (reason.errors && reason.errors[0].detail) {
            error = reason.errors[0].detail;
          }

          this.set('alert', {
            type: 'danger',
            content: error
          });
        };

        this
          .get('network')
          .post('portfolios', portfolioData, true)
          .then(() => {
            this.get('session').set('data.firstSteps', null);
            this.get('_routing').transitionTo('dashboard.index');
          })
          .catch(error => {
            this.set('finishDisabled', false);
            
            if (!error.response) {
              failure(error);
              return;
            }

            error.response.json().then(function(reason) {
              failure(reason);
            });
          });

      }, 1000);
    },

    back () {
      this.sendAction('backAction');
    }
  }
});
