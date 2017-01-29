import Ember from 'ember';

export default Ember.Controller.extend({
  addThemeModalVisible: false,

  addThemeAlert: {
    type: null,
    content: null
  },
  disableSubmit: false,

  actions: {
    addTheme (data) {
      this
        .get('store')
        .createRecord('theme', {
          uid: data.uid,
          name: data.name,
          description: data.description
        })
        .save()
        .then(() => {
          setTimeout(() => {
            this.set('addThemeModalVisible', false);
            this.send('reloadModel');
          }, 500);
        })
        .catch(reason => {
          let alertContent = this.get('intl').t('errors.serverFail');

          if (reason.errors[0].detail) {
            alertContent = reason.errors[0].detail;
          }

          this.set('disableSubmit', false);

          this.set('addThemeAlert', {
            type: 'danger',
            content: alertContent
          });
        });
    }
  }
});
