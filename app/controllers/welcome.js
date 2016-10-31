import Ember from 'ember';

const {
  computed,
  observer,
  inject: { service }
} = Ember;

export default Ember.Controller.extend({
  intl: service(),
  session: service(),
  fastboot: service(),
  isFastboot: computed.reads('fastboot.isFastBoot'),

  data: Ember.Object.create({
    currentStep: null,
    themeId: null,
    about: null,
    skills: null,
    workExperiences: null,
    education: null,
    certificates: null,
    projects: null,
    jobOffers: true,
    selectedHosting: 'wopo',
    wopoHosting: {
      domain: {
        type: 'subdomain',
        subdomain: null,
        domain: null
      }
    },
    githubPagesHosting: {
      // TODO
    },
    ftpHosting: {
      // TODO
    }
  }),

  init () {
    this._super(...arguments);

    // Set data
    if (!this.get('isFastboot')) {
      const storage = this.get('session.data.firstSteps');
      const data = this.get('data');
      const dataKeys = Object.keys(data);
      data.setProperties(storage);

      dataKeys.forEach(key => {
        data.addObserver(key, this, 'updateStorage');
      });

      if (data.get('currentStep') === null) {
        data.set('currentStep', 0);
      }
    }

    // Set pageTitle
    if (this.get('data.currentStep') && this.get('data.currentStep') > 0) {
      this.set('pageTitle', this.get('intl').t('firstSteps'));
      return;
    }

    this.set('pageTitle', this.get('intl').t('welcome'));
  },

  updateStorage () {
    const data = JSON.stringify(this.get('data'));
    let storage = this.get('session.data.firstSteps');

    if (data === JSON.stringify(storage)) {
      return;
    }

    if (!storage) {
      storage = {};
    }

    storage = Object.assign(storage, JSON.parse(data));
    this.get('session').set('data.firstSteps', storage);
  },

  changeTitle: observer('data.currentStep', function () {
    if (this.get('data.currentStep') && this.get('data.currentStep') > 0) {
      this.set('pageTitle', this.get('intl').t('firstSteps'));
    }
  }),

  showWelcome: computed('data.currentStep', function () {
    return this.get('data.currentStep') === 0;
  }),

  showSteps: computed('data.currentStep', function () {
    const currentStep = this.get('data.currentStep');
    return currentStep === 1 || currentStep === 2 || currentStep === 3;
  }),

  isFirst: computed('data.currentStep', function () {
    return this.get('data.currentStep') === 1;
  }),

  isSecond: computed('data.currentStep', function () {
    return this.get('data.currentStep') === 2;
  }),

  isThird: computed('data.currentStep', function () {
    return this.get('data.currentStep') === 3;
  }),

  actions: {
    start () {
      this.set('data.currentStep', 1);
      window.scrollTo(0, 0);
    },

    firstNext () {
      this.set('data.currentStep', 2);
      window.scrollTo(0, 0);
    },

    secondNext () {
      this.set('data.currentStep', 3);
      window.scrollTo(0, 0);
    },

    secondBack () {
      this.set('data.currentStep', 1);
      window.scrollTo(0, 0);
    },

    thirdBack () {
      this.set('data.currentStep', 2);
      window.scrollTo(0, 0);
    }
  }
});
