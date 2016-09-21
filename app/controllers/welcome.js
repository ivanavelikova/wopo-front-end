import Ember from 'ember';

const {
  computed,
  observer,
  inject: { service }
} = Ember;

export default Ember.Controller.extend({
  intl: service(),
  session: service(),

  data: Ember.Object.create({
    currentStep: 0,
    themeId: null,
    about: null,
    skills: null
  }),

  init () {
    this._super(...arguments);

    // Set data
    const storage = this.get('session.data.firstSteps');
    const data = this.get('data');
    const dataKeys = Object.keys(data);
    data.setProperties(storage);

    dataKeys.forEach(key => {
      data.addObserver(key, this, 'updateStorage');
    });

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
    if (!this.get('data.currentStep')) {
      return true;
    }
  }),

  isFirst: computed('data.currentStep', function () {
    if (this.get('data.currentStep') === 1) {
      return true;
    }
  }),

  isSecond: computed('data.currentStep', function () {
    if (this.get('data.currentStep') === 2) {
      return true;
    }
  }),

  isThird: computed('data.currentStep', function () {
    if (this.get('data.currentStep') === 3) {
      return true;
    }
  }),

  actions: {
    start () {
      this.set('data.currentStep', 1);
    },

    firstNext () {
      this.set('data.currentStep', 2);
    },

    secondNext () {
      this.set('data.currentStep', 3);
    },

    secondBack () {
      this.set('data.currentStep', 1);
    },

    thirdBack () {
      this.set('data.currentStep', 2);
    }
  }
});
