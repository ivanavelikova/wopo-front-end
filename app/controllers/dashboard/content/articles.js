import Ember from 'ember';

const {
  $: jQuery,
  inject: {
    service
  }
} = Ember;

export default Ember.Controller.extend({
  store: service(),
  intl: service(),

  addArticles: {
    title: null,
    image_url: null,
    content: null,
    tags: null
  },
  addArticlesModalVisible: null,
  addArticlesAlert: {
    type: null,
    content: null
  },

  editArticles: {
    index: null,
    title: null,
    image_url: null,
    content: null,
    tags: null
  },
  editArticlesModalVisible: null,

  actions: {
    add () {
      const data = this.get('addArticles');

      this
        .get('store')
        .createRecord('article', {
          title: data.title,
          cover: data.image_url,
          content: data.content,
          tags: data.tags
        })
        .save()
        .then(() => {
          this.set('addArticlesModalVisible', false);
        })
        .catch(reason => {
          let alertContent = this.get('intl').t('errors.serverFail');

          if (reason.errors[0].detail) {
            alertContent = reason.errors[0].detail;
          }

          this.set('addArticlesAlert', {
            type: 'danger',
            content: alertContent
          });

          jQuery('.modal.addArticles').animate({ scrollTop: 0 });
        });
    }
  }
});
