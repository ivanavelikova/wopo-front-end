import Ember from 'ember';

const {
  inject: {
    service
  }
} = Ember;

export default Ember.Component.extend({
  store: service(),
  intl: service(),
  network: service(),

  alert: {
    type: null,
    content: null
  },

  uploading: false,

  showAlert: Ember.computed('alert.{type,content}', function () {
    if (this.get('alert.type') !== null && this.get('alert.content') !== null) {
      $(`.modal.${this.get('modalTarget')}`).animate({ scrollTop: 0 });
      return true;
    }

    return false;
  }),

  didInsertElement () {
    const host = this.get('store').adapterFor('application').get('host');
    const headers = this.get('network').headers(null, true);

    new Dropzone('.dropzone', {
      url: `${host}/themes`,
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

      success: () => {
        this.set('uploading', false);
        $('.dropzone').removeClass('hidden-xs-up');

        this.set('modalVisible', false);
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
  }
});
