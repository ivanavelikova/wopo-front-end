import Ember from 'ember';
import Validations from '../validations/skills';

const { $: jQuery } = Ember;

export default Ember.Component.extend(Validations, {
  didInsertElement () {
    const modalTarget = this.get('modalTarget');
    const modal = jQuery(`.modal.${modalTarget}`);

    modal.on('shown.bs.modal', function () {
      const formGroup = modal.find('.form-group:first');
      const focusInput = formGroup.find('input:first');
      const focusTextarea = formGroup.find('textarea:first');

      if (focusInput.length) {
        focusInput.focus();
      }
      
      if (focusTextarea.length) {
        focusTextarea.focus();
      }
    });
  },

  willDestroyElement () {
    const modalTarget = this.get('modalTarget');
    const modal = jQuery(`.modal.${modalTarget}`);

    modal.off('shown.bs.modal');
  },

  actions: {
    submitForm () {
      if (!this.get('validations.isValid')) {
        alert('noooo');
        return;
      }

      const modalTarget = this.get('modalTarget');
      const modal = jQuery(`.modal.${modalTarget}`);
      modal.modal('hide');

      if (this.get('index')) {
        this.sendAction('success', this.get('index'));
        return;
      }

      this.sendAction('success');
    }
  }
});
