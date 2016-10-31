import Ember from 'ember';

const {
  computed,
  inject: {
    service
  }
} = Ember;

export default Ember.Route.extend({
  fastboot: service(),
  isFastboot: computed.reads('fastboot.isFastBoot'),

  activate: function() {
    this._super();

    if (!this.get('isFastboot')) {
      window.scrollTo(0, 0);
    }
  }
});
