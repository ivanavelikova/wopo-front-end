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

  haveWorkExperience: computed('data.workExperience', function () {
    return Array.isArray(this.get('data.workExperience'));
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
      let workExperience = this.get('data.workExperience');
      this.set('data.workExperience', []);

      if (!Array.isArray(workExperience)) {
        workExperience = [];
      }

      const addWorkExperience = JSON.parse(JSON.stringify(this.get('addWorkExperience')));

      workExperience.push(addWorkExperience);

      this.set('data.workExperience', workExperience);
      this.set('addWorkExperienceModalVisible', false);
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
