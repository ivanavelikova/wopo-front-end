import Ember from 'ember';
import Validations from '../../../validations/profile-settings';

const {
  computed,
  inject: {
    service
  }
} = Ember;

export default Ember.Controller.extend(Validations, {
  intl: service(),
  session: service(),
  network: service(),

  old_password: null,
  new_password: null,
  null: null,

  countries: [
    { id: 'en', text: 'Англия' },
    { id: 'bg', text: 'България' }
  ],

  languages: [
    { id: 'en', text: 'Английски' },
    { id: 'bg', text: 'Български' }
  ],

  generalAlert: {
    type: null,
    content: null
  },

  showGeneralAlert: computed('generalAlert.{type,content}', function() {
    if (this.get('generalAlert.type') !== null && this.get('generalAlert.content') !== null) {
      $('body, html').animate({
        scrollTop: $('.form-general-section').position().top - 50
      });
      return true;
    }

    return false;
  }),

  passwordAlert: {
    type: null,
    content: null
  },

  showPasswordAlert: computed('passwordAlert.{type,content}', function() {
    if (this.get('passwordAlert.type') !== null && this.get('passwordAlert.content') !== null) {
      $('body, html').animate({
        scrollTop: $('.form-password-section').position().top - 50
      });
      return true;
    }

    return false;
  }),

  deleteAlert: {
    type: null,
    content: null
  },

  showDeleteAlert: computed('deleteAlert.{type,content}', function() {
    if (this.get('deleteAlert.type') !== null && this.get('deleteAlert.content') !== null) {
      $('body, html').animate({
        scrollTop: $('.form-delete-section').position().top - 50
      });
      return true;
    }

    return false;
  }),

  actions: {
    submitGeneral () {
      const validations = this.get('validations.attrs.model');
      const profilePic = validations.get('profile_pic.isInvalid');
      const name = validations.get('name.isInvalid');
      const email = validations.get('email.isInvalid');

      if ((this.get('model.profile_pic') !== null && profilePic) || name || email) {
        this.set('generalAlert', {
          type: 'info',
          content: this.get('intl').t('errors.fill')
        });
        return;
      }

      this.set('generalAlert', {
        type: null,
        content: null
      });

      this
        .get('model')
        .save()
        .then(() => {
          this.set('generalAlert', {
            type: 'success',
            content: this.get('intl').t('success.profileUpdate')
          });
        })
        .catch(reason => {
          let alertContent = this.get('intl').t('errors.serverFail');

          if (reason.errors[0].detail) {
            alertContent = reason.errors[0].detail;
          }

          this.set('generalAlert', {
            type: 'danger',
            content: alertContent
          });
        });
    },

    submitPassword () {
      const validations = this.get('validations.attrs');
      const oldPasswordValidation = validations.get('old_password.isInvalid');
      const newPasswordValidation = validations.get('new_password.isInvalid');

      if (oldPasswordValidation || newPasswordValidation) {
        this.set('passwordAlert', {
          type: 'info',
          content: this.get('intl').t('errors.fill')
        });
        return;
      }

      this.set('passwordAlert', {
        type: null,
        content: null
      });

      const data = {
        oldPassword: this.get('old_password'),
        newPassword: this.get('new_password')
      };

      const failure = reason => {
        let alertContent = this.get('intl').t('errors.serverFail');

        if (reason.errors[0].detail) {
          alertContent = reason.errors[0].detail;
        }

        this.set('passwordAlert', {
          type: 'danger',
          content: alertContent
        });
      };

      this
        .get('network')
        .put('profiles/password', data, true)
        .then(() => {
          this.set('passwordAlert', {
            type: 'success',
            content: this.get('intl').t('success.passwordUpdate')
          });
        })
        .catch(error => {
          if (!error.response) {
            failure(error);
            return;
          }

          error.response.json().then(function(reason) {
            failure(reason);
          });
        });
    },

    delete () {
      const deleteProfileModal = $('#deleteProfile');

      this
        .get('model')
        .destroyRecord()
        .then(() => {
          deleteProfileModal.modal('hide');

          this.get('session').invalidate();
        })
        .catch(() => {
          deleteProfileModal.modal('hide');

          this.set('deleteAlert', {
            type: 'danger',
            content: this.get('intl').t('errors.serverFail')
          });
        });
    },

    openMediaManager () {
      let width = parseInt((window.screen.width * 80) / 100, 10);
      let height = parseInt((window.screen.height * 70) / 100, 10);

      if (width < 640) {
        width = 640;
      }

      if (height < 420) {
        height = 420;
      }

      const top = parseInt((window.screen.height - height) / 2, 10);
      const left = parseInt((window.screen.width - width) / 2, 10);

      const options = `location=no,menubar=no,toolbar=no,dependent=yes,minimizable=no,modal=yes,alwaysRaised=yes,resizable=yes,scrollbars=yes,width=${width},height=${height},top=${top},left=${left}`;
      window.open('/media-manager', null, options);

      $(window).on("message onmessage", (e) => {
        const data = e.originalEvent.data;
        this.set('model.profile_pic', data.media);
      });
    }
  }
});
