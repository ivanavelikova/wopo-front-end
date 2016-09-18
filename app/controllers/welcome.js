import Ember from 'ember';

const {
  computed,
  observer,
  inject: { service }
} = Ember;

export default Ember.Controller.extend({
  intl: service(),
  storage: service(),

  currentStep: 0,

  init () {
    this._super(...arguments);

    this.set('pageTitle', this.get('intl').t('welcome'));
  },

  changeTitle: observer('currentStep', function () {
    this.set('storage.currentStep', this.get('currentStep'));
    if (this.get('currentStep') !== 0) {
      this.set('pageTitle', this.get('intl').t('firstSteps'));
    }
  }),

  showWelcome: computed('currentStep', function () {
    if (this.get('currentStep') === 0) {
      return true;
    }
  }),

  isFirst: computed('currentStep', function () {
    if (this.get('currentStep') === 1) {
      return true;
    }
  }),

  isSecond: computed('currentStep', function () {
    if (this.get('currentStep') === 2) {
      return true;
    }
  }),

  isThird: computed('currentStep', function () {
    if (this.get('currentStep') === 3) {
      return true;
    }
  }),

  actions: {
    start () {
      this.set('currentStep', 1);
    },

    firstNext () {
      this.set('currentStep', 2);
    },

    secondNext () {
      this.set('currentStep', 3);
    },

    secondBack () {
      this.set('currentStep', 1);
    },

    thirdBack () {
      this.set('currentStep', 2);
    }
  }
});
