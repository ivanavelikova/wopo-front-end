import Ember from 'ember';
import FirstStepsData from '../mixins/first-steps-data';

const {
  computed,
  observer,
  inject: { service }
} = Ember;

export default Ember.Controller.extend(FirstStepsData, {
  intl: service(),
  storage: service(),

  data: Ember.Object.create({
    currentStep: 0
  }),

  init () {
    this._super(...arguments);

    if (!this.get('storage.firstSteps')) {
      this.set('storage.firstSteps', {});
    }

    if (this.get('data.currentStep') && this.get('data.currentStep') > 0) {
      this.set('pageTitle', this.get('intl').t('firstSteps'));
      return;
    }

    this.set('pageTitle', this.get('intl').t('welcome'));
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
