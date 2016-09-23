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
  addModalVisible: null,

  editSkill: {
    index: null,
    name: null
  },
  editModalVisible: null,

  haveSkills: computed('data.skills', function () {
    return Array.isArray(this.get('data.skills'));
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
      this.set('addModalVisible', false);
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
      this.set('editModalVisible', false);
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
