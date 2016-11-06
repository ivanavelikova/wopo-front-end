import Ember from 'ember';
import Validations from '../validations/article';
import FormModal from '../mixins/form-modal';
import MediaManager from '../mixins/media-manager';

const ArticleModalMixin = Ember.Mixin.create(Validations, FormModal, MediaManager);

export default Ember.Component.extend(ArticleModalMixin, {
});
