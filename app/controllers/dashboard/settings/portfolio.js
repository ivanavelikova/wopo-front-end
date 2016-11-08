import Ember from 'ember';
import Validations from '../../../validations/portfolio-settings';

const {
  computed,
  $: jQuery,
  inject: {
    service
  }
} = Ember;

export default Ember.Controller.extend(Validations, {
  intl: service(),

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

          this.set('addArticlesAlert', {
            type: 'danger',
            content: alertContent
          });

          jQuery('.modal.addArticles').animate({ scrollTop: 0 });
        });
    }
  }
});
