import Ember from 'ember';

export default Ember.Component.extend({
  psContent: null,

  didInsertElement () {
    const psContent = this.$('.ps-content');
    
    this.set('psContent', psContent);

    psContent.perfectScrollbar();
  },

  willDestroyElement () {
    this.get('psContent').perfectScrollbar('destroy');
  }
});
