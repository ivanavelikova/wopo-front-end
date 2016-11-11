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

  addSkills: {
    name: null,
    familiarity: 0
  },
  addSkillsModalVisible: null,
  addSkillsAlert: {
    type: null,
    content: null
  },

  editSkills: {
    id: null,
    name: null,
    familiarity: 0
  },
  editSkillsModalVisible: null,
  editSkillsAlert: {
    type: null,
    content: null
  },

  skills: computed.sort('skillsData', function (a, b) {
    if (parseInt(a.id) > parseInt(b.id)) {
      return -1;
    }

    return 1;
  }),

  haveSkills: computed('skills', function () {
    const skills = this.get('skills');

    return Array.isArray(skills) && skills.length > 0;
  }),

  actions: {
    add () {
      const data = this.get('addSkills');

      this
        .get('store')
        .createRecord('skill', {
          name: data.name,
          familiarity: data.familiarity
        })
        .save()
        .then(() => {
          setTimeout(() => {
            this.set('addSkillsModalVisible', false);
          }, 500);
        })
        .catch(reason => {
          let alertContent = this.get('intl').t('errors.serverFail');

          if (reason.errors[0].detail) {
            alertContent = reason.errors[0].detail;
          }

          this.set('addSkillsAlert', {
            type: 'danger',
            content: alertContent
          });
        });
    },

    delete (skill) {
      skill.destroyRecord();
    },

    updateEdit (skill) {
      this.set('editSkills.id', skill.get('id'));
      this.set('editSkills.name', skill.get('name'));
      this.set('editSkills.familiarity', skill.get('familiarity'));
    },

    edit () {
      const editedSkill = this.get('editSkills');

      const skill = this.get('store').peekRecord('skill', editedSkill.id);
      skill.set('name', editedSkill.name);
      skill.set('familiarity', editedSkill.familiarity);

      skill
        .save()
        .then(() => {
          this.set('editSkillsModalVisible', false);

          this.set('editSkills.id', null);
          this.set('editSkills.name', null);
          this.set('editSkills.familiarity', null);
        })
        .catch(reason => {
          let alertContent = this.get('intl').t('errors.serverFail');

          if (reason.errors[0].detail) {
            alertContent = reason.errors[0].detail;
          }

          this.set('editSkillsAlert', {
            type: 'danger',
            content: alertContent
          });
        });
    }
  }
});
