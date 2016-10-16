import Ember from 'ember';
import Validations from '../validations/second-step';

const {
  computed,
  inject: { service }
} = Ember;

export default Ember.Component.extend(Validations, {
  intl: service(),

  alert: {
    type: null,
    content: null
  },

  aboutNotNull: computed('data.about', function () {
    return this.get('data.about') !== null;
  }),

  showAlert: Ember.computed('alert.{type,content}', function() {
    if (this.get('alert.type') !== null && this.get('alert.content') !== null) {
      $('html, body').animate({ scrollTop: 0 });
      return true;
    }

    return false;
  }),

  addSkill: {
    name: null
  },
  addSkillModalVisible: null,

  editSkill: {
    index: null,
    name: null
  },
  editSkillModalVisible: null,

  haveSkills: computed('data.skills', function () {
    return Array.isArray(this.get('data.skills'));
  }),

  addWorkExperience: {
    position: null,
    startDate: null,
    endDate: null,
    employer: null,
    responsibilities: null
  },
  addWorkExperienceModalVisible: null,

  editWorkExperience: {
    index: null,
    position: null,
    startDate: null,
    endDate: null,
    employer: null,
    responsibilities: null
  },
  editWorkExperienceModalVisible: null,

  haveWorkExperiences: computed('data.workExperiences', function () {
    return Array.isArray(this.get('data.workExperiences'));
  }),

  addEducation: {
    organisation: null,
    startDate: null,
    endDate: null
  },
  addEducationModalVisible: null,

  editEducation: {
    index: null,
    organisation: null,
    startDate: null,
    endDate: null
  },
  editEducationModalVisible: null,

  haveEducation: computed('data.education', function () {
    return Array.isArray(this.get('data.education'));
  }),

  actions: {
    addSkill () {
      let skills = this.get('data.skills');
      this.set('data.skills', []);

      if (!Array.isArray(skills)) {
        skills = [];
      }

      const addSkill = JSON.parse(JSON.stringify(this.get('addSkill')));

      skills.push(addSkill);

      this.set('data.skills', skills);
      this.set('addSkillModalVisible', false);
    },

    deleteSkill (index) {
      let skills = this.get('data.skills');
      this.set('data.skills', []);

      if (!Array.isArray(skills)) {
        skills = [];
      }

      skills.splice(index, 1);

      if (skills.length === 0) {
        skills = null;
      }

      this.set('data.skills', skills);
    },

    updateEditSkill (index) {
      const skill = this.get('data.skills')[index];

      this.set('editSkill.index', index);

      for (let key in skill) {
        this.set(`editSkill.${key}`, skill[key]);
      }
    },

    editSkill () {
      let skills = JSON.parse(JSON.stringify(this.get('data.skills')));
      this.set('data.skills', []);

      if (!Array.isArray(skills)) {
        skills = [];
      }
      
      const editSkill = JSON.parse(JSON.stringify(this.get('editSkill')));

      for (let key in skills[editSkill.index]) {
        skills[editSkill.index][key] = editSkill[key];
      }

      this.set('data.skills', skills);
      this.set('editSkillModalVisible', false);
    },

    addWorkExperience () {
      let workExperiences = this.get('data.workExperiences');
      this.set('data.workExperiences', []);

      if (!Array.isArray(workExperiences)) {
        workExperiences = [];
      }

      const addWorkExperience = JSON.parse(JSON.stringify(this.get('addWorkExperience')));

      workExperiences.push(addWorkExperience);

      this.set('data.workExperiences', workExperiences);
      this.set('addWorkExperienceModalVisible', false);
    },

    deleteWorkExperience (index) {
      let workExperiences = this.get('data.workExperiences');
      this.set('data.workExperiences', []);

      if (!Array.isArray(workExperiences)) {
        workExperiences = [];
      }

      workExperiences.splice(index, 1);

      if (workExperiences.length === 0) {
        workExperiences = null;
      }

      this.set('data.workExperiences', workExperiences);
    },

    updateEditWorkExperience (index) {
      const workExperience = this.get('data.workExperiences')[index];

      this.set('editWorkExperience.index', index);

      for (let key in workExperience) {
        this.set(`editWorkExperience.${key}`, workExperience[key]);
      }
    },

    editWorkExperience () {
      let workExperiences = JSON.parse(JSON.stringify(this.get('data.workExperiences')));
      this.set('data.workExperiences', []);

      if (!Array.isArray(workExperiences)) {
        workExperiences = [];
      }
      
      const editWorkExperience = JSON.parse(JSON.stringify(this.get('editWorkExperience')));

      for (let key in workExperiences[editWorkExperience.index]) {
        workExperiences[editWorkExperience.index][key] = editWorkExperience[key];
      }

      this.set('data.workExperiences', workExperiences);
      this.set('editWorkExperienceModalVisible', false);
    },

    addEducation () {
      let education = this.get('data.education');
      this.set('data.education', []);

      if (!Array.isArray(education)) {
        education = [];
      }

      const addEducation = JSON.parse(JSON.stringify(this.get('addEducation')));

      education.push(addEducation);

      this.set('data.education', education);
      this.set('addEducationModalVisible', false);
    },

    deleteEducation (index) {
      let education = this.get('data.education');
      this.set('data.education', []);

      if (!Array.isArray(education)) {
        education = [];
      }

      education.splice(index, 1);

      if (education.length === 0) {
        education = null;
      }

      this.set('data.education', education);
    },

    updateEditEducation (index) {
      const education = this.get('data.education')[index];

      this.set('editEducation.index', index);

      for (let key in education) {
        this.set(`editEducation.${key}`, education[key]);
      }
    },

    editEducation () {
      let education = JSON.parse(JSON.stringify(this.get('data.education')));
      this.set('data.education', []);

      if (!Array.isArray(education)) {
        education = [];
      }
      
      const editEducation = JSON.parse(JSON.stringify(this.get('editEducation')));

      for (let key in education[editEducation.index]) {
        education[editEducation.index][key] = editEducation[key];
      }

      this.set('data.education', education);
      this.set('editEducationModalVisible', false);
    },

    next () {
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
      this.sendAction('nextAction');
    },

    back () {
      this.sendAction('backAction');
    }
  }
});
