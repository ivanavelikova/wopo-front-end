import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  cookies: service(),
  store: service(),
  intl: service(),
  session: service(),

  didInsertElement () {
    const host = this.get('store').adapterFor('application').get('host');
    const headers = this._headers();
    const container = $('.media-container');

    Dropzone.autoDiscover = false;

    container.dropzone({
      url: `${host}/media-manager`,
      maxFilesize: 2,
      uploadMultiple: false,
      paramName: 'media',
      headers,
      clickable: '.btn-upload',
      acceptedFiles: 'image/jpg, image/jpeg, image/png',
      dictInvalidFileType: this.get('intl').t('errors.fileType'),
      dictFileTooBig: this.get('intl').t('errors.fileTooBig', {
        maxFilesize: '2MiB'
      }),
      dictResponseError: 'eror',
      previewTemplate: `
        <div class="media">
          <div class="card card-media">
            <div class="card-img-container">
              <img class="card-img" data-dz-thumbnail alt="">
            </div>
            <div class="card-img-overlay">
              <div class="success-mark"><span>✔</span></div>
              <div class="error-mark"><span>✘</span></div>
              <div class="error-message"></div>
              <progress class="progress" value="0" max="100"></progress>
              <button type="button" class="delete" aria-label="Delete">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        </div>
      `,
      error: (file, message) => {
        if (!file.previewElement) {
          return;
        }

        if (typeof message !== 'string' && message.errors[0].detail) {
          message = message.errors[0].detail;
        }
        
        $(file.previewElement).addClass('dz-error');
        $(file.previewElement).removeClass('dz-processing');
        $(file.previewElement).find('.error-message').html(message);
      },

      uploadprogress: (file, progress) => {
        $(file.previewElement).find('.progress').val(progress);
      }
    });
  },

  _headers () {
    const csrf = decodeURIComponent(this.get('cookies').read('XSRF-TOKEN'));
    const token = this.get('session.data.authenticated.token');

    let headers = {
      'X-XSRF-TOKEN': csrf,
      'Authorization': `Bearer ${token}`
    };

    if (this.get('intl').get('locale')) {
      headers['X-Locale'] = this.get('intl').get('locale')[0];
    }

    return headers;
  }
});
