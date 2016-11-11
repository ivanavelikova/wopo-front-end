import Ember from 'ember';

const {
  computed,
  inject: {
    service
  }
} = Ember;

export default Ember.Component.extend({
  intl: service(),
  store: service(),

  addCertificates: {
    name: null,
    image_url: null
  },
  addCertificatesModalVisible: null,
  addCertificatesAlert: {
    type: null,
    content: null
  },

  editCertificates: {
    id: null,
    name: null,
    image_url: null
  },
  editCertificatesModalVisible: null,
  editCertificatesAlert: {
    type: null,
    content: null
  },

  certificates: computed.sort('certificatesData', function (a, b) {
    if (parseInt(a.id) > parseInt(b.id)) {
      return -1;
    }

    return 1;
  }),

  haveCertificates: computed('certificates', function () {
    const certificates = this.get('certificates');

    return Array.isArray(certificates) && certificates.length > 0;
  }),

  actions: {
    add () {
      const data = this.get('addCertificates');

      this
        .get('store')
        .createRecord('certificate', {
          name: data.name,
          cover: data.image_url
        })
        .save()
        .then(() => {
          setTimeout(() => {
            this.set('addCertificatesModalVisible', false);
          }, 500);
        })
        .catch(reason => {
          let alertContent = this.get('intl').t('errors.serverFail');

          if (reason.errors[0].detail) {
            alertContent = reason.errors[0].detail;
          }

          this.set('addCertificatesAlert', {
            type: 'danger',
            content: alertContent
          });
        });
    },

    delete (certificate) {
      certificate.destroyRecord();
    },

    updateEdit (certificate) {
      this.set('editCertificates.id', certificate.get('id'));
      this.set('editCertificates.name', certificate.get('name'));
      this.set('editCertificates.image_url', certificate.get('cover'));
    },

    edit () {
      const editedCertificate = this.get('editCertificates');

      const certificate = this
        .get('store')
        .peekRecord('certificate', editedCertificate.id);
      certificate.set('name', editedCertificate.name);
      certificate.set('cover', editedCertificate.image_url);

      certificate
        .save()
        .then(() => {
          this.set('editCertificatesModalVisible', false);

          this.set('editCertificates.id', null);
          this.set('editCertificates.name', null);
          this.set('editCertificates.image_url', null);
        })
        .catch(reason => {
          let alertContent = this.get('intl').t('errors.serverFail');

          if (reason.errors[0].detail) {
            alertContent = reason.errors[0].detail;
          }

          this.set('editCertificatesAlert', {
            type: 'danger',
            content: alertContent
          });
        });
    }
  }
});
