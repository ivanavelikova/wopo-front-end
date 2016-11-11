import Ember from 'ember';
import moment from 'moment';

const {
  computed,
  inject: {
    service
  }
} = Ember;

export default Ember.Component.extend({
  intl: service(),
  store: service(),

  addEducations: {
    organization: null,
    startDate: null,
    endDate: null
  },
  addEducationsModalVisible: null,
  addEducationsAlert: {
    type: null,
    content: null
  },

  editEducations: {
    id: null,
    organization: null,
    startDate: null,
    endDate: null
  },
  editEducationsModalVisible: null,
  editEducationsAlert: {
    type: null,
    content: null
  },

  educations: computed.sort('educationsData', function (a, b) {
    if (parseInt(a.id) > parseInt(b.id)) {
      return -1;
    }

    return 1;
  }),

  haveEducations: computed('educations', function () {
    const educations = this.get('educations');

    return Array.isArray(educations) && educations.length > 0;
  }),

  actions: {
    add () {
      const data = this.get('addEducations');

      this
        .get('store')
        .createRecord('education', {
          organization: data.organization,
          start_date: data.startDate,
          end_date: data.endDate
        })
        .save()
        .then(() => {
          setTimeout(() => {
            this.set('addEducationsModalVisible', false);
          }, 500);
        })
        .catch(reason => {
          let alertContent = this.get('intl').t('errors.serverFail');

          if (reason.errors[0].detail) {
            alertContent = reason.errors[0].detail;
          }

          this.set('addEducationsAlert', {
            type: 'danger',
            content: alertContent
          });
        });
    },

    delete (education) {
      education.destroyRecord();
    },

    updateEdit (education) {
      const startDate = moment(education.get('start_date')).format('MM/DD/YYYY');
      let endDate = education.get('end_date');

      if (endDate) {
        endDate = moment(endDate).format('MM/DD/YYYY');
      }

      this.set('editEducations.id', education.get('id'));
      this.set('editEducations.organization', education.get('organization'));
      this.set('editEducations.startDate', startDate);
      this.set('editEducations.endDate', endDate);
    },

    edit () {
      const editedEducation = this.get('editEducations');

      const education = this
        .get('store')
        .peekRecord('education', editedEducation.id);
      education.set('organization', editedEducation.organization);
      education.set('start_date', editedEducation.startDate);
      education.set('end_date', editedEducation.endDate);

      education
        .save()
        .then(() => {
          this.set('editEducationsModalVisible', false);

          this.set('editEducations.id', null);
          this.set('editEducations.organization', null);
          this.set('editEducations.startDate', null);
          this.set('editEducations.endDate', null);
        })
        .catch(reason => {
          let alertContent = this.get('intl').t('errors.serverFail');

          if (reason.errors[0].detail) {
            alertContent = reason.errors[0].detail;
          }

          this.set('editEducationsAlert', {
            type: 'danger',
            content: alertContent
          });
        });
    }
  }
});
