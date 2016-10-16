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

  addSkills: {
    name: null
  },
  addSkillsModalVisible: null,

  editSkills: {
    index: null,
    name: null
  },
  editSkillsModalVisible: null,

  haveSkills: computed('data.skills', function () {
    return Array.isArray(this.get('data.skills'));
  }),

  addWorkExperiences: {
    position: null,
    startDate: null,
    endDate: null,
    employer: null,
    responsibilities: null
  },
  addWorkExperiencesModalVisible: null,

  editWorkExperiences: {
    index: null,
    position: null,
    startDate: null,
    endDate: null,
    employer: null,
    responsibilities: null
  },
  editWorkExperiencesModalVisible: null,

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

  addCertificates: {
    name: null,
    image_url: null
  },
  addCertificatesModalVisible: null,

  editCertificates: {
    index: null,
    name: null,
    image_url: null
  },
  editCertificatesModalVisible: null,

  haveCertificates: computed('data.certificates', function () {
    return Array.isArray(this.get('data.certificates'));
  }),

  _fixCase (s) {
    const firstLetter = s[0].toUpperCase();
    const restOfString = s.slice(1);

    return s && firstLetter + restOfString;
  },

  actions: {
    add (section) {
      let data = this.get(`data.${section}`);
      const sectionName = this._fixCase(section);
      this.set(`data.${section}`, []);

      if (!Array.isArray(data)) {
        data = [];
      }

      const addData = JSON.parse(JSON.stringify(this.get(`add${sectionName}`)));

      data.push(addData);

      this.set(`data.${section}`, data);
      this.set(`add${sectionName}ModalVisible`, false);
    },

    delete (section, index) {
      let data = this.get(`data.${section}`);
      this.set(`data.${section}`, []);

      if (!Array.isArray(data)) {
        data = [];
      }

      data.splice(index, 1);

      if (data.length === 0) {
        data = null;
      }

      this.set(`data.${section}`, data);
    },

    updateEdit (section, index) {
      const data = this.get(`data.${section}`)[index];
      const sectionName = this._fixCase(section);

      this.set(`edit${sectionName}.index`, index);

      for (let key in data) {
        this.set(`edit${sectionName}.${key}`, data[key]);
      }
    },

    edit (section) {
      let data = JSON.parse(JSON.stringify(this.get(`data.${section}`)));
      const sectionName = this._fixCase(section);
      this.set(`data.${section}`, []);

      if (!Array.isArray(data)) {
        data = [];
      }
      
      const editData = JSON.parse(JSON.stringify(this.get(`edit${sectionName}`)));

      for (let key in data[editData.index]) {
        data[editData.index][key] = editData[key];
      }

      this.set(`data.${section}`, data);
      this.set(`edit${sectionName}ModalVisible`, false);
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
