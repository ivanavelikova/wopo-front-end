import Ember from 'ember';

const {
  computed,
  $: jQuery,
  inject: {
    service
  }
} = Ember;

export default Ember.Controller.extend({
  store: service(),
  intl: service(),

  articles: computed.sort('model', function (a, b) {
    if (parseInt(a.id) > parseInt(b.id)) {
      return -1;
    }

    return 1;
  }),

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
    id: null,
    title: null,
    image_url: null,
    content: null,
    tags: null
  },
  editArticlesModalVisible: null,

  haveArticles: computed('articles', function () {
    return Array.isArray(this.get('articles'));
  }),

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
    },

    delete (id) {
      this
        .get('store')
        .findRecord('article', id)
        .then(article => {
          article.destroyRecord();
        });
    },

    updateEdit (id) {
      this
        .get('store')
        .findRecord('article', id)
        .then(article => {
          this.set('editArticles.id', article.get('id'));
          this.set('editArticles.title', article.get('title'));
          this.set('editArticles.image_url', article.get('cover'));
          this.set('editArticles.content', article.get('content'));
          this.set('editArticles.tags', article.get('tags'));
        });
    },

    edit () {
      const editedArticle = this.get('editArticles');

      this
        .get('store')
        .findRecord('article', editedArticle.id)
        .then(article => {
          article.set('title', editedArticle.title);
          article.set('cover', editedArticle.image_url);
          article.set('content', editedArticle.content);
          article.set('tags', editedArticle.tags);

          article
            .save()
            .then(() => {
              this.set('editArticlesModalVisible', false);

              this.set('editArticles.id', null);
              this.set('editArticles.title', null);
              this.set('editArticles.image_url', null);
              this.set('editArticles.content', null);
              this.set('editArticles.tags', null);
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
        });
    }
  }
});
