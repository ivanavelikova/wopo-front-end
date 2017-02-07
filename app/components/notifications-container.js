import Ember from 'ember';

const {
  computed,
  inject: {
    service
  }
} = Ember;

export default Ember.Component.extend({
  store: service(),

  notifications: null,

  sortedNotifications: computed.sort('notifications', function (a, b) {
    if (parseInt(a.get('id')) > parseInt(b.get('id'))) {
      return -1;
    }

    return 1;
  }),

  didInsertElement () {
    this.get('store')
      .findAll('notification')
      .then(notifications => {
        this.set('notifications', notifications);
      });
  }
});
