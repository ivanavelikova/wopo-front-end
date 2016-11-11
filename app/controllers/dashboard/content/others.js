import Ember from 'ember';
import Validations from '../../../validations/content-others';

const {
  inject: {
    service
  }
} = Ember;

export default Ember.Controller.extend(Validations, {
  intl: service(),

  null: null,

  aboutAlert: {
    type: null,
    content: null
  },

  showAboutAlert: Ember.computed('aboutAlert.{type,content}', function() {
    if (this.get('aboutAlert.type') !== null && this.get('aboutAlert.content') !== null) {
      $('html, body').animate({
        scrollTop: $('.form-about-section').position().top - 50
      });
      return true;
    }

    return false;
  }),

  actions: {
    submitAbout () {
      if (!this.get('validations.isValid')) {
        this.set('aboutAlert', {
          type: 'info',
          content: this.get('intl').t('errors.fill')
        });
        return;
      }

      this.set('aboutAlert', {
        type: null,
        content: null
      });

      this
        .get('model.portfolio')
        .save()
        .then(() => {
          this.set('aboutAlert', {
            type: 'success',
            content: this.get('intl').t('success.aboutUpdate')
          });
        })
        .catch(reason => {
          let alertContent = this.get('intl').t('errors.serverFail');

          if (reason.errors[0].detail) {
            alertContent = reason.errors[0].detail;
          }

          this.set('aboutAlert', {
            type: 'danger',
            content: alertContent
          });
        });
    }
  }
});
