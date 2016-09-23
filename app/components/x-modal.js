import Ember from 'ember';

const {
  observer,
  $: jQuery
} = Ember;

export default Ember.Component.extend({
  hideModal: observer('modalVisible', function () {
    if (!this.get('modalVisible')) {
      const modalTarget = this.get('modalTarget');
      const modal = jQuery(`.modal.${modalTarget}`);

      modal.modal('hide');
    }
  }),

  didInsertElement () {
    const modalTarget = this.get('modalTarget');
    const modal = jQuery(`.modal.${modalTarget}`);

    modal.on('shown.bs.modal', () => {
      const formGroup = modal.find('.form-group:first');
      const focusInput = formGroup.find('input:first');
      const focusTextarea = formGroup.find('textarea:first');

      if (focusInput.length) {
        focusInput.focus();
      }
      
      if (focusTextarea.length) {
        focusTextarea.focus();
      }

      this.set('modalVisible', true);
    });

    modal.on('hidden.bs.modal', () => {
      this.set('modalVisible', false);

      this.set('alert', {
        type: null,
        content: null
      });
    });
  },

  willDestroyElement () {
    const modalTarget = this.get('modalTarget');
    const modal = jQuery(`.modal.${modalTarget}`);

    modal.off('shown.bs.modal');
    modal.off('hidden.bs.modal');
  }
});
