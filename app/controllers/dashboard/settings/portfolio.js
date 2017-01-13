import Ember from 'ember';
import Validations from '../../../validations/portfolio-settings';

const {
  computed,
  inject: {
    service
  }
} = Ember;

export default Ember.Controller.extend(Validations, {
  intl: service(),
  session: service(),
  store: service(),
  _routing: service('-routing'),

  null: null,

  alert: {
    type: null,
    content: null
  },

  showAlert: computed('alert.{type,content}', function() {
    if (this.get('alert.type') !== null && this.get('alert.content') !== null) {
      $('html, body').animate({ scrollTop: 0 });
      return true;
    }

    return false;
  }),

  actions: {
    submitForm () {
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

      this
        .get('model')
        .save()
        .then(() => {
          this.set('alert', {
            type: 'success',
            content: this.get('intl').t('success.portfolioUpdate')
          });
        })
        .catch(reason => {
          let alertContent = this.get('intl').t('errors.serverFail');

          if (reason.errors[0].detail) {
            alertContent = reason.errors[0].detail;
          }

          this.set('alert', {
            type: 'danger',
            content: alertContent
          });
        });
    },

    delete () {
      const deletePortfolioModal = $('#deletePortfolio');

      this
        .get('model')
        .destroyRecord()
        .then(() => {
          deletePortfolioModal.modal('hide');

          this.get('session').set('data.firstSteps', {
            currentStep: 1
          });

          this.get('store').unloadAll();

          this.get('_routing').transitionTo('welcome');
        })
        .catch(() => {
          deletePortfolioModal.modal('hide');

          this.set('alert', {
            type: 'danger',
            content: this.get('intl').t('errors.serverFail')
          });
        });
    }
  }
});
