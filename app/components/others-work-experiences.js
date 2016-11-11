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

  addWorkExperiences: {
    position: null,
    startDate: null,
    endDate: null,
    employer: null,
    responsibilities: null
  },
  addWorkExperiencesModalVisible: null,
  addWorkExperiencesAlert: {
    type: null,
    content: null
  },

  editWorkExperiences: {
    id: null,
    position: null,
    startDate: null,
    endDate: null,
    employer: null,
    responsibilities: null
  },
  editWorkExperiencesModalVisible: null,
  editWorkExperiencesAlert: {
    type: null,
    content: null
  },

  workExperiences: computed.sort('workExperiencesData', function (a, b) {
    if (parseInt(a.id) > parseInt(b.id)) {
      return -1;
    }

    return 1;
  }),

  haveWorkExperiences: computed('workExperiences', function () {
    const workExperiences = this.get('workExperiences');

    return Array.isArray(workExperiences) && workExperiences.length > 0;
  }),

  actions: {
    add () {
      const data = this.get('addWorkExperiences');

      this
        .get('store')
        .createRecord('work-experience', {
          position: data.position,
          start_date: data.startDate,
          end_date: data.endDate,
          employer: data.employer,
          responsibilities: data.responsibilities
        })
        .save()
        .then(() => {
          setTimeout(() => {
            this.set('addWorkExperiencesModalVisible', false);
          }, 500);
        })
        .catch(reason => {
          let alertContent = this.get('intl').t('errors.serverFail');

          if (reason.errors[0].detail) {
            alertContent = reason.errors[0].detail;
          }

          this.set('addWorkExperiencesAlert', {
            type: 'danger',
            content: alertContent
          });
        });
    },

    delete (workExperience) {
      workExperience.destroyRecord();
    },

    updateEdit (workExperience) {
      this.set('editWorkExperiences.id', workExperience.get('id'));
      this.set('editWorkExperiences.position', workExperience.get('position'));
      this.set('editWorkExperiences.startDate', workExperience.get('start_date'));
      this.set('editWorkExperiences.endDate', workExperience.get('end_date'));
      this.set('editWorkExperiences.employer', workExperience.get('employer'));
      this.set('editWorkExperiences.responsibilities', workExperience.get('responsibilities'));
    },

    edit () {
      const editedWorkExperiencesl = this.get('editWorkExperiences');

      const workExperience = this
        .get('store')
        .peekRecord('work-experience', editedSkill.id);
      workExperience.set('position', editedSkill.position);
      workExperience.set('start_date', editedSkill.startDate);
      workExperience.set('end_date', editedSkill.endDate);
      workExperience.set('employer', editedSkill.employer);
      workExperience.set('responsibilities', editedSkill.responsibilities);

      workExperience
        .save()
        .then(() => {
          this.set('editWorkExperiencesModalVisible', false);

          this.set('editWorkExperiences.id', null);
          this.set('editWorkExperiences.position', null);
          this.set('editWorkExperiences.startDate', null);
          this.set('editWorkExperiences.endDate', null);
          this.set('editWorkExperiences.employer', null);
          this.set('editWorkExperiences.responsibilities', null);
        })
        .catch(reason => {
          let alertContent = this.get('intl').t('errors.serverFail');

          if (reason.errors[0].detail) {
            alertContent = reason.errors[0].detail;
          }

          this.set('editWorkExperiencesAlert', {
            type: 'danger',
            content: alertContent
          });
        });
    }
  }
});
