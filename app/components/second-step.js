import Ember from 'ember';
import Validations from '../validations/second-step';

export default Ember.Component.extend(Validations, {
  addSkill: {
    name: null
  },

  editSkill: {
    index: null,
    name: null
  },

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

      for (let key in addSkill) {
        this.set(`addSkill.${key}`, null);
      }
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
    },

    next () {
      if (!this.get('validations.isValid')) {
        alert('noooo');
        return;
      }
      
      this.sendAction('nextAction');
    },

    back () {
      this.sendAction('backAction');
    }
  }
});
