import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  currentStep: 1,

  firstContent: { isFirstContent: true },
  secondContent: { isSecondContent: true },
  thirdContent: { isThirdContent: true },

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
    firstNext () {
      if (this.get('firstAction')()) {
        this.set('currentStep', 2);
      }
    },

    secondNext () {
      if (this.get('secondAction')()) {
        this.set('currentStep', 3);
      }
    }
  }
});
