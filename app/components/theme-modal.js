import Ember from 'ember';
import Validations from '../validations/theme';

const {
  observer,
  inject: {
    service
  }
} = Ember;

export default Ember.Component.extend(Validations, {
  store: service(),
  intl: service(),
  network: service(),

  alert: {
    type: null,
    content: null
  },

  data: {
    uid: null,
    name: null,
    description: null
  },

  uploading: false,
  secondStep: false,
  disableSubmit: false,

  onModalVisibleChange: observer('modalVisible', function () {
    this.set('data', {
      name: null,
      description: null
    });

    this.set('uploading', false);
    this.set('secondStep', false);
    this.set('disableSubmit', false);

    $('.dropzone').removeClass('hidden-xs-up');
  }),

  showAlert: Ember.computed('alert.{type,content}', function () {
    if (this.get('alert.type') !== null && this.get('alert.content') !== null) {
      $('.modal.addTheme').animate({ scrollTop: 0 });
      return true;
    }

    return false;
  }),

  didInsertElement () {
    const host = this.get('store').adapterFor('application').get('host');
    const headers = this.get('network').headers(null, true);

    new Dropzone('.dropzone', {
      url: `${host}/themes/upload`,
      maxFilesize: 200,
      uploadMultiple: false,
      createImageThumbnails: false,
      paramName: 'theme',
      headers,
      acceptedFiles: '.zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed',
      dictInvalidFileType: this.get('intl').t('errors.fileType'),
      dictFileTooBig: this.get('intl').t('errors.fileTooBig', {
        maxFilesize: '200MiB'
      }),
      dictDefaultMessage: 'Остави файла тука, за да го качиш.',

      addedfile: () => {
        this.set('alert', {
          type: null,
          content: null
        });

        this.set('uploading', true);
        $('.dropzone').addClass('hidden-xs-up');
      },

      success: (file, response) => {
        this.set('uploading', false);

        this.set('data', response);
        this.set('secondStep', true);
      },

      error: (file, message) => {
        this.set('uploading', false);
        $('.dropzone').removeClass('hidden-xs-up');

        const media = $(file.previewElement);

        if (!media) {
          return;
        }

        if (typeof message !== 'string' && message.errors[0].detail) {
          message = message.errors[0].detail;
        }

        this.set('alert', {
          type: 'danger',
          content: message
        });
      }
    });
  },

  actions: {
    submitForm () {
      if (this.get('validations.isInvalid')) {
        this.set('alert', {
          type: 'info',
          content: this.get('intl').t('errors.fill')
        });

        return;
      }

      $(':focus').blur();

      this.set('disableSubmit', true);

      const data = this.get('data');

      this
        .get('store')
        .createRecord('theme', {
          uid: data.uid,
          name: data.name,
          description: data.description
        })
        .save()
        .then(() => {
          setTimeout(() => {
            this.set('modalVisible', false);
            this.sendAction('reloadModel');
          }, 500);
        })
        .catch(reason => {
          let alertContent = this.get('intl').t('errors.serverFail');

          if (reason.errors[0].detail) {
            alertContent = reason.errors[0].detail;
          }

          this.set('disableSubmit', false);

          this.set('alert', {
            type: 'danger',
            content: alertContent
          });
        });
    }
  }
});
