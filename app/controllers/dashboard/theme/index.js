import Ember from 'ember';

const {
  computed,
  inject: {
    service
  }
} = Ember;

export default Ember.Controller.extend({
  store: service(),

  themes: computed.sort('model', function (a, b) {
    if (parseInt(a.id) > parseInt(b.id)) {
      return -1;
    }

    return 1;
  }),

  actions: {
    select (theme) {
      if (theme.get('active') === true) {
        return;
      }

      theme.set('active', true);

      theme
        .save()
        .then(() => {
          this.send('reloadModel');
        })
        .catch(console.error);
    },

    delete (theme) {
      theme.destroyRecord();
      this.send('reloadModel');
    },
  }
});
